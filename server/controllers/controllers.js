var db = require('../models/models.js'), jwt = require('jsonwebtoken');

module.exports = {
//Start of user controller - handles login, sign up and authentication
  userController : {
    create : function(req, res){
      if(req.body){
        var user = new db.User(req.body)
        var token = jwt.sign({name : user.name, admin : user.admin}, "catzpajamas", {expiresInMinutes : 52000})
        user.save(function(err){
          if (err) throw err;
          res.json({ token : token, message: "User Created!", success : true})
        })
      }
    },
    login : function(req, res){
      db.User.findOne({username: req.body.username}, function(err, user){
        if (user){
          // var x = setTimeout(function(){
          console.log(user)
          console.log(user._id)
          if (user.authenticate(req.body.password)){
              var token = jwt.sign({name : user.name, id : user._id, username : user.username, admin : user.admin}, "catzpajamas", {expiresInMinutes : 52000})
              res.json({token : token, message : "valid user", success: true})
            } else {
            res.json({ message : "error, wrong credentials." })
            }
        // },1000)
        }
      })
    },
    all : function(req, res){
      db.User.find({}, function(err, users){
        res.json(users)
      })
    },
  },
  //Start of Game Controller
  gameController : {
    create : function(req, res){
      var game = new db.Game({
        players : req.body.id,
        moves   : ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR']

      })
      game.save(function(err){
        if (err) throw err
        res.json({messsage : "success, game created", game : game})
      })
    },

    //need to test this function with postman see what my req.params are why is _id undefined?
    goTo : function(req,res){
      console.log( "req.BODY--->", req.body)
      db.Game.findOne({ _id : req.body.id }, function(err,game){
        if (game) {
          console.log(game)
          res.json({game : game, message : 'game successfully found?'})
        } else {
          res.json({message : 'error, no game found, check out req.params?'})
        }
      })
    },

    update : function(req,res){
      //req.body is an array of Fen strings describing the entire history of the game
      db.Game.update({_id : req.body.id}, {$push : { moves : req.body.moves}}, function(err){
        if (err) throw err
        res.json({message : 'posted game history to server'})
        
      })

    },

    get : function(req, res){
      db.Game.find({ _id : req.params.gameid },function(err, data){
        console.log(data)
        if (err) throw err
        if (data.length > 0){
          res.send(data[0])
        } else {
          res.send('no game found')
        }
      })
    },

    all : function(req,res){
        db.Game.find({ in_progress : true }, function(err, games){
          if (err) throw err
          res.json(games)
        })

    }
  }
}
