const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
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
    mask: String,
    balances: {
        available: Number,
        current: Number,
        limit: Number,
        isoCurrencyCode: String,
        unofficialCurrencyCode: String
    },
    name: {
        type: String,
        required: true
    },
    officialName: String,
    subtype: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Accounts', AccountSchema)