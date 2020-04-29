exports.index = function(req, res){
   var message = '';
 res.render('indexOffice',{message: message});

};

//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var sql = "INSERT INTO off_login(username,password) VALUES ('" + name + "','" + pass + "')";
console.log("SQL:"+ sql);
      var query = db.query(sql, function(err, result) {
console.log(result);
         message = "Succesfully! Your account has been created.";
         res.render('signupOffice.ejs',{message: message});
      });

   } else {
      res.render('signupOffice');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT username, password FROM off_login WHERE username='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            
            req.session.user = results[0];
            console.log(results[0]);
            res.redirect('/home/dashboardOffice');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('indexOffice.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('indexOffice.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user;
   if(user == null){
      res.redirect("/loginOffice");
      return;
   }
   var username = user.username;
   console.log('ddd='+username);
  

   var pc,ac,tc,bc,sc,ts,c2;
   db.query("select count(*) as c from property where P_status=1 union select count(*) as c from property where P_status=2",(err, pro) => {
      pc = pro[0].c; 
      c2 = pro[1].c;
      });
   db.query("select count(*) as c from tran_sale union select count(*) as c from tran_rent",(err, tran) => {
          tc = tran[0].c + tran[1].c;
     
  
   db.query("select count(*) as c from agent",(err, agent) => {
      ac = agent[0].c; 
     
   db.query("select count(*) as c from buyer",(err, b) => {
      bc = b[0].c; 
    
   db.query("select count(*) as c from owner",(err, s) => {
      sc = s[0].c; 
     
   db.query("select sum(sell_price) as c from tran_sale union select sum(rent) as c from tran_rent",(err, tran) => {
      ts = tran[0].c + tran[1].c;
     
     //res.render("office.ejs",{p_c: pc,a_c : ac, b_c : bc,s_c : sc, t_c : tc ,t_s : ts});

var sql="SELECT * FROM off_login WHERE username='"+username+"'";

   db.query(sql, function(err, results){
      console.log("Logged in as: ");
      console.log(results);
      res.render('dashboardOffice.ejs', {user:user,p_c: pc,a_c : ac, b_c : bc,s_c : sc, t_c : tc ,t_s : ts,c_2 : c2});    
   });       
});
   });
   });
});
   });

};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/loginOffice");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/loginOffice");
      return;
   }

   var sql="SELECT * FROM usersOffice WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profileOffice.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
//-------------------------------------------------------------------------------------------------
setInterval(function(){db.query('select 1');},5000);