<template>
  <div class="hard" id="errorcomondscroll">
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
      <div class="softmodel" v-for="item in tableData">
        <div class="model">
          <div class="model1">
            <div class="model1-title">
              <h4>{{item.type | typefilter}}</h4> 
              <input type="button" value="查看详情" id="btn1" @click="lookmin(item.error)">
            </div>
            <div class="model1-nav">
              <table class="model1-tab">
                <tr>
                  <td class="model1-td">记录号</td>
                  <td>{{item.log_id}}</td>
                </tr>
                <tr>
                  <td class="model1-td">项目编号</td>
                  <td>{{item.project_id}}</td>
                </tr>
                <tr>
                  <td class="model1-td">机器编号</td>
                  <td>{{item.mach_id}}</td>
                </tr>
                <tr>
                  <td class="model1-td">创建时间</td>
                  <td>{{item.created_time}}</td>
                </tr>
                <tr>
                  <td class="model1-td">更新时间</td>
                  <td>{{item.updated_time}}</td>
                </tr>
                <tr>
                  <td class="model1-td">操作状态</td>
                  <td>{{item.status | statusT}}
                  <input type="button" value="处理" id="btn" @click="dialogerrordis = true;showTip(item.log_id)" v-if="item.intruduction"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <el-dialog
          title="异常信息"
          :visible.sync="dialogVisible"
          size="tiny">
          <span v-html="errormassage"></span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="异常信息"
          :visible.sync="dialogerrordis"
          size="tiny">
          <span>确认进行处理操作吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogerrordis = false">取 消</el-button>
            <el-button type="primary" @click="dialogerrordis = false;introduce()">确 定</el-button>
          </span>
        </el-dialog>       
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
          size:12
        },
        tableData: [],
        introdu:{
          id:'',
        },
        intruduction :true,
        dialogVisible : false,
        dialogerrordis : false,
        errormassage :'',
        tipId:"",
        // count:10,
        }
      },
    created(){
          this.request();
      },
    filters:{
      filterCode(val){
        val="<span>"+val+"</span>";
        return val;
      },
      typefilter(e){
        // console.log(e)
        let labelname="";
        switch(e)
        {
          case '1':
          labelname="硬件异常";
          break;
          case '2':
          labelname="应用异常";
          break;
          case '3':
          labelname="节点异常";
          break;
        }
        return labelname;
      },
      statusT(e){
        let labelname="";
        switch(e)
        {
          case '1':
          labelname="待处理";
          break;
          case '2':
          labelname="已处理";
          break;
        }
        return labelname;
      }
    },
     mounted(){
        this.$nextTick(()=>{
        var height=window.screen.availHeight-200+"px";
        var ele=document.getElementById('errorcomondscroll');
        ele.style.height=height;
        })
      },
    methods:{
          showTip(id){
            this.tipId=id;
          },
          // 异常信息列表加载
          request(){
            let that = this;
            ajax(that,that.extendApi.errorcomond,that.pagesize,function(res){
                if (res.code == 200) {
                  that.sumTotol = Number(res.data.count);
                  that.tableData = res.data.rows;
                  // if(that.tableData.status == "已处理"){
                  //   that.intruduction = false;
                  // }
                  if(that.tableData.length>0){
                    for(let i=0 ;i<that.tableData.length;i++){
                      that.tableData[i].error=that.tableData[i].error.replace(/&lt;/g,"<");
                      that.tableData[i].error=that.tableData[i].error.replace(/&gt;/g,"\/>");
                      // console.log(that.tableData[i].error);
                      that.tableData[i].error=that.tableData[i].error;
                      console.log(that.tableData[i].error);

                      if ( that.tableData[i].status == "1") {
                        that.tableData[i].intruduction = true;
                      }else{
                        that.tableData[i].intruduction = false;
                      }
                    }
                  }
                }else{
                  // console.log('失败');
                }
            },'POST')
          },
          // 异常处理按钮
          introduce(){
            this.introdu.id = this.tipId;
            ajax(this,this.extendApi.errorintroduce,this.introdu,(res)=>{
              if(res.code == 200){
                this.$notify({
                  type: 'success',
                  title: '提示',
                  message: '处理成功！',
                  duration: 2000
                });
                this.intruduction = false;
                this.request();
              }else{
                this.$notify({
                  type: 'warning',
                  title: '提示',
                  message: '处理失败！',
                  duration: 2000
                });
              }
            },'POST');
          },
          // 查看详情按钮
          lookmin(error){
            // console.log("哈哈哈哈"+id);
            this.dialogVisible = true;
            this.errormassage = error;
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
#errorcomondscroll{
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
    height: 240px;
    background: #fff;
    border-radius: 10px;
    border:1px solid #fff;
  }
  .model1-title{
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #e9ebf0;
    color: #20a0ff;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
  }
  #btn{
    background: #20a0ff;
    border:1px solid #20a0ff;
    border-radius: 10px;
    width: 40px;
    height: 30px;
    color: #fff;
    float: right;
    margin: -49px 20px 0 0 ;
    outline: none;
    cursor: pointer;
  }
  #btn1{
    background: #20a0ff;
    border:1px solid #20a0ff;
    border-radius: 10px;
    width: 80px;
    height: 35px;
    color: #fff;
    float: right;
    margin: -49px 20px 0 0 ;
    outline: none;
    cursor: pointer;
    text-align: center;
  }
  .model1-title h4{
    font-size: 18px;
    line-height: 60px;
    margin-left: 20px;
  }
  .model1-nav{
    text-align: center;
  }
  .model1-tab{
    margin-top: 10px;
    line-height: 24px;
    margin-left: 20px;
    text-align: left;
  }
  .model1-td{
    padding-right: 20px;
    color: #888;
  }
  #btn{
    margin-top: 0px;
  }
 

</style>