const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientSchema =require('./Recipient');

const suvrveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    // ska troligt vis inte vara string array
    recipients: [RecipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, ref: 'Users'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', suvrveySchema);