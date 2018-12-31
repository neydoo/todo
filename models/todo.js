const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TODOSchema = new Schema({
    title: { type: String, required: true },
    description:{type:String, required: true},
    date_to_be_completed: { type: Date },
    date_completed: Date,
    completed: Boolean,
})

TODOSchema
    .virtual('url')
    .get(() => {
    return '/tasks/' + this._id
})

module.exports = mongoose.model('TODO', TODOSchema)