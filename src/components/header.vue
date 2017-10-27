<template>
	<div class="header">
		<router-link to="/user/hardware" class="headerlink"><h1>后台监控系统</h1></router-link>
		<el-button class="gobackbtn" type="primary" @click="goback">退出</el-button>
	</div>
</template>
<script>
import api from '../config/api-config.js'
import {ajax,base64Sort} from '../assets/js/common.js'
	export default{
		methods:{
			goback(){
				// let path="/softpoint?id="+id;
        		// this.$router.push("/index");
        		ajax(this,this.extendApi.loginout,'',(res)=>{
        			if(res.code == 200){
        				this.$router.push("/index");
        				this.$notify({
		                    type: 'success',
		                    title: '提示',
		                    message: '注销成功！',
		                    duration: 2000
		                });
		                sessionStorage.setItem("token", '');
              			sessionStorage.setItem("uid", '');
		                this.$router.push("/index");
        			}else{
        				this.$notify({
        					type: 'warning',
        					title:'提示',
        					message: res.message,
        					duration: 2000
        				})
        			}
        		},'GET');
			}
		}
	}
</script>
<style scoped>
*{
	margin:0;
	padding: 0;
	.header{
	 	width: 100%;
	 	background: #20a0ff;
	 	height: 80px;
	 }
	h1{
		color: #fff;
		font-size: 28px;
		margin-left: 40px;
		line-height: 80px;
	 }
	  .gobackbtn{
	 	border: 1px solid #fff !important;
	 	position: absolute;
	 	right: 50px;
	 	top: 23px;
	 	width: 100px;
	 }
	 .headerlink{
	 	text-decoration: none;
	 }
}
</style>