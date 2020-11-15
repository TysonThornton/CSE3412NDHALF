const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require("body-parser")

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
  .get('/', (req, res) => res.sendFile(__dirname + '/public/form.html'))
  .get('/results', handleRate)
  .use(bodyParser.urlencoded({ extended: false}))
  .use(bodyParser.json())

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function handleRate(req, res) {

    const weight = Number(req.query.weight);
    const type = req.query.type;

    var params = calculateRate(type, weight);
    res.render('pages/results', params);
}



  function calculateRate(type, weight) {


    var postage = 0;

    switch(type) {
      case 'letter-stamp':
        if (weight <= 1) {
          postage = '0.55';
        }
        else if (weight <= 2) {
          postage = '0.70';
        }
        else if (weight <= 3) {
          postage = '0.85';
        }
        else if (weight <= 3.5) {
          postage = '1.00';
        }
        else {
          postage = 'weight is too much for a stamped letter.';
        }

      break;
      case 'letter-meter':
        if (weight <= 1) {
          postage = '0.50';
        }
        else if (weight <= 2) {
          postage = '0.65';
        }
        else if (weight <= 3) {
          postage = '0.80';
        }
        else if (weight <= 3.5) {
          postage = '0.95';
        }
        else {
          postage = 'weight is too much for a metered letter.';
        }

      break;
      case 'large-envelope':
        if (weight <= 1) {
          postage = '1.00';
        }
        else if (weight <= 2) {
          postage = '1.20';
        }
        else if (weight <= 3) {
          postage = '1.40';
        }
        else if (weight <= 4) {
          postage = '1.60';
        }
        else if (weight <= 5) {
          postage = '1.80';
        }
        else if (weight <= 6) {
          postage = '2.00';
        }
        else if (weight <= 7) {
          postage = '2.20';
        }
        else if (weight <= 8) {
          postage = '2.40';
        }
        else if (weight <= 9) {
          postage = '2.60';
        }
        else if (weight <= 10) {
          postage = '2.80';
        }
        else if (weight <= 11) {
          postage = '3.00';
        }
        else if (weight <= 12) {
          postage = '3.20';
        }
        else if (weight <= 13) {
          postage = '3.40';
        }
        else {
          postage = 'weight is too much for a large envelope.';
        }

      break;
      case 'first-class':
        if (weight <= 4) {
          postage = '3.80';
        }
        else if (weight <= 8) {
          postage = '4.60';
        }
        else if (weight <= 12) {
          postage = '5.30';
        }
        else if (weight <= 13) {
          postage = '5.90';
        }
        else {
          postage = 'weight is too much for a first class.';
        }

      break;
    }

    var typeDetail;
    if (type === 'letter-stamp') {
      typeDetail = 'letter (stamped)';
    }
    else if (type === 'letter-meter') {
      typeDetail = 'letter (metered)';
    }
    else if (type === 'large-envelope') {
      typeDetail = 'large envelope';
    }
    else {
      typeDetail = 'first class'
    }

    const params = {type: typeDetail, weight: weight, postage: postage};
    return params;
    
  }
