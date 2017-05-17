var mongoose = require("mongoose");

var APISchema = new mongoose.Schema({
    name: {type: String, required: true},
}, {timestamps: true})

var API = mongoose.model("API", APISchema);
