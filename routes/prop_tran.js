var express = require('express');
var router = express.Router();
var mysql = require('mysql');  



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


 router.get('/:thing',function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/loginOffice");
    return;
 }
      var d = req.params.thing;
      if(d==="rent") 
      {
        con.query("select TR_ID,st_date,end_date,t.a_id,t.p_id,rent,bhk,adress from property p ,tran_rent t where p.ID=t.p_id",(err, agnt) => {
        console.log(agnt);
        res.render("prop_tran.ejs",{ user: user,userData : agnt ,tit : "Rented Properties", flag : 2 });
       }); 
      }
      if(d==="sale") 
      {
        con.query("select TS_ID,s_date,t.a_id,t.p_id,sell_price,bhk,adress from property p ,tran_sale t where p.ID=t.p_id",(err, agnt) => {
        res.render("prop_tran.ejs",{user: user,userData : agnt , tit : "Sold Properties", flag : 1});
       });
      }

   
  });

  setInterval(function(){con.query('select 1');},5000);
module.exports = router;