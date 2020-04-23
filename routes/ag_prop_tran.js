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
      console.log(req.url);
      var user = req.session.user;
      if(user == null){
        res.redirect("/login");
        return;
     }
      var d = req.params.thing;
      if(d==="rent") 
      {
        var user = req.session.user;
        con.query("select TR_ID,st_date,end_date,t.a_id,t.p_id,rent,bhk,adress from property p ,tran_rent t where p.ID=t.p_id and t.a_id ="+user.ID,(err, agnt) => {
          var user = req.session.user;
        res.render("ag_prop_tran.ejs",{user : user, userData : agnt ,tit : "Rented Properties", flag : 2 });
       }); 
      }
      if(d==="sale") 
      {
        var user = req.session.user;
        con.query("select TS_ID,s_date,t.a_id,t.p_id,sell_price,bhk,adress from property p ,tran_sale t where p.ID=t.p_id and t.a_id ="+user.ID,(err, agnt) => {
          var user = req.session.user;
        res.render("ag_prop_tran.ejs",{user : user, userData : agnt , tit : "Sold Properties", flag : 1});
       });
      }

   
  });

  setInterval(function(){con.query('select 1');},5000);
module.exports = router;