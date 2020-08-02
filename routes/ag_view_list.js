var express = require('express');
var router = express.Router();


var mysql = require('mysql');  

 var df = require('dateformat');
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

 router.get('/agent',function(req,res){
      console.log(req.url);
      var user =  req.session.user;
      if(user == null){
        res.redirect("/login");
        return;
     }
      con.query("select ID,Firstname,Lastname from agent",(err, agnt) => {
        var user = req.session.user;
        res.render("ag_view_list.ejs",{user : user, userData : agnt, tit : "Agent",flag : 1});
    
       });

   
  });

  router.get('/buyer',function(req,res){
    console.log(req.url);
    var user =  req.session.user;
    if(user == null){
      res.redirect("/login");
      return;
   }
    var sql = "select b.ID,b.Firstname,b.Lastname from buyer b, tran_sale ts where (ts.a_id = " + user.ID + " and b.ID = ts.b_id) union select b.ID,b.Firstname,b.Lastname from buyer b, tran_sale tr where (tr.a_id =" + user.ID +" and b.ID = tr.b_id)"

    
    console.log(sql);
    con.query(sql,(err, agnt) => {
      var user = req.session.user;
      res.render("ag_view_list.ejs",{user : user, userData : agnt, tit : "Buyer",flag : 1});
    
     });

 
});

router.get('/seller',function(req,res){
    console.log(req.url);
   
    var user =  req.session.user;
    if(user == null){
      res.redirect("/login");
      return;
   }
    con.query("select o.ID,o.Firstname,o.Lastname from owner o,property p where o.ID=p.o_id and p.a_id = "+user.ID,(err, agnt) => {
      var user = req.session.user;
      res.render("ag_view_list.ejs",{user : user, userData : agnt, tit : "Seller", flag : 1});
     });

 
});

router.get('/property',function(req,res){
  console.log(req.url);
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  con.query("select * from property where P_status=1 and a_id= "+user.ID,(err, agnt) => {
    var user = req.session.user;
  
  res.render("ag_view_list.ejs",{user: user, userData : agnt, tit : "Available Properties", flag : 2});
   });


});


router.post('/property',function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  var mx = req.body.max_price;
  var mn = req.body.min_price;
  var ad = req.body.addres;
  var s = req.body.sale;
  var r = req.body.rent;
  var a = req.body.aprt;
  var h = req.body.house;
  var o = req.body.oid;
  
  var str = "select * from property where P_status=1 and a_id= "+user.ID;
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
    if(o.length>0)
    { str = str + " and o_ID="+Number(o);}
         
  con.query(str,(err, agnt) => {
    var user = req.session.user;
    res.render("ag_view_list.ejs",{user: user, userData : agnt, tit : "Available Properties", flag : 2});
     });

});


setInterval(function(){con.query('select 1');},5000);
module.exports = router;