
// Initializing Mongoose
const mongoose = require('mongoose')

// Connect to the database
mongoose.connect('mongodb://localhost/chat')
const db = mongoose.connection
db.on('error', err => { console.log(err) })
db.once('open', () => { console.log('database has been connected!') })

// Defining the schema
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  body: { type: String, unique: false, required: true }
})

// Defining the models
const Message = mongoose.model('Message', MessageSchema)

// Exporting
module.exports = { mongoose, Message }
