const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    accountOwner: String,
    amount: Number,
    authorizedDate: String,
    category: Array,
    categoryId: String,
    date: Date,
    isoCurrencyCode: String,
    location: {
        address: String,
        city: String,
        country: String,
        lat: String,
        lon: String,
        postalCode: String,
        region: String,
        storeNumber: String
    },
    name: String,
    paymentChannel: String,
    pending: Boolean,
    transactionId: String,
    transactionType: String,
    addedOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Transactions', TransactionSchema)