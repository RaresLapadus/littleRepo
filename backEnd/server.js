const IBMnlu = require("./ibmnlu");

const normalizeUrl = require('normalize-url');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

var Record = require('./models/Record.js')

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var uri = "";

mongoose.connect(uri).catch((error) => { console.log(error); });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb database connection established successfully!')
});

router.route('/records').get((req,res) => {
  console.log(`RECORDS GET API CALL`);
  Record.find((err, records) => {
    if (err)
        console.log(err);
    else 
      res.json(records);
  });
});

router.route('/records/:id').get((req, res) => {
  Record.findById(req.params.id, (err,record) => {
    if (err)
      console.log(err);
    else
      res.json(record)
  });
});

router.route('/records/add').post((req, res) => {
  IBMnlu.setParameters(req.body.url);
  IBMnlu.getResult((object) => {
    var objectRAW = {
      name: object.retrieved_url,
      url: object.retrieved_url,
      category: object.categories[0].label
    }
    objectRAW.category = objectRAW.category.split("/")[1];
    objectRAW.name = normalizeUrl(objectRAW.url, {stripProtocol: true},{stripHash: true});
    objectRAW.url = normalizeUrl(objectRAW.url);
    let record = new Record(objectRAW);
    record.save()
        .then(record => {
          res.status(200).json({'record': 'Added!'})
        })
        .catch(err => {
          res.status(400).send('Failed to create!')
        });
  });
});

router.route('/records/update/:id').post((req,res) => {
  Route.findById(req.params.id, (err, record) =>{
    if (!record)
        return next(new Error('Could not load!'));
    else{
      record.name = req.body.name;
      record.url = req.body.url;
      record.category = req.body.category;

      record.save().then(record => {
        res.json('Update done!');
      }).catch(err => {
        res.status(400).send('Update failed!');
      });
    }
  })
});

router.route('/records/delete/:id').get((req, res) => {
  Record.findByIdAndRemove({_id: req.params.id}, (err, record) => {
    if (err)
      res.json(err);
    else 
      res.json('Removed successfully!');
  });
});


function isUrlValid(userInput) {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if(res == null)
      return false;
  else
      return true;
}

app.listen(3000, ()=> console.log('Express server running on port 3000'));

app.use('/', router);