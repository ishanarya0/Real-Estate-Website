var express = require('express');
var router = express.Router();


var mysql = require('mysql');  

 var df = require('dateformat');
 
 
 var con = mysql.createConnection({  
   host: "37.60.254.201",  
   user: "staisaho_pink",  
   password: "dbmsproject2020"  ,
   database: 'staisaho_dbmsproject'
 });  
 con.connect(function(err) {  
   if (err) throw err;  
   console.log("Connected!");  
 });

 router.get('/agent',function(req,res){
      console.log(req.url);
      var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
      con.query("select ID,Firstname,Lastname from agent",(err, agnt) => {
        var user =  req.session.user;
        res.render("view_aggent.ejs",{user : user,userData : agnt, tit : "Agent",flag : 1});
    
       });

   
  });

  router.get('/buyer',function(req,res){
    console.log(req.url);
    var user =  req.session.user;
    if(user == null){
      res.redirect("/loginOffice");
      return;
   }
    con.query("select ID,Firstname,Lastname from buyer",(err, agnt) => {
      var user =  req.session.user;
      res.render("view_aggent.ejs",{user : user,userData : agnt, tit : "Buyer",flag : 1});
    
     });

 
});

router.get('/seller',function(req,res){
    console.log(req.url);
    var user =  req.session.user;
    if(user == null){
      res.redirect("/loginOffice");
      return;
   }
    con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
      var user =  req.session.user;
      res.render("view_aggent.ejs",{user : user, userData : agnt, tit : "Seller", flag : 1});
     });

 
});

router.get('/property',function(req,res){
  console.log(req.url);
  var user =  req.session.user;
  if(user == null){
    res.redirect("/loginOffice");
    return;
 }
  con.query("select * from property where P_status=1",(err, agnt) => {
  console.log(agnt);
  var user =  req.session.user;
  res.render("view_aggent.ejs",{user : user, userData : agnt, tit : "Available Properties", flag : 2});
   });


});


setInterval(function(){con.query('select 1');},5000);
module.exports = router;