import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || `mongodb+srv://${process.env.USER_ID}:${process.env.API_KEY}@cluster0.bvwog.mongodb.net/happyThoughts?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
mongoose.Promise = Promise




const Grocery = mongoose.model('Grocery', {
  message: String
})
const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')
  try {
    const user = await User.findOne({ accessToken })
    if (user) {
      next()
    } else {
      res.status(401).json({ success: false, message: 'Not authorized' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
}
const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello world')
})
app.get('/grocery', authenticateUser)
app.get('/grocery', async (req, res) => {
  const grocery = await Grocery.find()
  res.json({ success: true, grocery})
})
app.post('/grocery', authenticateUser)
app.post('/grocery', async (req, res) => {
  const { message } = req.body
  try {
    const newGrocery = await new Grocery({ message }).save()
    res.json({ success: true, newGrocery})
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})
// or '/users' or '/register'
app.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt)
    }).save()
    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})
// or '/session' or '/login'
app.post('/signin', async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  try {
    const user = await User.findOne({ username })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true, 
        userID: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})












