<template>
	<div class="hardadd">
    <div id="heightScroll">
      <div class="hardadd1" >
        <el-breadcrumb separator="/" class="bread">
          <el-breadcrumb-item :to="{ path: '/user/hardware' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>服务器添加</el-breadcrumb-item>
        </el-breadcrumb>
      <p>添加服务器</p>
      <div class="hardadd1for">
        <el-form ref="form" :model="form" label-width="100px" class="hardadd1form">
          <el-form-item label="服务器名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="外网IP:">
            <el-input v-model="form.ip_network"></el-input>
          </el-form-item>
          <el-form-item label="内网IP:">
            <el-input v-model="form.ip_inner"></el-input>
          </el-form-item>
          <el-form-item label="所属公司:">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="服务器用途:">
            <el-select class="addselect1" v-model="form.type" placeholder="数据服务">
              <el-option label="节点服务器" value="1"></el-option>
              <el-option label="备用节点服务器" value="2"></el-option>
              <el-option label="应用服务器" value="3"></el-option>
              <el-option label="备用应用服务器" value="4"></el-option>
              <el-option label="区域二数据服务器" value="5"></el-option>
              <el-option label="备用数据服务器" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据端口:">
            <el-input v-model="form.port"></el-input>
          </el-form-item>
          <el-form-item label="中文名称:">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="hardaddbtn">确定</el-button>
            <el-button @click="hardaddno">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    </div>
 	</div>
</template>
<script>
import api from '../config/api-config.js'
import {ajax,base64Sort} from '../assets/js/common.js'

export default {
  // name: 'hello',
  data () {
    return {
        form: {
          name: '',      //服务器名称
          ip_network: '',//外网IP
          ip_inner: '',  //内网IP
          company: '',   //所属公司
          type: '',      //服务器用途
          describe: '',  //中文描述
          port: '',       //端口号
          sign: '',
        },
        // formbase: {
        //   name: '',      //服务器名称
        //   ip_network: '',//外网IP
        //   ip_inner: '',  //内网IP
        //   company: '',   //所属公司
        //   type: '',      //服务器用途
        //   describe: '',  //中文描述
        //   port: '',       //端口号
        //   sign: '',
        // }
      }
  },
  mounted(){
      this.$nextTick(()=>{
        var height=window.screen.availHeight-160+"px";
        var ele=document.getElementById('heightScroll');
        ele.style.height=height;

      })
    },
  methods:{
    // 返回按钮
    hardaddno(){
      window.history.go(-1);
    },
    // 添加服务器
   async hardaddbtn(){
      let that = this;
      // that.formbase.name = that.form.name;
      // that.formbase.ip_network = that.form.ip_network;
      // that.formbase.ip_inner = that.form.ip_inner;
      // that.formbase.company = that.form.company;
      // that.formbase.type = that.form.type;
      // that.formbase.describe = that.form.describe;
      // that.formbase.port = that.form.port;
      // that.formbase.sign = that.form.sign;
      let array = {
          name:that.form.name,
          ip_network:that.form.ip_network,
          ip_inner:that.form.ip_inner,
          company:that.form.company,
          type:that.form.type,
          describe:that.form.describe,
          port:that.form.port,
          // sign:that.form.sign,
          submit_at:(new Date()).valueOf().toString().substr(0,10)
        }
        that.form.sign = base64Sort(array);
        console.log(that.form.sign);
    await  ajax(that,that.extendApi.hardadd,that.form,(res) =>{
          if (res.code == 200) {
             that.$notify({
              type: 'success',
              title: '提示',
              message: res.message,
              duration: 2000
          });
             window.history.go(-1);
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
  },

}
</script>
<style scoped>
 #heightScroll{
  overflow-y: auto;
 }
 .bread{
  padding:20px 0 0 80px ;
 }
  .hardadd1{
   /* margin: 20px 20px 0 20px;*/
    background: #fff;
    line-height: 84px;
    border-radius: 5px;
  }
  .hardadd1 p{
    margin: 0 0 0 32px;
    font-size: 16px;
    color: #1f2f3d;
    font-weight: bold;
  }
  .hardadd1for{
    margin-left: 100px;
  }
  .hardadd1form{
    width: 450px;
    display: inline-block !important;
  }
  .addselect1{
    width: 350px;
  }
</style>