// const BASE_URL = 'http://localhost:8080'
// const mongoUrl = process.env.MONGO_URL || `mongodb+srv://${process.env.USER_ID}:${process.env.API_KEY}@cluster0.bvwog.mongodb.net/shoppingList?retryWrites=true&w=majority`
const BASE_URL = 'https://app-shopping-notes.herokuapp.com/'
export const API_URL = (slug) => `${BASE_URL}/${slug}`  