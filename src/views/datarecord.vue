<template>
  <div class="hard" id="datarecordscroll">
    <div class="container">
      <div class="addheard">
        <div class="soft-page">
          <el-pagination  
          class="soft-page2"
          layout="prev, pager, next" 
          :page-size="pagesize.size" 
          :total="format(sumTotol)"
          @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class="softmodel" v-for="item in datarecord">
        <div class="model">
          <div class="model1">
            <div class="model1-title">
              <h4>{{item.describe}}</h4> 
              <p>{{item.name}}</p>
            </div>
            <div class="model1-nav">
              <h2>{{item.user_num}}</h2>
              <p>用户注册量</p>
              <el-tooltip placement="bottom"  effect="light">
                <div slot="content">
                  <span class="czname">操作名</span><span class="cnum">操作数量</span>
                  <div v-for="actiones in item.actions">
                   <span class="czname"> {{actiones.actionid}}</span>
                   <span class="cnum"> {{actiones.count}}</span>
                    <br/>
                  </div>
                </div>
                <i class="el-icon-arrow-down"></i>
              </el-tooltip>
              
            </div>
          </div>
        </div>
        
        
        
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../config/api-config.js'
  import {ajax,getcookie} from '../assets/js/common.js'
  export default {
  // name: 'hello',
    data () {
      return {
        input:'',
        sumTotol:0,
        pagesize:{
          page:1,
          size:10
        },
        datarecord:[],
        }
    },
    created(){
          this.request();
      },
       mounted(){
        this.$nextTick(()=>{
        var height=window.screen.availHeight-200+"px";
        var ele=document.getElementById('datarecordscroll');
        ele.style.height=height;
        })
      },
    methods:{
          request(){
            let _this = this;
            // console.log()
            ajax(_this,_this.extendApi.datarecord,_this.pagesize,function(res){
                if (res.code == 200) {
                  // console.log(res.data);
                  _this.datarecord = res.data;
                }else{
                  // console.log(2);
                }
            },'POST')
          },
          // 分页
          handleCurrentChange(currentPage) {
            var _this = this;
            _this.pagesize.page = currentPage;
            _this.request();
          },
          format(e){
            return Number(e);
          },
    },
  }
</script>
<style scoped>
#datarecordscroll{
  overflow-y: auto;
}
  .addheard{

    background: #fff;
    height: 60px;
    border-radius: 10px;
  }
  .soft-add{
    margin: 12px 0 0 20px;
  }
  .soft-page{
    float: right;
    margin:15px 20px 0 0;
  }
  .softmodel{
    margin:20px 0 0 -20px;
  }
  .model{
    width:25%;
    float: left;  
  }
  @media screen and (max-width: 1500px) {
    .model {
        width:33.3%;
    }
  }
  @media screen and (max-width: 1100px) {
    .model {
        width:45%;
    }
  }
  .model1{
    margin:0 0 20px 20px;
    height: 160px;
    background: #fff;
    border-radius: 10px;
    /*border:1px solid #fff;*/
  }
  .model1-title{
    height: 60px;
    background: #20a0ff;
    color: #fff;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
  }
  .model1-title h4{
    font-size: 18px;
    line-height: 34px;
    margin-left: 20px;
  }
  .model1-title p{
    font-size: 16px;
    margin-left: 20px;
  }
  .model1-nav{
    text-align: center;
  }
  .model1-nav h2{
    font-size: 30px;
    color: #20a0ff;
    margin-top: 20px;
  }
  .model1-nav p{
    font-size: 14px;
    color: #888;
  }
 .czname{
    display: inline-block;
    line-height: 24px;
    width: 90px;

  }
  .cnum{
    display: inline-block;
    width: 90px;
    line-height: 24px;
  }
  .el-icon-arrow-down{
    color: #99A9BF;
  }
</style>