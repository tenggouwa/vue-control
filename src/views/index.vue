<template>
  <div class="hello">
    <div class="login" v-model="login">
      <p>监控后台管理系统</p>
      <div class="username">
        <img class="user" src="../assets/img/User.png" height="24" width="23">
        <span class="user1">用户名</span>
        <input class="user2" type="text" v-model="login.username">
      </div>
      <div class="password">
        <img class="key" src="../assets/img/Key.png" height="24" width="25">
        <span class="key1">密码</span>
        <input class="key2" type="password" v-model="login.password"  @keyup.enter="logingethash">
      </div>
      <div class="remember">
        <el-checkbox label="记住用户名和密码" name="type" v-model="checked"></el-checkbox>
      </div>
      <div class="loginbtn">
       <el-button class="loginbtn1" type="primary" @click="logingethash">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../config/api-config.js'
import { ajax,base64Sort} from '../assets/js/common.js'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'index',
      login: {
        username:'',
        password:''
      },
      hashusername:{
        username:'',
      },
      loginbase: {
        
        password:'',
        username:'',
        sign:'',
      },
      changepass:{
        first:'',
        firstliu:'',
        last:'',
        lastliu:'',
        lastnine:'',
        lasttwive:'',
      },
      hash:'',
      loginpass:'',
      checked:"",
    }
  },
  created(){
  	this.rememberpassword();
  },
  methods:{
  	rememberpassword(){
  		let that = this;
	 		that.login.username = sessionStorage.getItem("username");
	  	that.login.password = sessionStorage.getItem("password");
  	},
      // 登录按钮window.history.forward(1);
  	logingethash(){  
    // 判断是否已经输入用户名密码
      if(this.login.username && this.login.password){   
      let that = this;
      that.hashusername.username = that.login.username,
        ajax(that,that.extendApi.loginhash,that.hashusername,(param)=>{
          if(param.code == 200){
            that.hash = param.data.hash;
            this.loginbtn();
            }else{
              this.$notify({
              type: 'warning',
              title: '提示',
              message: param.message,
              duration: 2000
              });
            }
          },'POST');
        }else{
          this.$notify({
            type: 'warning',
            title: '提示',
            message: '请输入用户名和密码',
            duration: 2000
          });
        }
    },
    loginbtn() { 
      // 登录接口
        let that = this;
        // 密码加密
        let login = that.login.password;
        that.loginpass = that.hash+login;//hash+password
        // console.log(that.loginpass)
        that.changepass.first = that.loginpass.substr(0 , 3);//拿到前三位
        that.changepass.firstliu = that.loginpass.slice(3);//去掉前三位剩下的
        that.changepass.last = that.loginpass.substr(that.loginpass.length-3);//拿到后三位
        that.changepass.lastliu = that.changepass.firstliu.substr(0 , that.changepass.firstliu.length-3);//在去掉后三位剩下的
        that.changepass.lastnine = that.loginpass.substr( 0 , 9);//前9位；
        that.changepass.lasttwive = that.loginpass.substr( 0, 23);//前23位
        // console.log(that.changepass.lastliu);
        that.loginpass = that.changepass.last+that.changepass.lastliu+that.changepass.first;
        // console.log(that.loginpass)
        that.final = that.base64.encode(that.loginpass);
        that.final = that.changepass.lastnine+that.final+that.changepass.lasttwive;
        // 转换base64并赋值给传递的参数
        that.loginbase.username = that.login.username;
        that.loginbase.password = that.final;
        let array = {
          username:that.loginbase.username,
          password:that.loginbase.password,
          submit_at:(new Date()).valueOf().toString().substr(0,10)
        }
        that.loginbase.sign = base64Sort(array);
        // console.log(that.loginbase.sign);
        // ajax请求
          ajax(that,that.extendApi.login,that.loginbase,function(res){
            if (res.code == 200) {
      //存取token到sessionstorage
              sessionStorage.setItem("token", res.data.access_token);
              sessionStorage.setItem("uid", res.data.uid);
              if(that.checked == true){
              	sessionStorage.setItem("username", that.login.username);
              	sessionStorage.setItem("password", that.login.password);
              }
              that.$notify({
                type: 'success',
                title: '提示',
                message: '登陆成功！',
                duration: 2000
              });
      // 页面跳转
              that.$router.push({path:'/user/hardware'});
              }else{
                that.$notify({
                type: 'warning',
                title: '提示',
                message: res.message,
                duration: 2000
              });
            }
          },'POST');
        }
      }
    }
</script>
<style scoped>
.hello{
  width: 100%;
  height: 100vh;
  background: url(../assets/img/background.jpg) no-repeat;
  background-size: 100% 100%; 
}
.login{
  width: 537px;
  height: 458px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -229px 0 0 -268px;
  box-shadow:  0px 0px 30px 30px rgba(80,138,248,0.3);
}
.login p{
  font-size: 24px;
  color: #20A0FF;
  text-align: center;
  margin-top: 46px;
}
.username{
  height: 50px;
  width: 450px;
  line-height: 50px;
  margin: 0 auto;
  margin-top: 70px;
  border: 1px solid #e8e8e8;
  vertical-align: middle;
}
/*.username input{
  border:none;
  outline: none;
}*/
.user{
  margin: 13px 10px 0 20px;
}
.user1{
  position: absolute;
  color: #5d5d5d;
  font-size: 16px;
}
.user2{
  border:none;
  outline: none;
  position: absolute;
  height: 50px;
  width: 300px;
  font-size: 16px;
  margin-left: 70px;
}
.password{
  height: 50px;
  width: 450px;
  line-height: 50px;
  margin: 0 auto;
  margin-top: 50px;
  border: 1px solid #e8e8e8;
}
.password input{
  border:none;
}
.key{
  margin: 13px 10px 0 20px;
}
.key1{
  position: absolute;
  color: #5d5d5d;
  font-size: 16px;  
}
.key2{
  border:none;
  outline: none;
  position: absolute;
  height: 50px;
  width: 300px;
  font-size: 16px;
  margin-left: 70px;
}
.remember{
  margin: 30px 0 0 43px;
}
.loginbtn{
  margin: 26px 0 0 43px;
}
.loginbtn1{
  width: 452px;
  height: 56px;
  font-size: 24px !important;
}
</style>
