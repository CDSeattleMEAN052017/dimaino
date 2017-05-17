var mongoose = require("mongoose");
var API = mongoose.model("API");

module.exports = {
    show: function(req, res) {
        API.find({}, function(err, API) {
            if(err) {console.log(err); }
            res.json(API);

        })
    },

    create: function(req, res) {
        var person = new API({name: req.params.name});
        console.log(person);

        person.save(function(err) {
            console.log("Added to database");
            res.json(API);
        })
    },

    remove: function(req, res) {
        API.remove({name: req.params.name}, function(err, API) {
            if(err) { console.log(err); }
            res.json(API);
        })
    },

    get: function(req, res) {
        API.find({name: req.params.name}, function(err, API) {
            if(err) { console.log(err); }
            res.json(API);
        })
    }

}
