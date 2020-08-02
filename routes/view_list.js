var express = require('express');
var router = express.Router();


var mysql = require('mysql');  

 var df = require('dateformat');
 
 
 var con = mysql.createConnection({  
   host: "35.213.189.162",  
   user: "staisaho_pink",  
   password: "dbmsproject2020"  ,
   database: 'staisaho_dbmsproject'
 });  
 con.connect(function(err) {  
   if (err) throw err;  
   console.log("Connected11111!");  
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
var usr;

router.get('/property',function(req,res){
  var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
  var str = "select * from property where P_status=1";
  
         
  con.query(str,(err, agnt) => {
    var user =  req.session.user;
    
    res.render("view_aggent.ejs",{user : user,userData : agnt, tit : "Available Properties", flag : 2,flag1 : 1});
     });


});

router.get('/unlistproperty',function(req,res){
  var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
  var str = "select * from property where P_status=2";
  
         
  con.query(str,(err, agnt) => {
    var user =  req.session.user;
    
    res.render("view_aggent.ejs",{user : user,userData : agnt, tit : "Unlisted Properties", flag : 2,flag1 : 2});
     });


});



router.post('/property',function(req,res){
  var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
  var mx = req.body.max_price;
  var mn = req.body.min_price;
  var ad = req.body.addres;
  var s = req.body.sale;
  var r = req.body.rent;
  var a = req.body.aprt;
  var h = req.body.house;
  var ad = req.body.aid;
  var o = req.body.oid;

  var str = "select * from property where P_status=1";
  if(mx.length>0)
    { str = str + " and P_sug_price<="+Number(mx);}
  if(mn.length>0)
    { str = str + " and P_sug_price>="+Number(mn);}
  if(ad.length>0)
    { str = str + " and adress like '%"+ad+"%'";}
  if(s != null)
    { str = str + " and P_tag=0";}
  if(r != null)
    { str = str + " and P_tag=1";}
    if(h != null)
    { str = str + " and P_type=0";}
  if(a != null)
    { str = str + " and P_type=1";}
    if(ad.length>0)
    { str = str + " and a_ID ="+Number(ad);}
    if(o.length>0)
    { str = str + " and o_ID ="+Number(o);}
         
  con.query(str,(err, agnt) => {
    var user =  req.session.user;
    res.render("view_aggent.ejs",{user : user,userData : agnt, tit : "Available Properties", flag : 2,flag1 : 1});
     });

});

router.post('/unlistproperty',function(req,res){
  var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
  var mx = req.body.max_price;
  var mn = req.body.min_price;
  var ad = req.body.addres;
  var s = req.body.sale;
  var r = req.body.rent;
  var a = req.body.aprt;
  var h = req.body.house;
  var ad = req.body.aid;
  var o = req.body.oid;
  
  var str = "select * from property where P_status=2";
  if(mx.length>0)
    { str = str + " and P_sug_price<="+Number(mx);}
  if(mn.length>0)
    { str = str + " and P_sug_price>="+Number(mn);}
  if(ad.length>0)
    { str = str + " and adress like '%"+ad+"%'";}
  if(s != null)
    { str = str + " and P_tag=0";}
  if(r != null)
    { str = str + " and P_tag=1";}
    if(h != null)
    { str = str + " and P_type=0";}
  if(a != null)
    { str = str + " and P_type=1";}
  if(ad.length>0)
    { str = str + " and a_ID ="+Number(ad);}
    if(o.length>0)
    { str = str + " and o_ID ="+Number(o);}

  con.query(str,(err, agnt) => {
    var user =  req.session.user;
    res.render("view_aggent.ejs",{user : user,userData : agnt, tit : "Unlisted Properties", flag : 2,flag1 : 2});
     });

});

router.post('/propertylistagain/:thing',function(req,res){
  var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
  var pid=req.params.thing;
 
  var ad =req.body.aid;
  //con.query("update property set P_status=1 where ID="+pid,(err, agnt1) => {
  con.query("update property set P_status=1 where ID="+pid,(err, agnt) => {    
    if(err)console.log(err);
    con.query("update property set a_ID="+ad+" where ID="+pid,(err, agnt) => { 
      res.redirect("/office/view/unlistproperty");
    });
  });
 
});

router.post('/propertychangeagent/:thing',function(req,res){
  var user =  req.session.user;
      if(user == null){
        res.redirect("/loginOffice");
        return;
     }
  var pid=req.params.thing;
 
  var ad =req.body.aid;
  //con.query("update property set P_status=1 where ID="+pid,(err, agnt1) => {

    con.query("update property set a_ID="+ad+" where ID="+pid,(err, agnt) => { 
      res.redirect("/office/view/property");
   
  });
 
});


setInterval(function(){con.query('select 1');},5000);
module.exports = router;