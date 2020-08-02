var express = require('express');
var router = express.Router();
var mysql = require('mysql');  

var bp = require('body-parser');


router.use(bp.urlencoded( {extended: true}));

var con = mysql.createConnection({  
  host: "35.213.189.162",  
  user: "staisaho_pink",  
  password: "dbmsproject2020"  ,
  database: 'staisaho_dbmsproject'
});  
con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
});  

router.get("/agent",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/loginOffice");
    return;
 }
    res.render("add_agent.ejs",{user:user,error : "",tit : "agent"});
  });

router.get("/buyer",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/loginOffice");
    return;
 }
    res.render("add_agent.ejs",{user:user,error : "",tit : "buyer"});
  });

  router.get("/seller",function(req,res){
    var user =  req.session.user;
    if(user == null){
      res.redirect("/loginOffice");
      return;
   }
    res.render("add_agent.ejs",{user:user,error : "",tit : "seller"});
  });

router.post('/agent',function(req,res){
  
     var user =  req.session.user;
     if(user == null){
      res.redirect("/loginOffice");
      return;
   }
     var s = "select * from agent where Email="+"'"+req.body.email+"'";
     
     var s = "insert into agent(Firstname,Lastname,Email,contact) values ("+"'"+req.body.first_name+"',"+"'"+req.body.last_name+"',";
     s = s+"'"+req.body.email+"',"+"'"+req.body.Contact+"')";
     console.log(s);


     con.query(s,(err, agnt) => {
       
        if(err)
        { res.render('add_agent',{error : "Data matched! Try Again",tit : "agent"});
          }
        else
        {  var s2 =  "select ID from agent where Email="+"'"+req.body.email+"'";
           con.query(s2,(err, agnt1) => {
                  if(err)console.log(err);   
            
                  //var s1 =  "insert into login(username,password,a_id) values ("+"'"+agnt1[0].ID+"',"+"'password',";
                 // s1 = s1 +"'"+agnt1[0].ID+"')";
                 
                  var s1 = "insert into login(a_id,username,password) values (" + agnt1[0].ID + ",'" + agnt1[0].ID+"','password')";
                  
                  con.query(s1,(err, agnt2) => {
                    if(err)console.log(err);   
              });
            });
            
            
            
            res.render('add_agent',{user:user,error : "Agent Succesfully inserted!",tit : "agent"});
        }
     
       });
    
  });

  router.post('/buyer',function(req,res){
    console.log(req.body.email);
    var user =  req.session.user;
    if(user == null){
      res.redirect("/login");
      return;
   }
    var s = "select * from buyer where Email="+"'"+req.body.email+"'";
    
    var s = "insert into buyer(Firstname,Lastname,Email,contact) values ("+"'"+req.body.first_name+"',"+"'"+req.body.last_name+"',";
    s = s+"'"+req.body.email+"',"+"'"+req.body.Contact+"')";
    console.log(s);


    con.query(s,(err, agnt) => {
      
       if(err)
       { res.render('add_agent',{user:user,error : "Data matched! Try Again",tit : "buyer"});
         }
       else
       {
           res.render('add_agent',{user:user,error : "Buyer Succesfully inserted!",tit : "buyer"});
       }
    
      });
   
 });

 router.post('/buyerUpdate',function(req,res){
  console.log(req.body.email);
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  var s = "select * from buyer where Email="+"'"+req.body.email+"'";
  var s = "update buyer set Firstname='"+req.body.first_name+"', Lastname='"+req.body.last_name+"', Email ='"+req.body.email+"', contact='"+req.body.Contact+"' where ID="+req.body.ownerID;
  console.log(s);


  con.query(s,(err, agnt) => {
    
     if(err)
     { res.render('add_agent',{user:user,error : "Data matched! Try Again",tit : "buyer"});
       }
     else
     {
         res.render('add_agent',{user:user,error : "Buyer Succesfully updated!",tit : "buyer"});
     }
  
    });
 
});


 router.post('/seller',function(req,res){
    console.log(req.body.email);
    var user =  req.session.user;
    if(user == null){
      res.redirect("/login");
      return;
   }
    var s = "select * from owner where Email="+"'"+req.body.email+"'";
    
    var s = "insert into owner(Firstname,Lastname,Email,contact) values ("+"'"+req.body.first_name+"',"+"'"+req.body.last_name+"',";
    s = s+"'"+req.body.email+"',"+"'"+req.body.Contact+"')";
    console.log(s);


    con.query(s,(err, agnt) => {
      
       if(err)
       { res.render('add_agent',{user:user,error : "Data matched! Try Again",tit : "seller"});
         }
       else
       {
           res.render('add_agent',{user:user,error : "Seller Succesfully inserted!",tit : "seller"});
       }
    
      });
   
 });

 router.post('/sellerUpdate',function(req,res){
  console.log(req.body.email);
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  var s = "select * from owner where Email="+"'"+req.body.email+"'";

var s = "update owner set Firstname='"+req.body.first_name+"', Lastname='"+req.body.last_name+"', Email ='"+req.body.email+"', contact='"+req.body.Contact+"' where ID="+req.body.ownerID;
  console.log(s);


  con.query(s,(err, agnt) => {
    
     if(err)
     { res.render('add_agent',{user:user,error : "Data matched! Try Again",tit : "seller"});
       }
     else
     {
         res.render('add_agent',{user:user,error : "Seller Succesfully updated!",tit : "seller"});
     }
  
    });
 
});

  setInterval(function(){con.query('select 1');},5000);
module.exports = router;