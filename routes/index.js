var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journey');
var userModel = require('../models/users');

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]



/* GET login. */
router.get('/', function(req, res, next) {
 
  res.render('index', {  });
});

router.post('/sign-in', async function(req, res, next) {

    var utilisateur = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });
    console.log(utilisateur)
    if (utilisateur == null) {
        res.redirect('/');
    } else {
        res.redirect('/home');
    }
});


router.post('/sign-up', async function(req, res, next) {

    var newUser = new userModel({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    });
    await newUser.save();

    // console.log(newUser)

    var user = await userModel.findOne({
        email: req.body.email
      });

    // console.log(user.email)

    res.redirect('/home');
}
);

      
router.get('/confirm', function(req, res, next) {
 
    res.render('confirm', { });
  }); 
   


/* GET home page. */
router.get('/home', async function(req, res, next) {

 var journey = await journeyModel.find()

 // trouve un élément qui a comme departure, le nom de la ville du formulaire :
 var alreadyExist = await journeyModel.findOne({
  departure: req.body.departure
});



if (alreadyExist == null) {
  
}



 
  res.render('homepage');
});



/* GET home page. */
router.post('/resa', function(req, res, next) {

 
 

  res.render('resa');
});

/* GET error page. */
router.get('/error', function(req, res, next) {

 
 

  res.render('error');
});


// Remplissage de la base de donnée, une fois suffit
// router.get('/save', async function(req, res, next) {

//   // How many journeyModel we want
//   var count = 300

//   // Save  ---------------------------------------------------
//     for(var i = 0; i< count; i++){

//     departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
//     arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

//     if(departureCity != arrivalCity){

//       var newUser = new journeyModel ({
//         departure: departureCity , 
//         arrival: arrivalCity, 
//         date: date[Math.floor(Math.random() * Math.floor(date.length))],
//         departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
//         price: Math.floor(Math.random() * Math.floor(125)) + 25,
//       });
       
//        await newUser.save();

//     }

//   }
//   res.render('index', { title: 'Express' });
// });


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

        //   console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
