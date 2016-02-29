var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/contact_list");

//tell server where to look for our static files
app.use(express.static(__dirname + "/public"));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

//MODELS

var ContactSchema = new mongoose.Schema({
	name:       {type: String, trim: true},
	email:      {type: String, trim: true},
	number: 	{type: String, trim: true},
	created_at: {type: Date, default: Date.now},
  	updated_at: {type: Date, default: Date.now}
})
var Contact = mongoose.model('Contact', ContactSchema);

//ROUTES

app.post('/contactlist', function(req, res) {
	var contactInstance = new Contact(req.body);
	contactInstance.save(function(err) {
		if(err) { 
			return res.json(err); 
		} else { 
			return res.json(true);
			console.log(contactInstance);
		}
	})
});

app.get('/contactlist', function(req, res) {
	Contact.find({}, function(err, contacts) {
		return res.json(contacts);
		console.log("Get all contacts from server routes", contacts);
	})
});

app.delete('/contactlist/:id', function(req, res) {
	Contact.remove({_id: req.params.id}, function(err) {
		if(err) { 
			return res.json(err); 
		} else { 
			return res.json(true);
		}
	})
});

app.get('/contactlist/:id', function(req, res) {
	Contact.findOne({_id: req.params.id}, function(err, contact) {
		if(err) { 
			return res.json(err); 
		} else { 
			return res.json(contact);
		}
	})
});

app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	Contact.update({_id: req.params.id}, {name: req.body.name, email: req.body.email, number: req.body.number}, function(err, newContact) {
		if(err) { 
			return res.json(err); 
		} else { 
			return res.json(true);
		}
	})
});



app.listen(3000);
console.log("Server running on port 3000");