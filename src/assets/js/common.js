 var base64 = require('hi-base64');
 /* 组件时间格式转换 */
var temptime=function(temptime){
    var gettype=Object.prototype.toString;
    if (temptime != '' && (gettype.call(temptime) == '[object Date]')) {
        temptime = temptime.getFullYear() + '-' + (temptime.getMonth() + 1) + '-' + temptime.getDate();
    }
    return temptime;
}
/* 时间戳转换函数 */
var getDataYear = function(format, timestamp) {
  console.log(timestamp==0 )
  if(timestamp == null||timestamp == undefined||timestamp == 0){
    return ''
  }
    var date = new Date(timestamp ? (parseInt(timestamp) * 1000) : new Date().getTime());
    var FORMAT = new Object();
    FORMAT = {
        'Y': "date.getFullYear()",
        'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
        'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
        'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
        'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
        's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
    }
    for (var i in FORMAT) {
      if (format.indexOf(i) != -1) {
        format = format.replace(i, eval(FORMAT[i]));
    }
  }
  return format;
}
//设置cookie
var setcookie=function(name,value){//设置cookie的值
  name="token";
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取cookie
var getcookie=function(name){//获取cookie的值
  name="token";
  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  if(arr=document.cookie.match(reg)){
    return unescape(arr[2]);
  } else{
    return null;
  }
}
var delatecookie=function(){//清空cookie
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
  if (keys) { 
    for (var i = keys.length; i--;) {
      document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
    }  
  }
}
/* ajax请求 */
var ajax = function(that, url, params, success, method) {
  var token = sessionStorage.getItem('token');
  var openId = sessionStorage.getItem('openId');
  var uid=sessionStorage.getItem("userid");
  if(method=='GET'){
    that.axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type':'application/x-www-form-urlencoded;',
      },
     params:params,
    }).then((response) => {
      // if(response.data.code==-2){
      //   delatecookie();
      //   that.$alert(
      //       '您长时间未登录，请先登录',
      //       '提示',
      //   ).then(() => {
      //     that.$router.push({
      //       path: '/'
      //     });
      //   });
      // }else{
      //   success(response.data);
      // }
      success(response.data); 
    }).catch(function(response){
      console.log(response);
    })
  }else{
    // params=that.querystring.stringify(params);
    that.axios({
      method: "POST",
      url: url,
      headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type':'application/json',
      },
     data:params,
    }).then((response) => {
        success(response.data);
    }).catch(function(response){
      console.log(response);
    })
  }
}
/* 登录事件*/
// var subLogin=function(that,pageindex){
//   ajax(that,that.extendApi.login,that.loginData,function(res){
//     if(res.code==200){
//       //登录成功把相应信息保存
//       sessionStorage.setItem("token", res.data.token);
//       sessionStorage.setItem("userid", res.data.userid);
//       sessionStorage.setItem("username", that.loginData.username);
      // if(res.data.usertype == '借款人'){
      //     res.data.usertype = 1;
      //     sessionStorage.setItem("type", 1);
      // }else if(res.data.usertype == '投资人'){
      //     res.data.usertype = 2;
      //     sessionStorage.setItem("type", 2);
      // }
      // sessionStorage.setItem("type", res.data.usertype);
      //拿到后台返回的随机数，获取公私钥

//       let random=res.data.randomNum;
//        sessionStorage.setItem("random", random);//存取私钥
//       let tprivatekey=IntegralSign.getPrivatekey(that.loginData.password,random);
//       sessionStorage.setItem("tprivatekey", tprivatekey);//存取私钥
//       var privatekey_buff = new Buffer(tprivatekey,'hex');
//       var tpublickey = IntegralSign.getPublicKey(privatekey_buff);
//       sessionStorage.setItem("tpublickey", tpublickey);//存取公钥
//        if(pageindex=='index'){
//           // console.log("调转");
//             if(res.data.usertype== 1){
//               that.$router.push({
//                 path: '/indexJ'
//               });
//             }
//             else{
//               that.$router.push({
//                 path: '/indext'
//               });
//             }
          
//         }else{
//           // console.log('刷新');
//           // window.location.reload();
//           // _this.$emit('tradeSuccess');
//         } 
//     }
//     else{
//       that.message=res.error;
//       that.$notify({
//         title: '提示',
//         message: res.error,
//         type: 'warning',
//         duration:'2000'
//       });
//     }
//   },'POST')
// }
//注册事件
var subRegist=function(that,pageindex){
  //创建用户 - 用户自己签名----------后台已经做好签名了

  ajax(that,that.extendApi.register,that.registData,function(res){
    if(res.code==200){
      // console.log("that.loginData:"+that.loginData)
      that.loginData.username=that.registData.username;
      that.loginData.password=that.registData.password;
      subLogin(that,pageindex);
    }
    else{
      that.$notify({
        title: '提示',
        message: res.error,
        type: 'warning',
        duration:'2000'
      });
    }
  })
}
// 排序和加密
var base64Sort = function(array){
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(array).sort();　　 
  //console.log('newkey='+newkey);
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for(var i = 0; i < newkey.length; i++) {
      //遍历newkey数组
    newObj[newkey[i]] = array[newkey[i]]; 
      //向新创建的对象中按照排好的顺序依次增加键值对
  }
  // 对象转json
  newObj=JSON.stringify(newObj)+"18cea62e37a28f9c5e9503a03d7bfd0d";
  // base64编码
  newObj=base64.encode(newObj);
  return newObj; //返回排好序的新对象
}
export{
  temptime,
  getDataYear,
  ajax,
  delatecookie,
  subLogin,
  getcookie,
  setcookie,
  subRegist,
  base64Sort,
}