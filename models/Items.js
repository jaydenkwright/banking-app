const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
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