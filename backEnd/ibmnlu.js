var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: '',
  url: ''
});

var parameters = {
  'url': '',
  'features': {
    'categories': {
      'limit': 1
    }
  }
};

module.exports.setParameters = function setParameters (newUrl) {

  parameters.url=newUrl;

};

module.exports.getResult = function getResult (callback) {

  naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
      callback(response);
  })

};



