const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    itemId: String,
    availableProducts: Array,
    billedProducts: Array,
    institutionName: String,
    institutionId: String,
    webhook: String,
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Items', ItemSchema)