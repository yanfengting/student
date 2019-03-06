var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/login', function(req, res, next) {
  res.render('login', {   
    title: '登录'
  })
});
router.post('/login',function(req,res,next){
  
  var loginName = req.body.loginName;//body吧发过来的数据传过来
  var password = req.body.password;
  var type = req.body.type;
  var remember = req.body.remember;
  if (!loginName || !password) {
    res.json({ code: 201, message: '账号或密码不能为空！' })
    return;
  }
  console.log(loginName);
  console.log(password);
  // 从数据库查出来数据 比较
  pool.query("SELECT * FROM `users` WHERE loginName=? AND password=? AND type=?", [loginName, md5(password), type], function (err, result) {
    if (err) {
      res.json({ code: 202, message: '数据库操作失败！' });
      return;
    }

    if (result.length == 0) {
      res.json({ code: 203, message: '账号或密码或类型有误！' });
      return;
    }

    if (result.length > 1) {
      res.json({ code: 204, message: '您的账号异常！' });
      return;
    }

    var user = result[0];
    if (user.status != 0) {
      res.json({ code: 205, message: '您的账号被禁用或删除！' });
      return;
    }
    delete user.password;
    req.session.user = user;
    req.session.save();

    res.json({ code: 200, message: "成功！" });
  })
  // res.json({code:200})
})

module.exports = router;
