const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        // v is the value of the number field that user has provided
        return /^\d{2,3}-(\d+)$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It should be in the format XX-XXXXX... or XXX-XXXXX...`,
    },
    required: [true, 'User phone number required'],
  },
  important: {
    type: Boolean,
    default: false,
  },
})

entrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Entry', entrySchema)
