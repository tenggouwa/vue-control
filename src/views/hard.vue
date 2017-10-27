<template>
  <div class="soft" >
    <!-- <index-header></index-header>
    <index-left></index-left> -->
    <div id="scrolltop">
      <div class="search" v-loading.fullscreen.lock="fullscreenLoading">
      <el-input class="search-in" v-model="pagesize.search" placeholder="服务器IP/名称"></el-input>
      <el-button class="search-btn" type="primary" icon="search"  @click="hardsearch">搜索</el-button>
      <router-link class="softaddrouter" to='/user/hardadd'>
        <el-button class="search-add" type="primary" icon="plus">添加服务器</el-button>
      </router-link>
    </div>
    <div class="fuwuqi" v-model="DataList" v-for="item in DataList" >
      <div class="fwq-tit">
        <span class="fwq-tit1">{{item.name}}</span>
        <el-button type="danger" class="deletefwq" @click="deletefwq(item.id)">删除服务器</el-button>
        <span class="fwq-tit2">{{item.updated_at}}</span><span class="fwq-tit2-2">更新时间 : </span>
        <span class="fwq-tit2">{{item.created_at}}</span><span class="fwq-tit2-2">创建时间 : </span>
        <hr class="hr"/>
      </div>
      <div class="fwq-container">
        <table>
          <tr>
            <td colspan="3" class="fwq-td1">
                <span class="sp1">中文描述：</span>
                <span class="sp2">{{item.describe}}</span>
            </td>
          </tr>
          <tr>
            <td class="fwq-td1">
              <span class="sp1">服务器用途：</span>
              <span class="sp2">{{item.type|changeyongT}}</span>
            </td>
            <td colspan="2" class="fwq-td1">
              <span class="sp1">所属公司：</span>
              <span class="sp2">{{item.company}}</span>
            </td>
          </tr>
          <tr>
            <td class="fwq-td1">
              <span class="sp1">外网IP：</span>
              <span class="sp2">{{item.ip_network}}</span>
            </td>
            <td colspan="2" class="fwq-td1">
              <span class="sp1">内网IP：</span>
              <span class="sp2">{{item.ip_inner}}</span>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="fwq-td1">
              <span class="sp1">CPU信息：</span>
              <span class="sp2">{{item.cpu}}</span>
            </td>
          </tr>
          <tr>
            <td class="fwq-td1">
              <span class="sp1">机器编号：</span>
              <span class="sp2">{{item.id}}</span>
            </td>
            <td class="fwq-td1">
              <span class="sp1">内存容量：</span>
              <span class="sp2">{{item.memory}}M</span>
            </td>
            <td class="fwq-td1">
              <span class="sp1">硬盘容量：</span>
              <span class="sp2">{{item.disk}}GB</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="fwq-rongl">
        <div class="jindu1">
          <p>CPU信息</p>
          <el-progress class="jindu2" type="circle" :stroke-width="10"  :percentage="Number(item.cpu_usage)"></el-progress>
        </div>
        <div class="jindu1">
          <p>机器内存容量</p>
          <el-progress class="jindu2" type="circle" :stroke-width="10"  :percentage="Number(item.mem_usage)"></el-progress>
        </div>
        <div class="jindu3">
          <p>硬盘容量</p>
        <el-progress class="jindu2" type="circle" :stroke-width="10" :percentage="Number(item.hd_usage)"></el-progress>
        </div>
      </div>
    </div>
    <div class="error-page">
        <el-pagination  
          class="error-page2"
          layout="prev, pager, next" 
          :page-size="pagesize.size" 
          :total="format(sumTotol)"
          @current-change="handleCurrentChange ">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import indexHeader from '../components/header.vue'
import indexLeft from '../components/left.vue'
import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'

export default {
  // name: 'hello',
    data () {
      return {
        sumTotol:0,
        pagesize:{
          search:'',
          page:1,
          size:2
        },
        match_id:'',
        DataList:[],
        array:{
          id:''
        },
        interTime:0,
        fullscreenLoading: false,
      }
    },
    // 选择器判断服务器
    filters:{
      changeyongT(e){
        // console.log(e)
        let labelname="";
        switch(e)
        {
          case '1':
          labelname="节点服务器";
          break;
          case '2':
          labelname="备用节点服务器";
          break;
          case '3':
          labelname="应用服务器";
          break;
          case '4':
          labelname="备用应用服务器";
          break;
          case '5':
          labelname="数据服务器";
          break;
          case '6':
          labelname="备用数据服务器";
          break;

        }
        return labelname;
      }
    },
    created(){
      this.openFullScreen();
      this.request();
      this.interTime=setInterval(()=>{
         this.request(); 
          // this.accountInfo();
        }, 20000);
      
    },
    mounted(){
      this.$nextTick(()=>{
        var height=window.screen.availHeight-100+"px";
        var ele=document.getElementById('scrolltop');
        ele.style.height=height;

      })
    },
    // 销毁实时加载的数据
    destroyed:function(){
      clearInterval(this.interTime);
    },
    methods:{
        async openFullScreen() {
            this.fullscreenLoading = true;
            // setTimeout(() => {
            //   this.fullscreenLoading = false;
            // }, 50000);
          },
      //列表加载
        async request(){
            let that = this;
            await  ajax(that,that.extendApi.hardlist,that.pagesize, (res) => {
                if (res.code == 200) {
                  that.sumTotol = Number(res.data.total);
                  that.DataList = res.data.rows;
                  // console.log( that.DataList[0].cpu_usage);
                  // for(let i=0;i<that.DataList.length;i++){
                  //   // let id=that.DataList[i].id;
                  //   // console.log("id:"+that.DataList[i].id)
                  //   // that.Progressbar(id,that.DataList[i])
                  //   // that.deletefwq(id);
                  //  }
                  that.fullscreenLoading = false;
                }else{
                  console.log('失败');
                }
            },'POST');
        },
      //进度条第一次加载
        // async Progressbar(id,list){
        //     let that = this;
        //     // console.log(that.match_id)
        //     let array={
        //      'id':id
        //     }
        //    await ajax(that,that.extendApi.serverInfo,array,(data) =>{
        //          // console.log(123)
        //          if (data.code == 200) {
        //           console.log(1);
        //           list.progresslist=data.data;
        //           console.log(list.progresslist.cpu_usage);
        //           // list=data.data;
        //           // return list;
        //          }else{
        //           console.log(123);
        //          }
        //     },'POST');
        // },
      //搜索按钮
        hardsearch(){
            this.request();
        },
      //删除按钮
        deletefwq(id){
            console.log("123:"+id)
            let that = this;
            that.array.id=id;
            ajax(that,that.extendApi.fwqdelete,that.array,(response) =>{
              if (response.code == 200) {       
                this.$notify({
                    type: 'success',
                    title: '提示',
                    message: response.message,
                    duration: 2000
                });
                this.request(); 
              }else{
                this.$notify({
                    type: 'warning',
                    title: '提示',
                    message: response.message,
                    duration: 2000
                });
              }
            },'POST');
          },
        // 分页
        handleCurrentChange(currentPage) {
          var _this = this;
          _this.pagesize.page = currentPage;
          _this.request();
          _this.fullscreenLoading = true;
        },
        format(e){
          return Number(e);
        },
      // loading效果
        
      },
    components:{
      indexHeader,
      indexLeft
    }
  }
</script>
<style scoped>
  #scrolltop{
    overflow-y: auto;
  }
  .search{
    margin:20px 20px 0 20px;
    background: #fff;
    border-radius: 10px;
    height: 100px;
  }
  .search-in{
    float: left;
    width: 180px !important;
    height: 36px;
    margin: 30px 10px 0 20px;
  }
  .search-btn{
    float: left;
    width: 79px;
    height: 36px;
    margin-top: 30px !important;
  }
  .search-add{
    float: right;
    width: 130px;
    height: 36px;
    margin: 30px 20px 0 0 !important;
  }
  .fuwuqi{
    margin:20px 20px 0 20px;
    background: #fff;
    border-radius: 10px;
    height: 350px;
  }
  .deletefwq{
    float: right;
    margin: 13px 0 0 20px;
    font-size: 12px;
    width: 90px;
  }
  .fwq-tit{
    height: 60px;
    line-height: 60px;
    margin: 0 20px;
  }
  .fwq-tit1{
    font-size: 16px;
    color: #1f2f3d;
    font-weight: bold;
  }
  .fwq-tit2{
    float: right;
    color: #1f2f3d;
  }
  .fwq-tit2-2{
    float: right;
    font-size: 14px;
    color: #bfcbd9;
    margin-left: 30px;
  }
  .fwq-container{
    float: left;
    margin: 12px 0 0 20px;
    width: 900px;
  }
  .fwq-td1{
    width: 280px;
    height: 50px;
  }
  .fwq-td2{
    width: 300px;
    height: 50px;
  }
  .sp1{
    font-size: 14px;
    color: #bfcbd9;
  }
  .sp2{
    font-size: 14px;
    color: #1f2f3d;
  }
  .fwq-inform{
    width: 860px;
    margin-top: 20px;
    /*background: #ccc;*/
  }
  .sp1-1{
    float: left;
    font-size: 14px;
    color: #bfcbd9;
  }
  .sp2-1{
    float: left;
    margin-top: -20px;
    margin-left: 76px;
    font-size: 14px;
    color: #1f2f3d;
  }
  .fwq-rongl{
    float: left;
    margin: 57px 0 0 50px;
  }
  .jindu1{
    float: left;
    margin-left: 40px;
    text-align: center;
  }
  .jindu3{
    float: left;
    margin-left: 40px;
    text-align: center;
  }
  .jindu2{
    margin-top: 30px;
  }
  .hr{
    border: 1px solid #bfcbd9;
  }
  .error-page{
    width: 100%;
    /*background: #090;*/
    margin-top: 20px;
    display: inline-block;
    padding-bottom: 80px; 
    text-align: center;
  }
  .error-page2{
   /* position: absolute;*/
/*    left: 50%;*/
  /*  margin-left: 100px;*/
  }
  @media screen and (max-width: 1780px) {
    .fuwuqi{
       height: 568px;
    }
    .jindu1{
      margin-right: 150px;
    }
    .fwq-rongl{
      margin-top: 20px;
    }
}
</style>
