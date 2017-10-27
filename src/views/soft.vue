<template>
  <div class="hard" id="softscroll">
    <div class="container">
      <div class="addheard">
        <router-link class="softaddrouter" to='/user/softadd'>
          <el-button class="soft-add" type="primary" icon="plus">添加项目</el-button>
        </router-link>
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
          <div class="model1" :class="{color1:item.status==-1,color2:item.status==0,color3:item.status==9}">
            <div class="model1-title">
              <h3 :class="{colortit1:item.status==-1,colortit2:item.status==0}">{{item.describe}}</h3>
              <el-switch
                class="model1-switch"
                v-model="item.value2"
                on-color="#20A0FF"
                off-color="#bbb"
                on-text="监控"
                off-text="停用"
                @change="switchchange(item.id,item.value2)">
              </el-switch>
            </div>
            <div>
              <table class="model1-table">
                <tr>
                  <td class="td1">项目编号</td>
                  <td class="td2">{{item.id}}</td>
                </tr>
                <tr>
                  <td class="td1">英文名称</td>
                  <td class="td2">{{item.name}}</td>
                </tr>
                <tr>
                  <td class="td1">所属公司</td>
                  <td class="td2">{{item.company}}</td>
                </tr>
                <tr>
                  <td class="td1">版本信息</td>
                  <td class="td2">{{item.version | versioninfor}}</td>
                </tr>
                <tr>
                  <td class="td1">创建时间</td>
                  <td class="td2">{{item.created_at}}</td>
                </tr>
                <tr>
                  <td class="td1">更新时间</td>
                  <td class="td2">{{item.updated_at}}</td>
                </tr>
              </table>      
            </div>
            <div class="model-btn">
              <input type="button" value="节点监控" class="model-btn1"  @click="dialogVisible=true;pointlok(item.id)">
              <input type="button" value="应用监控" class="model-btn2" @click="applok(item.id)">
              <input type="button" value="管理者" class="model-btn1" @click="mangerlok(item.id)">
              <input type="button" value="异常通知" class="model-btn2" @click="funalert(item.id)">
            </div>
          </div>
        </div>
      </div>
      <!-- 节点监控弹框 -->
      <div  class="pointalert">
        <el-dialog
          class="pointxud"
          :visible.sync="dialogVisible"
          size="small">
          <div class="pointalerttitle">节点监控</div>
          <div class="pointalertname">{{dataTable.describe}}</div>
          <div class="pointnav">
            <div class="pointalertpoint">
              <div class="pointtit">{{dataTable.count}}</div>
              <div class="pointcon">节点数</div>
            </div>
            <div class="pointalertpoint">
              <div class="pointtit">{{dataTable.last_height}}</div>
              <div class="pointcon">区块高度</div>
            </div>
            <div class="pointalertpoint":class="{pointalertpoint1:dataTable.status==-1,pointalertpoint3:dataTable.status==0}" style="margin-right:0px;"> 
              <div class="pointtit01">{{dataTable.status | pointfilter}}</div>
              <div class="pointcon">状态</div>
            </div>
          </div>
          <!-- 添加节点 -->
          <div class="softnav">
            <el-form ref="form" :model="form" label-width="100px" class="softadd1form">
            <div id="addpointsoft" ref="addjiedianpoint" class="softaddpoint">
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
              <!-- <el-input v-model="form.node_port" placeholder="请输入端口号" class="softaddinput"></el-input> -->
            </div>
          </el-form>
           <el-button class="addformbtn2" type="primary" @click="submitallformat()">确 定</el-button>
          </div>
          <div class="pointdangers">
            <div class="pointdata" v-for="item in dataTableChild" :class="{pointdata101:item.status==-1,pointdata102:item.status==0}">
              <div class="pointdata1">
                <span class="pointdata1name">{{item.name}}</span>
                <span>{{item.ip}}</span>
                <el-button class="switchreplace" type="primary" @click="switchreplaceson(item.deploy_id)">重启</el-button>     
                <div style="width:426px;">
                  <span class="pointdata1key">{{item.publickey}}</span>
                </div>
              </div>
              <div class="pointdata2" :class="{pointdata21:item.status==-1,pointdata22:item.status==0}">
              <button class="closeBtn" @click="pointdelete(item.deploy_id)" v-show="!item.value3"><i class="el-icon-close"></i></button>
                <p>{{item.height}}</p>
                <el-switch
                v-model="item.value3"
                on-color="#777"
                off-color="#aaa"
                on-text="启用"
                off-text="停用"
                @change="switchchangeson(item.deploy_id)">
                </el-switch>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- 应用监控弹窗 -->
      <div>
        <el-dialog
          class="applookalert"
          :visible.sync="dialogappwatchVisible"
          size="small">
          <div class="appalerttitle">应用监控</div>
          <div class="appalertname" v-model="dataListT">{{dataListT}}</div>
          <div class="appalertcat" v-for="item in dataList">
            <div class="appalertpoint" :class="{appalertpoint1:item.status==0,appalertpoint2:item.status==1}">
              <div class="appalertpointtit" :class="{appalertpointtit1:item.status==0,appalertpointtit2:item.status==1}">{{item.status | applokfilter}}</div>
              <div class="appalertpointcontainer">
                <h5>{{item.name}}</h5>
                <span class="appsp1">端口号</span>
                <span class="appsp2">{{item.port}}</span>
              </div>
            </div>
          </div>
          <div></div>
        </el-dialog>
      </div>
      <!-- 管理者弹窗 -->
      <div>
        <el-dialog
          class="mangeralert"
          :visible.sync="dialogmangerVisible"
          size="small">
          <div class="appalerttitle">管理者</div>
          <div class="appalertname" v-model="tableListT">{{tableListT}}</div>
          <div v-for="item in tableList">
           <div class="appalertpoint">
              <div class="appalertpointtit">{{item.name}}</div>
              <div class="mangeralertcontainer">
                <span class="mangersp1">手机</span>
                <span class="mangersp2">{{item.mobile}}</span><br>
                <span class="mangersp1">邮箱</span>
                <span class="mangersp2">{{item.email}}</span>
              </div>
            </div>
          </div>
          <div></div>
        </el-dialog>
      </div>

      <!-- 异常提醒 -->
      <div>
        <el-dialog :visible.sync="dialogerrorVisible"  class="softalert" size="tiny">     
          <h3>异常通知</h3>   
            <template>
              <el-select v-model="value5" multiple placeholder="请选择" class="softselect">
                <el-option
                  v-for="item in options"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>       
            <br>
            <el-checkbox label="邮件提醒" name="type" ></el-checkbox>
            <el-checkbox label="短信提醒" name="type" disabled></el-checkbox>
            <div slot="footer">
              <el-button class="dialog-footer" type="primary" @click="dialogerrorVisible = false;funcdias()">确 定</el-button>
            </div>
        </el-dialog>
      </div>
      <!-- 添加关联服务器弹框 -->
      <el-dialog title="添加服务器" :visible.sync="dialogTableVisible"  size="tiny"  class="softadd1alert">
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
    </div>
  </div>
</template>
<script>
  import api from '../config/api-config.js'
  import {ajax,getcookie,base64Sort} from '../assets/js/common.js'
  export default{
    data() {
      return {
        formadd:{
          name: '',      //服务器名称
          ip_network: '',//外网IP
          ip_inner: '',  //内网IP
          company: '',   //所属公司
          type: '',      //服务器用途
          describe: '',  //中文描述
          port: '',       //端口号
          sign:'',
        },
        form: {
          machine_ids:'',//机器编号，多个以,好隔开
          node_port:'',//节点监听端口          
          nodelist:[],
          id:'',
          // servermachin:[],
        },
        nodeList:[
        // {
        //   index:0,
        //   id:'',
        //   label:'节点1'
        // }
        ],
        indexItem:0,
        portIndex:1,
        pointlist: [],
        type:{
          type:1,
        },
        dialogTableVisible: false,


        sumTotol:0,
        pagesize:{
          page:1,
          size:10
        },
        value2: [],
        value3: [],
        value4: [],
        value5: [],
        dialogVisible: false,
        dialogappwatchVisible: false,
        dialogmangerVisible: false,
        dialogerrorVisible: false,
        tableData:[],
        dataList:[],
        dataListT:[],
        tableList:[],
        tableListT:[],
        dataTable:[],
        dataTableChild:[],
        applokT:{
          project_id:'',
        },
        mangerlokT:{
          id:'',
        },
        switchT:{
          id:'',
        },
        switchsonT:{
          deploy_id:'',
        },
        switchreplaceT:{
          deploy_id:'',
        },
        pointlokT:{
          id:'',
        },
        deletepointT:{
          deploy_id:'',
        },
        paramemail:{
          project_id:0,
          admin_ids:'',
          sendtype:1,
        },
        options: [],
        mangername:{
          id:'',
        },
      }
    },
    created(){
        // this.form.nodelist=this.nodeList;
        this.form.servermachin=this.servermachin;
         this.softlist();
         this.pointList();
          this.interTime=setInterval(()=>{
          this.pointlok(this.pointlokT.id);
          this.pointList();
          // this.accountInfo();
        }, 2000);
      },
    
    // 销毁实时加载的数据
    destroyed:function(){
      clearInterval(this.interTime);
    },
    filters:{
      versioninfor(e){
        // console.log(e)
        let labelname="";
        switch(e)
        {
          case '1':
          labelname="内测版";
          break;
          case '2':
          labelname="公测版";
          break;
          case '3':
          labelname="正式版";
          break;
        }
        return labelname;
      },
      applokfilter(e){
        let labelname="";
        switch(e)
        {
          case '0':
          labelname="异常";
          break;
          case '1':
          labelname="正常";
          break;
        }
        return labelname;
      },
      pointfilter(e){
        let labelname="";
        switch(e)
        {
          case '-1':
          labelname="错误";
          break;
          case '0':
          labelname="警告";
          break;
          case '9':
          labelname="正常";
          break;
        }
        return labelname;
      }
    },
    mounted(){
        this.$nextTick(()=>{
        var height=window.screen.availHeight-200+"px";
        var ele=document.getElementById('softscroll');
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
        // 删除服务器
        // deleteservermachin(index){
        //   // console.log(index)

        //  // this.nodeList[index]
        //   this.servermachin.pop(this.servermachin[index]);
        //   this.form.servermachin=this.servermachin;
        //   this.portIndex--;
        // },
        // 添加服务器弹框
        showForm(value){
          if(value==99){
            this.dialogTableVisible=true;
          }
        },
        // 添加服务器信息
        addotherselect(){
          let that = this;
            // console.log(that.form);
          // formadd:{
          //   name: '',      //服务器名称
          //   ip_network: '',//外网IP
          //   ip_inner: '',  //内网IP
          //   company: '',   //所属公司
          //   type: '',      //服务器用途
          //   describe: '',  //中文描述
          //   port: '',       //端口号
          // },
          let array = {
            name:that.formadd.name,
            ip_network:that.formadd.ip_network,
            ip_inner:that.formadd.ip_inner,
            company:that.formadd.company,
            type:that.formadd.type,
            describe:that.formadd.describe,
            port:that.formadd.port,
            // sign:that.form.sign,
            submit_at:(new Date()).valueOf().toString().substr(0,10)  
          }
          that.formadd.sign = base64Sort(array);
          // console.log(22222222);
          console.log(that.formadd.sign);
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
        // 提交整个表单
        submitallformat(){
          // console.log("hahahahhahahahaha"+id)
          let that =this;
          this.form.id = this.pointlokT.id;
          
          this.form.machine_ids = '';
          if(this.form.nodelist.length>0){
            for(let i=0;i<this.form.nodelist.length;i++){
              if(i==this.form.nodelist.length-1){
                this.form.machine_ids=this.form.machine_ids+this.form.nodelist[i].id;
              }else{
                this.form.machine_ids=this.form.machine_ids+this.form.nodelist[i].id+',';
              }
              
            }
          }
          ajax(that,that.extendApi.addnode,that.form,(res)=>{
              if(res.code == 200){
                that.pointlok(this.pointlokT.id);
                  // console.log(1);
                  that.$notify({
                    type: 'success',
                    title: '提示',
                    message: '操作成功',
                    duration: 2000
                });
                  
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
    // 项目监控列表
      softlist(){
        let that = this;
        ajax(that,that.extendApi.softlist,that.pagesize,function(res){
          if(res.code == 200){
            that.tableData = res.data.rows;
            for(let i in that.tableData){
              // console.log(that.tableData[i].enable);
              if(that.tableData[i].enable=="1"){
                that.tableData[i].value2=true;
              }
              else{
                that.tableData[i].value2=false;
              }
              
            }
            // console.log(that.tableData);
          }else{
          }
        },'POST');
      },
      // 节点监控
      pointlok(id){
        
        this.pointlokT.id = id;
        ajax(this,this.extendApi.getinfoNodelist,this.pointlokT,(perem)=>{
          if (perem.code == 200) {
            this.dataTable = perem.data;
            this.dataTableChild = perem.data.rows;
            // console.log(this.dataTable);
            for(let i in this.dataTableChild){
              // console.log(this.dataTableChild[i].enable);
              if(this.dataTableChild[i].enable=="1"){
                this.dataTableChild[i].value3=true;
                // console.log(this.dataTableChild[i].value3);
              }
              else{
                this.dataTableChild[i].value3=false;
                // console.log(this.dataTableChild[i].value3);
              }
              
            }
          }else{
            // console.log(987654321);
          }
        },'POST');
      },
    // 应用监控
      applok(id){
        this.dialogappwatchVisible = true;
        this.applokT.project_id = id;
        ajax(this,this.extendApi.appmonitoring,this.applokT,(res)=>{
          if (res.code == 200) {
            this.dataList = res.data[0].rows;
            this.dataListT = res.data[0].describe;
            // console.log(this.dataList)
          }else{
            // console.log(987654)
          }
        },'POST');
      },
    // 管理者
      mangerlok(id){
        this.dialogmangerVisible = true;
        this.mangerlokT.id = id;
        let that = this;
        ajax(that,that.extendApi.mangeradmins,that.mangerlokT,(res) => {
          if (res.code == 200) {
            that.tableListT = res.data.describe;
            that.tableList = res.data.rows;
          }else{
            alert("是崩了");
          }
        },'POST');
      },
    // 异常通知
      funcdias(){
        if(this.value5.length>0){
          for(let i=0 ;i<this.value5.length;i++){
            if(i==this.value5.length-1){
              this.paramemail.admin_ids=this.paramemail.admin_ids+this.value5[i];
            }else{
              this.paramemail.admin_ids=this.paramemail.admin_ids+this.value5[i]+',';
            }
          }
        }
        ajax(this,this.extendApi.emailtoadmin,this.paramemail,(res)=>{
          if(res.code==200){
            this.$notify({
              type: 'success',
              title: '提示',
              message: '发送成功',
              duration: 2000
          });
            this.value5 = [];
            this.paramemail.admin_ids = '';
            dialogerrorVisible = false;
            this.softlist();
          }else{
            this.value5 = [];
            this.paramemail.admin_ids = '';
            this.$notify({
              type: 'warning',
              title: '提示',
              message: res.message,
              duration: 2000
          });
          }
        },'POST')
      },
      // 管理员下拉
      manager(){
        let that = this;
        ajax(that,that.extendApi.mangeradmins,that.mangername,(res) => {
          if (res.code == 200) {
            // console.log(res.data)
            that.options = res.data.rows;
          }else{
            alert("是崩了");
          }
        },'POST');
      },
      // 监控按钮
      switchchange(id,value){
        // console.log(value);
        // console.log(id);
        this.switchT.id = id;
        // console.log(this.switchT);
        ajax(this,this.extendApi.switchchangeon,this.switchT,(param)=>{
          if (param.code == 200) {
             this.$notify({
                  type: 'success',
                  title: '提示',
                  message: '操作成功！',
                  duration: 2000
                });
            // console.log(6268);
            setTimeout(()=>{
              this.softlist();
            }, 500); 
          }
          else{
            this.$notify({
                  type: 'warning',
                  title: '提示',
                  message: '监控失败！',
                  duration: 2000
                });
            // console.log(8888888);
          }
        },'POST');
      },
      // 节点按钮操作
      switchchangeson(id,value){
        this.switchsonT.deploy_id = id;
        // console.log(this.switchsonT.id);
        ajax(this,this.extendApi.switchchangeson,this.switchsonT,(rem)=>{
          if(rem.code == 200){
            // console.log('hahahahahha');
            setTimeout(()=>{
              this.pointlok(this.pointlokT.id);
            }, 500); 
            
            this.$notify({
                  type: 'success',
                  title: '提示',
                  message: '节点状态操控成功！',
                  duration: 2000
                });
          }else{
            // console.log('xixixixiixix');
            this.$notify({
                  type: 'warning',
                  title: '提示',
                  message: '节点状态操控失败！',
                  duration: 2000
                });
          }
        },'POST');
      },
      //节点重启按钮
      switchreplaceson(id,value){
        this.switchreplaceT.deploy_id = id;
        // console.log(this.extendApi.pointreplace)
        ajax(this,this.extendApi.pointreplace,this.switchreplaceT,(res)=>{
          if(res.code == 200){
            console.log(123321);
             setTimeout(()=>{
              this.pointlok(this.pointlokT.id);
            }, 500); 
              this.$notify({
                  type: 'success',
                  title: '提示',
                  message: '节点重启成功！',
                  duration: 2000
                });
          }else{
            console.log(456654);
            this.$notify({
                  type: 'warning',
                  title: '提示',
                  message: res.message,
                  duration: 2000
                });
          }
        },'POST');
      },
      // 删除按钮pointdelete
      pointdelete(id){
        this.deletepointT.deploy_id = id;
        // console.log("哈哈"+this.deletepointT.id)
        ajax(this,this.extendApi.pointdelete,this.deletepointT,(res)=>{
            if (res.code == 200) {
              setTimeout(()=>{
              this.pointlok(this.pointlokT.id);
             }, 500); 
              this.$notify({
                  type: 'success',
                  title: '提示',
                  message: '删除成功！',
                  duration: 2000
                });
            }else{
            }
        },'POST');
      },
      funalert(id){
        this.dialogerrorVisible = true;
        this.mangername.id=id;
        this.paramemail.project_id=id;
        this.manager();
        // console.log(id);
      },
      // 分页
      handleCurrentChange(currentPage) {
        var _this = this;
        _this.pagesize.page = currentPage;
        _this.softlist();
      },
      format(e){
        return Number(e);
      },
    }
  }
 
</script>
<style scoped>
  #softscroll{
    overflow-y: auto;
  }
  .addheard{

    background: #fff;
    height: 60px;
    border-radius: 10px;
  }
  .soft-add{
    margin: 12px 0 0 20px;
    border-radius: 10px;
  }
  .soft-page{
    float: right;
    margin:15px 20px 0 0;
  }
  .softmodel{
    margin:20px 0 0 -20px;
    background: #090;
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
        width:43%;
    }
  }
  .model1{
    margin:0 0 20px 20px;
    height: 336px;
    background: #fff;
    border-radius: 10px;
    border:1px solid #fff;
  }
  .color1{
    border:1px solid #ff0000;
  }
  .color2{
    border:1px solid #ea991a;
  }
  .colortit1{
    color: #ff0000;
  }
  .colortit2{
    color: #ea991a;
  }
  .model1-title{
    height: 60px;
    border-bottom: 1px solid #e9ebf0;
  }
  .model1-title h3{
    float: left;
    font-size: 18px;
    margin-left: 20px;
    line-height: 60px;
    color: #20A0FF;
  }
  .model1-switch{
    /*line-height: 60px;*/
    float: right;
    margin:20px 20px 0 0;
  }
  .model1-table{
    margin: 20px 0 0 20px;
  }
  .td1{
    font-size: 14px;
    line-height: 20px;
    color: #888;
    padding-right: 20px;
  }
  .td2{
    font-size: 14px;
    color: #333;
  }
  .model-btn{
    margin:20px 20px 0 20px;
  }
  .model-btn1{
    height: 40px;
    background: #fff;
    border: 1px solid #20A0FF;
    border-radius: 10px;
    color: #20A0FF;
    width: 47%;
    margin-bottom: 10px;
    outline:none;
  }
  .model-btn2{
    float: right;
    height: 40px;
    background: #fff;
    border: 1px solid #20A0FF;
    border-radius: 10px;
    color: #20A0FF;
    width: 47%;
    outline:none;
  }
  .model-btn1:hover{
    background: #20A0FF;
    color: #fff;
    cursor: pointer;
  }
  .model-btn2:hover{
    background: #20A0FF;
    color: #fff;
    cursor: pointer;
  }
  /*节点监控弹框*/
  .pointxud{
    width: 1600px !important;
    position: absolute;
    left: 50%;
    margin-left: -800px;
    overflow: hidden;
  }
  .pointdangers{
    overflow-y: auto;
    height: 250px;
  }
  .pointdata{
    margin-top: 20px;
    margin-right: 10px;
    border: 1px solid #20a0ff;
    border-radius: 10px;
    height: 80px;
  }
  .pointdata101{
    border-color: red;
  }
  .pointdata102{
    border-color: #ea991a;
  }
  .pointdata1{
    float: left;
    background: #fff;
    height: 80px;
    text-align: left;
    line-height: 40px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .pointdata1name{
    font-size: 16px;
    font-weight: bold;
    margin:0 20px 0 20px;
  }
  .pointdata1key{
    color:#888;
    margin-left: 20px;
  }
  .switchreplace{
    float: left;
    margin-top: 5px;
    height: 30px;
    margin-left: 20px;
    /*right: 50px*/;
  }
  .pointdata2{
    float: right;
    background: #20a0ff;
    height: 80px;
    width: 100px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px; 
  }
  .pointdata21{
    background: red;
  }
  .pointdata22{
    background: #ea991a;
  }
  .pointdata2 p{
    font-size: 16px;
    color: #fff;
    line-height: 40px;
  }
  .pointalert{
    text-align: center;
  }
  .pointalerttitle{
    font-size: 18px;
    font-weight: bold;
  }
  .pointalertname{
    font-size: 18px;
    color: #20a0ff;
    line-height: 70px;
    font-weight: bold;
  }
  .pointnav{
    margin-left: -20px;
    overflow:hidden;
  }
  .pointalertpoint{
    float: left;
    border-radius: 10px;
    color: #fff;
    height: 60px;
    width: 235px;
    margin-left: 20px;
    background: #20a0ff;
    margin-right: 2px;

  }
  .pointalertpoint1{
    background: red;
  }
  .pointalertpoint3{
    background: #ea991a;
  }
  .pointtit{
    font-size: 26px;
    margin-top: 5px;
  }
  .pointtit01{
    font-size: 26px;
    margin-top: 2px;
  }
  .closeBtn{
    background: red;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    float: right;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    margin: -10px;
  }
  /*应用监控弹窗*/
  .applookalert{
    width: 1800px;
    left: 50%;
    position: absolute;
    margin-left: -900px;
  }
  .appalerttitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  .appalertname{
    font-size: 18px;
    color: #20a0ff;
    line-height: 70px;
    font-weight: bold;
    text-align: center;
  }
  .appalertcat{
    /*margin-left: -10px;*/
  }
  .appalertpoint{
    margin-left: 2%;
    margin-bottom: 20px;
    width: 47%;
    float: left;
    border: 1px solid #20a0ff;
    border-radius: 10px;
  }
  .appalertpoint1{
    border:1px solid red;
  }
  .appalertpointtit{
    height: 80px;
    width: 100px;
    float: left;
    background: #20a0ff;
    color: #fff;
    font-size: 18px;
    text-align: center;
    line-height: 80px;
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
  }
  .appalertpointtit1{
    background: red;
  }
  .appalertpointcontainer{
    margin-left: 20px;
    margin-top: 20px;
    float: left;
  }
  .appalertpointcontainer h5{
    font-size: 16px;
  }
  .appsp1{
    font-size: 14px;
    color: #888;
    margin-right: 15px;
  }
  /*管理者弹窗*/
  .mangeralert{
    text-align: center;
    width: 1800px;
    position: absolute;
    margin-left: -900px;
    left: 50%;
  }
  .mangeralertcontainer{
    margin-left: 20px;
    margin-top: 10px;
    float: left;
    text-align: left;
    line-height: 30px;
  }
  .mangersp1{
    font-size: 14px;
    color: #888;
    margin-right: 15px;
  }
  .mangersp2{
    font-size: 14px;
    margin-right: 15px;
    color: #333;
  }
  /*异常提醒*/
  .softselect{
    width: 100%;
    margin-bottom: 20px;
  }
  .softalert h3{
    text-align: center;
    margin-bottom: 40px;
  }
  .dialog-footer{
    width: 100%;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  /*服务器弹框*/
  .softadd1alert{
  /*  width: 1100px;*/
    /*overflow: hidden !important;
    margin: 0 0 0 400px !important;*/
    width: 1700px;
    position: absolute;
    left: 50%;
    margin-left: -850px;
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
  .softnav{
    margin-top: 20px;
    overflow: hidden;
    margin-left: -50px;
  }
  .deletejiedian{
    border-radius: 50%;
    float: left;
    margin: 8px 0 0 10px;
  }
  .softaddinput{
    width: 120px;
    position: absolute;
    top: 224px;
   /* margin-right: 80px !important;*/
    right: 120px;
  }
  /*.addfwq{
    margin-left: 100px;
  }*/
  .addfwq1{
   /* margin-left: -374px;*/
   float: left;
   margin-right: 20px;
   margin-left: 50px;
   border-radius: 10px;
  }
  .addformbtn2{
   float: left;
   border-radius: 10px; 
   width: 105px;
  }
</style>