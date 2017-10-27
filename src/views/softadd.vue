<template>
	<div class="softadd">
    <div class="softadd1" id="scrollsoftadd">
      <div class="softadd1-1">      
        <el-form ref="form" :model="form" label-width="100px" class="softadd1form">
        <!-- 添加项目信息 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/user/hardware' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/user/soft' }">项目监控</el-breadcrumb-item>
          <el-breadcrumb-item>项目添加</el-breadcrumb-item>
        </el-breadcrumb>
        <p class="softadd1forp">添加项目信息</p>
          <el-form-item label="项目名称:">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="中文描述:">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <el-form-item label="所属公司:">
            <el-input v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item label="版本信息:">
            <el-select class="addselect1" v-model="form.version">
              <el-option label="内测版" value="1"></el-option>
              <el-option label="公测版" value="2"></el-option>
              <el-option label="正式版" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目状态:">
            <el-select class="addselect1" v-model="form.status">
              <el-option label="上线" value="1"></el-option>
              <el-option label="未上线" value="-1"></el-option>
            </el-select>
          </el-form-item>
          <!-- 添加关联服务器 -->
          <div id="addpointsoft" ref="addjiedianpoint" class="softaddpoint">
            <p class="softadd1forp">添加关联服务器</p>
            <!-- 添加关联服务器模板 -->
            <template v-for="(subjiectIndex,subject) in form.nodelist">
              <el-form-item class="addfwq" :label="subjiectIndex.label">
                <el-select class="addselect2" v-model="form.nodelist[subject].id" id="addselect" @change="showForm">
                  <el-option  v-for="item in pointlist" :label="item.name" :value="item.id" :key="item.ip"></el-option>                 
                  <el-option label="添加服务器" value="99" ></el-option>
                </el-select>
               <!-- 删除节点按钮 -->
                <el-button class="deletejiedian" type="danger" icon="close" size="mini" @click="deletejiedian(subject)"></el-button>
              </el-form-item>            
            </template>
            <el-button class="addfwq1" type="primary" icon="plus"   @click="addjiedian()">添加节点</el-button>
            <el-input v-model="form.node_port" placeholder="请输入端口号" class="softaddinput"></el-input>
          </div>
          <!-- 应用服务器 -->
          <p class="softadd1forp">应用服务器</p>
          <el-form-item label="应用机器:">
            <el-select class="softyyfwq" v-model="form.web_machine">
              <el-option v-for="item in appserverList" :label="item.name"  :value="item.id" :key="item.ip"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL:">
            <el-input v-model="form.web_count_port" class="softaddinputtouji"></el-input>
          </el-form-item>
          <!-- 添加应用服务器模板 -->
          <template v-for="(subjiectIndex,index) in servermachin">
            <el-form-item label="描述:">
              <el-input class="yyfwqdescribe" v-model="subjiectIndex.desc"></el-input>
              <el-input class="yyfwqport" v-model="subjiectIndex.port" placeholder="端口"></el-input>
                <!-- 删除应用服务器按钮 -->
              <el-button class="deleteyyfwq" type="danger" icon="close" size="mini" @click="deleteservermachin(subjecto)"></el-button>
            </el-form-item>
          </template>
          <el-button class="addfwq1" type="primary" icon="plus" @click="addservermachin()">添加服务器</el-button>         
          <!-- @click="dialogFormVisible = true" -->
          <!-- 添加管理者 -->
          <p class="softadd1forp">添加管理者</p>
          <el-form-item label="管理员:">
            <el-select class="addselect1" v-model="mangertype"  multiple>
            <!--  multiple -->
              <el-option  v-for="item in mangerList" :label="item.name" :value="item.id"></el-option>
              <!-- <el-option label="添加管理员" value="98"></el-option> -->
            </el-select>
            <el-button class="addfwq2" type="primary" icon="plus"  @click="addmanger">添加管理员</el-button>
          </el-form-item>
          <div>
          <el-button class="addformbtn1" @click="hardaddno">取 消</el-button>
          <el-button class="addformbtn2" type="primary" @click="submitallformat()">确 定</el-button>
        </div>
        </el-form>        
      </div>
    </div>   
    <!-- 弹出框 -->
    <el-dialog title="添加服务器" :visible.sync="dialogTableVisible"   class="softadd1alert">
      <el-form ref="formadd" :model="formadd" label-width="100px" class="softadd1alert1">
         <el-form-item label="服务器名称:">
            <el-input v-model="formadd.name"></el-input>
          </el-form-item>
          <el-form-item label="外网IP:">
            <el-input v-model="formadd.ip_network"></el-input>
          </el-form-item>
          <el-form-item label="内网IP:">
            <el-input v-model="formadd.ip_inner"></el-input>
          </el-form-item>
          <el-form-item label="所属公司:">
            <el-input v-model="formadd.company"></el-input>
          </el-form-item>
          <el-form-item label="服务器用途:">
            <el-select class="addselect1" v-model="formadd.type" placeholder="数据服务">
              <el-option label="节点服务器" value="1"></el-option>
              <el-option label="备用节点服务器" value="2"></el-option>
              <el-option label="应用服务器" value="3"></el-option>
              <el-option label="备用应用服务器" value="4"></el-option>
              <el-option label="区域二数据服务器" value="5"></el-option>
              <el-option label="备用数据服务器" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据端口:">
            <el-input v-model="formadd.port"></el-input>
          </el-form-item>
          <el-form-item label="中文描述:">
            <el-input type="textarea" v-model="formadd.describe"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;addotherselect()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 管理员弹框 -->
    <el-dialog title="添加管理员" :visible.sync="dialogTableVisiblemanger"   class="softadd1alert">
      <el-form ref="formmanger" :model="formmanger" label-width="100px" class="softadd1alert1">
        <el-form-item label="姓名:">
          <el-input v-model="formmanger.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="formmanger.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="formmanger.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisiblemanger = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisiblemanger = false;softaddmanger()">确 定</el-button>
      </div>
    </el-dialog>
 	</div>
</template>
<script>
import api from '../config/api-config.js'
import {ajax,base64Sort} from '../assets/js/common.js'
export default {
  // name: 'hello',
  data () {
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogTableVisiblemanger: false,
        dialogFormVisiblemanger: false,
        formadd:{
          name: '',      //服务器名称
          ip_network: '',//外网IP
          ip_inner: '',  //内网IP
          company: '',   //所属公司
          type: '',      //服务器用途
          describe: '',  //中文描述
          port: '',       //端口号
        },
        formmanger:{
          name: '',     //姓名
          email: '',    //邮箱
          mobile: '',   //手机号
        },
        form: {
          name: '',//添加项目名称
          describe: '',//中文描述
          company: '',//所属公司
          version:'',//项目版本信息：1:内测版 2:公测版 3:正式版
          status:'',//状态
          admin_ids:'',//管理员编号，多个以,号隔开
          machine_ids:'',//机器编号，多个以,好隔开
          node_port:'',//节点监听端口
          web_machine:'',//应用服务器编号
          web_ports:'',//引用监听端口
          web_count_port:'',//应用服务器url
          nodelist:[],
          node_port:'',//添加节点端口
          // servermachin:[],
        },
        formLabelWidth: '120px',
        pointlist: [],
        mangerList: [
          {
            id:'',
            name:'',
          }
        ],
        value5: [],
        // serverdesc:[
        //   {
        //     desc:'',
        //     port:'',

        //   }
        // ],
        appserverList:[],
        nodeList:[{
          index:0,
          id:'',
          label:'节点1'
        }],
        servermachin:[{
          index:0,
          id:'',
          label:'描述',
          desc:'',
          port:'',
        }],
        // nodelist:[],
        type:{
          type:1,
        },
        typeo:{
          type:1,
        },

        yyfwq:{
          type:1,
        },
        mangertype:[],
        // manger:{
        //   type:[],
        // },
        indexItem:1,
        portIndex:1,
      };
      },
      created(){
        this.form.nodelist=this.nodeList;
        this.form.servermachin=this.servermachin;
        this.pointList();
        this.AddmangerList();
        this.AppfuwuqiList();
      },
      mounted(){
        this.$nextTick(()=>{
        var height=window.screen.availHeight-200+"px";
        var ele=document.getElementById('scrollsoftadd');
        ele.style.height=height;
        })
      },
      methods:{
        // 节点列表服务器下拉接口
        pointList(){
          let that = this;
          ajax(that,that.extendApi.pointlist,that.type,(point)=>{
              if (point.code == 200) {
                that.pointlist = point.data;
              }else{
              }
          },'POST');
        },
        // 管理员下拉接口
        AddmangerList(){
          let that = this;
          ajax(that,that.extendApi.mangerList,that.typeo,(mangerres)=>{

            if (mangerres.code == 200) {

               that.mangerList = mangerres.data
               // console.log(that.mangerList)

              // console.log(123456);
            }else{
              // console.log(9876543);
            }
          },'POST');
        },
        // 应用服务器下拉
        AppfuwuqiList(){
          let that =this;
          ajax(that,that.extendApi.pointlist,{type:3},(mangerres)=>{

            if (mangerres.code == 200) {

               that.appserverList = mangerres.data
               // console.log(that.mangerList)

              // console.log(123456);
            }else{
              // console.log(9876543);
            }
          },'POST');

        },
        // 头部返回按钮
        softaddno(){
          window.history.go(-1);
        },
        // 添加服务器信息
        addotherselect(){
          let that = this;
            // console.log(that.form);
          ajax(that,that.extendApi.hardadd,that.formadd,(res) =>{
                if (res.code == 200) {
                   that.$notify({
                    type: 'success',
                    title: '提示',
                    message: res.message,
                    duration: 2000
                });
                 that.pointList(); 
                }else{
                  that.$notify({
                    type: 'warning',
                    title: '提示',
                    message: res.message,
                    duration: 2000
                });
                }
            },'POST');
        },
        // 添加管理员
        softaddmanger(){
          let that = this;
          ajax(that,that.extendApi.mangeradd,that.formmanger,(datares)=>{
            if (datares.code == 200) {
              // console.log('成功')
                   that.$notify({
                    type: 'success',
                    title: '提示',
                    message: datares.message,
                    duration: 2000
                });
                   // 刷新页面
                    that.AddmangerList();
                     that.dialogTableVisiblemanger=false;
                }else{
                  // console.log('失败')
                  that.$notify({
                    type: 'warning',
                    title: '提示',
                    message: datares.message,
                    duration: 2000
                });
                }
              },'POST');
        },
        // 提交整个表单
        submitallformat(){
          let that =this;
          // console.log();
          // console.log(this.form.nodelist);
          this.form.admin_ids='';
          this.form.web_ports='';
          this.form.machine_ids='';
          if(this.servermachin.length>0){
            for(let i=0;i<this.form.servermachin.length;i++){
              if(i==this.form.servermachin.length-1){
                this.form.web_ports=this.form.web_ports+this.form.servermachin[i].desc+':'+this.form.servermachin[i].port;
              }else{
                this.form.web_ports=this.form.web_ports+this.form.servermachin[i].desc+':'+this.form.servermachin[i].port+',';
              }
            }
          }
          // console.log(111111);
          // console.log(this.mangertype);
          if(this.mangertype){
            for(let i=0;i<this.mangertype.length;i++){
              
              if(i==this.mangertype.length-1){
                this.form.admin_ids=this.form.admin_ids+this.mangertype[i];
              }else{
                this.form.admin_ids=this.form.admin_ids+this.mangertype[i]+',';
              }
            }
          }
          
          if(this.form.nodelist.length>0){
            for(let i=0;i<this.form.nodelist.length;i++){
              if(i==this.form.nodelist.length-1){
                this.form.machine_ids=this.form.machine_ids+this.form.nodelist[i].id;
              }else{
                this.form.machine_ids=this.form.machine_ids+this.form.nodelist[i].id+',';
              }
              
            }
          }
          // form: {
        //   name: '',//添加项目名称
        //   describe: '',//中文描述
        //   company: '',//所属公司
        //   version:'',//项目版本信息：1:内测版 2:公测版 3:正式版
        //   status:'',//状态
        //   admin_ids:'',//管理员编号，多个以,号隔开
        //   machine_ids:'',//机器编号，多个以,好隔开
        //   node_port:'',//节点监听端口
        //   web_machine:'',//应用服务器编号
        //   web_ports:'',//引用监听端口
        //   nodelist:[],
        //   node_port:'',//添加节点端口
        //   // servermachin:[],
        // },
        let array = {
          name : that.form.name,
          describe : that.form.describe,
          company : that.form.company,
          version : that.form.version,
          status : that.form.status,
          admin_ids : that.form.admin_ids,
          machine_ids : that.form.machine_ids,
          node_port : that.form.node_port,
          web_machine : that.form.web_machine,
          web_ports : that.form.web_ports,
          web_count_port : that.form.web_count_port,
          // nodelist : that.form.nodelist,
          node_port : that.form.node_port,
          submit_at:(new Date()).valueOf().toString().substr(0,10)
        }
        that.form.sign = base64Sort(array);
          // console.log(this.form.machine_ids);
          ajax(that,that.extendApi.softaddform,that.form,(res)=>{
              if(res.code == 200){
                  // console.log(1);
                  that.$notify({
                    type: 'success',
                    title: '提示',
                    message: '操作成功',
                    duration: 2000
                });
                  that.$router.push({path:'/user/soft'});
              }else{
                that.$notify({
                    type: 'warning',
                    title: '提示',
                    message: res.message,
                    duration: 2000
                });
                  // console.log(2);
              }
          },'POST');
        },
        // 添加节点dom
        addjiedian(){
          let newIndex=Number(this.indexItem+1);
          var subjectDatames={};
          subjectDatames.id =newIndex;
          subjectDatames.label ="节点"+newIndex;
          this.indexItem++;
          this.nodeList.push(subjectDatames);
          this.form.nodelist=this.nodeList;
          // console.log(11111);
          // console.log(this.form.nodelist);
          // console.log(this.nodeList);
        },
        // 删除节点dom
        deletejiedian(index){
          // console.log(index)

         // this.nodeList[index]
          this.nodeList.pop(this.nodeList[index]);
          this.indexItem--;
          this.form.nodelist=this.nodeList;
        },
        // 添加关联服务器
        addservermachin(){
          // console.log(this.portIndex);
          // console.log(this.servermachin);
          if(this.servermachin[this.portIndex-1].desc!='' && this.servermachin[this.portIndex-1].port!=''){
            let newIndex=Number(this.portIndex+1);
            var subjectoDatames={};
            subjectoDatames.id =newIndex;
            subjectoDatames.label ="节点"+newIndex;
            subjectoDatames.desc='';
            subjectoDatames.port='';
            this.servermachin.push(subjectoDatames);
          }else{
            this.$notify({
              type: 'warning',
              title: '提示',
              message: '请输入描述和端口号',
              duration: 2000
            });
          }
          
          // this.form.servermachin=this.servermachin;
        },
        // 删除服务器
        deleteservermachin(index){
          // console.log(index)

         // this.nodeList[index]
          this.servermachin.pop(this.servermachin[index]);
          this.form.servermachin=this.servermachin;
          this.portIndex--;
        },
        // 添加服务器弹框
        showForm(value){
          if(value==99){
            this.dialogTableVisible=true;
          }
        },
        // 添加管理员弹框
        addmanger(){
            this.dialogTableVisiblemanger=true;
        },
        //取消按钮
        hardaddno(){
          window.history.go(-1);
        },
        
        
      },
  }
  

</script>
<style scoped>
#scrollsoftadd{
  overflow-y: auto;
}
  .softadd1{
    margin: 20px 20px 50px 0;
    background: #fff;
    border-radius: 10px;
  }
  .softadd1-1{
    margin: 20px 0 0 32px;
  }
  .softadd1forp{
    line-height: 80px;
    font-size: 16px;
    color: #1f2f3d;
    font-weight: bold;
    margin-left: -50px;
  }
  .softadd1form{
    margin: 0px 0 0 52px;
    width: 450px;
    display: inline-block !important;
  }
  .addfwq1{
    /*float: right;
    margin-right: -140px !important;
    margin-top: -58px !important;*/
    margin-left: 100px;
  }
  .addfwq2{
    margin: 20px 0;
  }
  .addformbtn1{
    float: right;
  }
  .addformbtn2{
    float: right;
    margin-right: 20px !important;
  }
  .softadd1alert{
    width: 1100px;
    overflow: hidden !important;
    margin: 0 0 0 400px !important;
  }
  .softadd1alert1{
    width: 450px;
  }
  .addselect1{
    width: 350px;
  }
  .addselect2{
    width: 200px;
    float: left;
  }
  /*.addpointsoft{
    position: relative;
  }*/
  .softaddinput{
    width: 90px !important;
    float: right;
    margin-top:-60px;   
    /*top:550px;*/
    margin-left: 150px;
  }
  .softaddinputtouji{
    float: right;
    width: 350px !important;
    /*margin-top: 20px;*/
  }
  .deletejiedian{
    float: left;
    margin-left: 18px;
    width: 22px;
    height: 22px;
    margin-top: 8px;
   border-radius: 50%;
  }
  .softyyfwq{
    width: 350px !important;
  }
  .yyfwqdescribe{
    width: 200px;
  }
  .yyfwqport{
    width: 90px;
    margin-left: 15px;
  }
  .deleteyyfwq{
     border-radius: 50%;
     margin-left: 10px;
  }
</style>
