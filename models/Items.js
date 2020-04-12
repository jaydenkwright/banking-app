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
    institutionId: String,
    webhook: String
})

module.exports = mongoose.model('Items', ItemSchema)