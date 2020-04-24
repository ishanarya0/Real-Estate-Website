var express = require('express');
var router = express.Router();
var mysql = require('mysql');  

var bp = require('body-parser');


router.use(bp.urlencoded( {extended: true}));

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

router.get("/property",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
    var user = req.session.user;
    res.render("addproperty.ejs",{ user: user, error : "",Data : agnt});
  
    });
  });

  router.get("/propertyUpdate/:propid",function(req,res){
  console.log("I AM IN UPDATE");
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
    con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
      var propid = req.params.propid;
      con.query("select * from property where ID="+propid,(err,currData) =>{
        console.log(currData);
        console.log(typeof currData[0].o_id);
        var user = req.session.user;
        res.render("updateproperty.ejs",{ user: user, error : "",Data : agnt, curr : currData});
      });
     
    
      });
    });
    
router.get("/buyer",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
    res.render("ag_add_bs.ejs",{user: user, error : "",tit : "buyer"});
});

router.get("/seller",function(req,res){  
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
    res.render("ag_add_bs.ejs",{user: user,error : "",tit : "seller"});
});

router.get("/payment",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  con.query("select ID,Firstname,Lastname from buyer",(err, agnt) => {
    var user = req.session.user;
    con.query("select ID,P_tag from property where P_status=1 and a_ID="+user.ID,(err, agnt1) => {
      res.render("payment.ejs",{user : user, error :"",Data : agnt,Data1 : agnt1});
    });
  
    });
  });

router.post("/property",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  var s = "insert into property(P_status,L_date,adress,bhk,P_size,P_type,P_tag,P_sug_price,bathrooms,P_desc,o_ID,a_ID) values (1";
  s+= ",'"+req.body.date+"'";
  if(Number(req.body.type)==0){
  s+= ",'"+req.body.hno+","+req.body.road+" ,"+req.body.zip+"'";}
  if(Number(req.body.type)==1){
    s+= ",'"+req.body.hno+","+req.body.pname+" ,"+req.body.road+" ,"+req.body.zip+"'";}
  s+=","+Number(req.body.bhk);
  s+=","+Number(req.body.size);
  s+=","+Number(req.body.type);
  s+=","+Number(req.body.status);
  s+=","+Number(req.body.cost);
  s+=","+Number(req.body.bath);
  s+=",'"+req.body.prop_desc+"'";
  s+=","+Number(req.body.seller);
  s+=","+user.ID+")";

  console.log(s);
  con.query(s,(err, agnt) => {
       if(err){
       con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
        var user = req.session.user;
       res.render("addproperty.ejs",{user : user ,error : "Some Date is in wrong formate !!",Data : agnt});
       });
      }
      else{
        con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
          var user = req.session.user;
          res.render("addproperty.ejs",{user: user, error : " Property added suceesfully !",Data : agnt});
          });
      }

  });
});

router.post("/propertyUpdate",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }
  var s = "update property set P_status=1,L_date ='"+ req.body.date+ "',adress='" +req.body.hno+", ";
  
  
  if(req.body.type==1){
  s+=req.body.pname+", ";
  }

  s= s +req.body.road+" "+req.body.zip+"'";

  s=s+",bhk ="+ req.body.bhk+",P_size ="+ req.body.size+",P_type="+ req.body.type+",P_tag="+ req.body.status +",P_sug_price ="+ req.body.cost+",bathrooms="+ req.body.bath+",P_desc='"+req.body.pdesc+"',o_ID="+ req.body.seller+",a_ID="+user.ID+" where ID="+ req.body.propid;
  console.log(s);
 con.query(s,(err, agnt) => {
       if(err){
       con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
        var user = req.session.user;
       res.render("addproperty.ejs",{user : user ,error : "Some Date is in wrong formate !!",Data : agnt});
       });
      }
      else{
        con.query("select ID,Firstname,Lastname from owner",(err, agnt) => {
          var user = req.session.user;
          res.render("addproperty.ejs",{user: user, error : " Property added suceesfully !",Data : agnt});
          });
      }

  });
  
});




/////////////////////////////////////////payment post////////////////////////////////////////////////

router.post("/payment",function(req,res){
  var user =  req.session.user;
  if(user == null){
    res.redirect("/login");
    return;
 }

  if(req.body.tran_type=="1")
  {
    console.log("rent");
    console.log(req.body.pid);
    con.query("select P_status from property where ID="+Number(req.body.pid),(err, agnt) => {
      console.log(agnt);
      if(agnt[0].P_status==0){
        console.log(agnt);
        con.query("select ID,Firstname,Lastname from buyer",(err, agnt) => {
          var user = req.session.user;
          con.query("select ID,P_tag from property where P_status=1 and a_ID="+user.ID,(err, agnt1) => {
          res.render("payment.ejs",{user : user, error : "Property already transacted ! Not available",Data : agnt,Data1 : agnt1});
        });
      });
      }
      else
      {
        con.beginTransaction(function(err) {
        var s = "insert into tran_rent(rent,st_date,end_date,a_id,p_id,b_id) values (";
        var user = req.session.user;
        s+=Number(req.body.rent);
        s+=",'"+req.body.sdate+"'";
        s+=",'"+req.body.edate+"'";
        s+=","+user.ID;
        s+=","+Number(req.body.pid);
        s+=","+Number(req.body.buyer)+")";
       
        console.log(s);
        
        con.query(s,(err, a) => {
          if(err){
            console.log(err);
            console.log("error");
            con.rollback(function() {
              throw err;
            });
          }
          con.query("update property set P_status=0 where ID="+Number(req.body.pid),(err, ab) => {
               if(err)
               { 
                 console.log(err);
                 con.rollback(function() {
                  throw err;
                  return;
                });
              }
              con.commit(function(err) {
                if (err) { 
                  con.rollback(function() {
                    throw err;
                    return;
                  });
                }
                console.log('Transaction Complete.');
                con.query("select ID,Firstname,Lastname from buyer",(err, agnt) => {
                  var user = req.session.user;
                  console.log("buyer");
                  console.log(user.ID);
                  con.query("select ID,P_tag from property where P_status=1 and a_ID="+user.ID,(err, agnt1) => {
                    console.log(agnt1);
                    res.render("payment.ejs",{user : user, error : "Transaction complete !",Data : agnt,Data1 : agnt1});
                  });
                });

              });
               
               
          });
        });
      });
      }
  });
  }
  else
  {
    console.log("sale");
    con.query("select P_status from property where ID="+Number(req.body.pid),(err, agnt) => {
      console.log(agnt);
      if(agnt[0].P_status==0){
        console.log(agnt);
        con.query("select ID,Firstname,Lastname from buyer",(err, agnt) => {
          var user = req.session.user;

          con.query("select ID,P_tag from property where P_status=1 and a_ID="+user.ID,(err, agnt1) => {
            res.render("payment.ejs",{user : user, error : "Property already transacted ! Not available",Data : agnt,Data1 : agnt1});
          });
        });
      }
      else
      {
        con.beginTransaction(function(err) {
        var s = "insert into tran_sale(sell_price,s_date,a_id,p_id,b_id) values (";
        s+=Number(req.body.sprice);
        s+=",'"+req.body.sdate+"'";
        var user = req.session.user;
        s+=","+user.ID;
        s+=","+Number(req.body.pid);
        s+=","+Number(req.body.buyer)+")";
        console.log(s);

        con.query(s,(err, a) => {
          if(err){
            console.log(err);
            console.log("error");
            con.rollback(function() {
              throw err;
            });
          }
          con.query("update property set P_status=0 where ID="+Number(req.body.pid),(err, ab) => {
               if(err)
               { 
                 console.log(err);
                 con.rollback(function() {
                  throw err;
                });
              }
              con.commit(function(err) {
                if (err) { 
                  con.rollback(function() {
                    throw err;
                  });
                }
                console.log('Transaction Complete.');
                con.query("select ID,Firstname,Lastname from buyer",(err, agnt) => {
                  var user = req.session.user;
                  con.query("select ID,P_tag from property where P_status=1 and  a_ID="+user.ID,(err, agnt1) => {
                    res.render("payment.ejs",{user : user, error : "Transaction complete !",Data : agnt,Data1 : agnt1});
                  });
                });
              });
               
               
          });
        });
      });
      }
  });
  }
  


});




  setInterval(function(){con.query('select 1');},5000);
module.exports = router;