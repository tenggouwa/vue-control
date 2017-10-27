<template>
  <div class="hardware">
    <div class="hardtitle">
      <div class="left search">
        <el-button type="primary" class="left" @click="goLink" icon="plus">添加服务器</el-button>
        <input type="text" name="ip" v-model="listparam.search" class="inputip left" placeholder="服务器名称/名称">
        <el-button type="primary" class="left marleft" @click="seach">搜索</el-button>
        <el-button type="primary" class="left" @click="reset">重置</el-button>
      </div>
      <div class="right pargin">
        <el-pagination
          layout="prev, pager, next"
          :total="countTotal"
          @current-change="changepage"
          >
        </el-pagination>
      </div>
    </div>
    <section class="pointerList" id="pointlist">
      <div class="contentlist" v-for="(item,index) in infolist">
        <div class="listTitle" @click="toggleinfo(index,item.id)">
          <!-- <div class="titleLeft">
            <span class="pointname">{{item.describe}}</span>
            <span class="companyname">{{item.name}}</span>
            <i class="el-icon-arrow-down pointname"></i>
          </div> -->
          <ul class="sameinfo">
            <li class="leftinfo">
              <span class="pointname">{{item.describe}}</span>
              <i v-if="!showinfo[index]" class="el-icon-arrow-down pointname"></i>
              <i v-if="showinfo[index]" class="el-icon-arrow-up pointname"></i>
              <p class="companyname">
                <span>{{item.name}}</span>
              </p>
            </li>
            <li>
              <p>
                <label>机器编号</label>
                <span>{{item.id}}</span>
              </p>
              <p>
                <label>所属公司</label>
                <span class="companyes">{{item.company}}</span>
              </p>
              <p>
                <label>创建时间</label>
                <span>{{item.created_at}}</span>
              </p>
            </li>
            <li>
              <p>
                <label>外网IP</label>
                <span>{{item.ip_network}}</span>
              </p>
              <p>
                <label>内网IP</label>
                <span>{{item.ip_inner}}</span>
              </p>
              <p>
                <label>更新时间</label>
                <span>{{item.updated_at}}</span>
              </p>
            </li>
          </ul>
          <!-- <el-button class="titlright elbutton" :class="{'delates':candelate[index]}" @click.stop="delateServer(index,item.id)">删除服务器</el-button> -->
        </div>
        <div class="hiddeninfo" v-show="showinfo[index]" v-loading="addinfo">
          <ul class="sameinfo secondUL">
            <li>
              <el-progress type="circle" class="progress" :percentage="cpuinfo.cpu_usage"></el-progress>
              <div class="info">
                <p class="stitle">CPU信息</p>
                <p class="cpuinfo" v-for="item in cpuinfo.cpu_info">
                  <span>{{item.name}} : {{item.frep}}</span>
                </p>
              </div>
            </li>
            <li>
              <el-progress type="circle" class="progress" :percentage="cpuinfo.mem_usage"></el-progress>
              <div class="info">
                <p class="stitle">内存容量</p>
                <p>{{cpuinfo.mem_total}}MB</p>         
              </div>
            </li>
            <li>
              <el-progress type="circle" class="progress" :percentage="cpuinfo.hd_usage"></el-progress>
              <div class="info">
                <p class="stitle">硬盘容量</p>
                <p>{{cpuinfo.hd_total}}GB</p>
              </div>
            </li>
          </ul>
          <div class="projectlist">
            <span v-for="(item,index) in projectlist">
              {{item.describe}} 
              <i class="el-icon-close" @click="showdelateProject(item.id)"></i>
            </span>
            <el-button class="titlright elbutton" :class="{'delates': projectlist.length == 0}" @click.stop="showdelateServer()">删除服务器</el-button>
          </div>
        </div>
      </div>
      <div style="height:50px"></div>
    </section>

    <el-dialog title="提示" :visible.sync="dialogdelate">
      <p class="delateinfo">您是否确定删除？</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogdelate = false">取 消</el-button>
        <el-button type="primary" @click="delateProject">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="delatemach">
      <p class="delateinfo">您是否确定删除？</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="delatemach = false">取 消</el-button>
        <el-button type="primary" @click="delateServer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'
  export default{
    data(){
      return{
        model:'',
        candelate:[],
        dialogdelate:false,
        delatemach:false,
        showmachindex:0,
        refaule:true,
        addinfo:true,
        showinfo:[],//控制下拉显示的效果
        infolist:[],//信息列表
        projectlist:[],//项目列表
        countTotal:0,//总条数
        listparam:{
          search:'',
          page:1,
          size:10,
        },
        cpuinfo:{
          cpu_info:'',
          cpu_usage:0,
          hd_total:'',
          hd_usage:0,
          mem_total:'',
          mem_usage:0,
          status:'',
        },
        machParam:{
          id:'',
        },
        projectId:{
          id:'',
        },
        delateParam:{
          deploy_id:0,
        },
        inlinetime:0,
      }
    },
    destroyed(){
      clearInterval(this.inlinetime);
    },
    mounted(){
      this.$nextTick(()=>{
        this.showinfo=[true,false,false,false,false];
        var height=window.screen.availHeight-240+"px";
        var ele=document.getElementById('pointlist');
        ele.style.height=height;
        this.getmachinfo();
      });
    },
    methods:{
      //分页
      changepage(val){
        this.listparam.page=val;
        this.getmachinfo();
      },
      //点击下拉时调用
      toggleinfo(index,id){
        this.addinfo = true;
        this.refaule = false;
        this.showmachindex = index;
        clearInterval(this.inlinetime);
        for(let i = 0;i<this.showinfo.length; i++ ){
          if(i == index){
            if(this.showinfo[index]){
              this.$set(this.showinfo,i,false);
            }else{
              this.$set(this.showinfo,i,true);
            }
          }else{
            this.$set(this.showinfo,i,false);
          }
        }
        // this.$set(this.showinfo,index,true);
        this.machParam.id=id;
        this.projectId.id=id;
        for(let index in this.cpuinfo){
          index = '';
        }
        this.getserver();
        this.inlinetime = setInterval(()=>{
          this.getserver();
        },2000);
        this.getproject();
      },
      getserver(){
        ajax(this,this.extendApi.updateserver,this.machParam,(response)=>{
          this.addinfo=false;
          if(response.code == 200){
            this.cpuinfo = response.data;
            this.cpuinfo.cpu_usage = Number(response.data.cpu_usage);
            this.cpuinfo.mem_usage = Number(response.data.mem_usage);
            this.cpuinfo.hd_usage = Number(response.data.hd_usage);
          }else{
            this.$notify({
              title: '提示',
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      getproject(){
        ajax(this,this.extendApi.machprojects,this.projectId,(response)=>{
          this.projectlist = [];
          if(response.code == 200){
            this.projectlist = response.data;
          }
        });
      },
      //查询
      seach(){
        if(this.listparam.search){
          this.getmachinfo();
        }else{
          this.$notify({
            title: '提示',
            message: '请输入查询服务器名称',
            type: 'error'
          });
        }
      },
      //重置
      reset(){
        this.listparam.search = '';
      },
      //获取列表信息
      getmachinfo(){
        ajax(this,this.extendApi.machinfo,this.listparam,(response) =>{
          if(response.code == 200){
            let data = response.data;
            this.showinfo=[];
            this.candelate=[];
            this.infolist=data.rows;
            this.countTotal=Number(data.total);
            for(let i = 0;i < data.rows.length;i++){
              if(i == 0 && this.refaule){
                this.showinfo.push(true);
                this.machParam.id=data.rows[i].id;
                this.projectId.id=data.rows[i].id;
                this.getserver();
                clearInterval(this.inlinetime);
                this.inlinetime = setInterval(()=>{
                  this.getserver();
                },2000);
                this.getproject();
              }else{
                this.showinfo.push(false);
              }
              if(data.rows[i].hasprojects==1){
                this.candelate.push(false);
              }else{
                this.candelate.push(true);
              }
            }
          }
        })
      },
      goLink(){
        this.$router.push({
          path:"hardadd"
        });
      },
      showdelateProject(id){
        this.dialogdelate = true;
        this.delateParam.deploy_id = id;
      },
      //删除项目
      delateProject(nodeid){
        ajax(this,this.extendApi.deletenode,this.delateParam,(response)=>{
          this.dialogdelate=false;
          if(response.code == 200){
            this.getproject();
            // this.getmachinfo();
            this.$notify({
              title: '提示',
              message: response.message,
              type: 'success'
            });
          }else{
            this.$notify({
              title: '提示',
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      showdelateServer(){
        if(this.candelate[this.showmachindex]){
          this.delatemach = true;
        }
      },
      //删除服务器
      delateServer(){
        let id=this.machParam.id;
        if(this.candelate[this.showmachindex]){
          ajax(this,this.extendApi.machdelete,{'id':id},(response)=>{
            this.delatemach = false;
            if(response.code == 200){
              this.getmachinfo();
              this.$notify({
                title: '提示',
                message: response.message,
                type: 'success'
              });
            }else{
              this.$notify({
                title: '提示',
                message: response.message,
                type: 'error'
              });
            }
          });
        }else{
          this.$notify({
            title: '提示',
            message: '此节点下有项目，不能删除',
            type: 'error'
          });
        }
      },
    }
  }
</script>
<style scoped>
  html,body{
    height: 100%;
    overflow: hidden;
  }
  .hardware{
    .hardtitle{
      height: 60px;
      background: #fff;
      border-radius: 10px;
      padding-left: 20px;
      padding-right: 20px;
      .left{
        float: left;
        border-radius: 10px;
        margin-top: 3px;
      }
      .marleft{
        margin-left: 10px;
      }
      .right{
        float: right;
      }
      .pargin{
        margin-top: 15px;
      }
      .inputip{
        height: 40px;
        line-height: 40px;
        border:1px solid #00aaee;
        border-radius: 10px;
        box-sizing: border-box;
        margin-left: 40px;
        width: 240px;
        padding-left: 20px;
        outline: none;
        margin-top: 0;
      }
      .search{
        margin-top: 10px;
      } 
    }
    .pointerList{
      overflow-y: auto;
      .contentlist{
        height: auto;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        margin-top: 20px;
        .listTitle{
          width: 100%;
          cursor: pointer;
          /*height: 60px;*/
          height: 80px;
          border-radius: 10px 10px 0 0;
          border-bottom: 1px solid #edeff5;
          clear: both;
          /*.titleLeft{
            float: left;
            margin-left: 20px;
            height: 60px;
            line-height: 60px;
            span{
              display: inline-block;
              font-size: 18px;
              margin-right: 20px;
            }
            .pointname{
              color: #00aaee;
            }
            .companyname{
              color: #888;
            }
          }*/
          /*.titlright{
            float: right;
            margin-right: 20px;
          }*/
        }
        .hiddeninfo{
          height: auto;
          overflow: hidden;
        }
        .sameinfo{
          /*width: 100%;*/
          padding-left: 20px;
          height: 78px;
          li{
            float: left;
            width: 33%;
            font-size: 14px;
            margin-top: 10px;
            list-style-type: none;
            p{
              label{
                color: #888;
                padding-right: 20px;
              }
              span{
                color: #333;
              };
              .companyes{
                display: inline-block;
                overflow:hidden;
              }
            }
            .progress{  
              float: left;
            }
            .info{
              font-size: 14px;
              float: left;
              margin:10px 0 0 20px;
              .stitle{
                color: #888;
                margin-bottom: 8px;
              }
              .cpuinfo{
                /*width: 250px;*/
                word-wrap:break-word;
              }
            }
          }
          .leftinfo{
            /*float: left;*/
            /*margin-left: 20px;*/
            height: 30px;
            line-height: 30px;
            span{
              display: inline-block;
              font-size: 18px;
              margin-right: 20px;
            }
            .pointname{
              color: #00aaee;
            }
            .companyname{
              color: #888;
            }
          }
        }
        .secondUL{
          /*height: 160px;*/
          height: auto;
          overflow: hidden;
        }
        .projectlist{
          height: auto;
          overflow: hidden;
          padding: 0px 0 20px;
          span{
            padding: 10px 20px;
            margin-top:20px;
            font-size: 14px;
            color: #00aaee;
            display: inline-block;
            border-radius: 10px;
            background: rgba(218, 244, 255, 1);
            margin-left: 20px;
            i{
              margin-left: 10px;
              cursor: pointer;
            }
          }
          .elbutton{
            height: 39px;
            background-color: rgba(187,187,187,1);
            border-radius: 10px;
            color: #fff;
            margin-top: 10px;
            margin-left: 20px;
            z-inde:10;
          }
          .delates{
            background:  rgba(236, 97, 97, 1);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1600px) {
    .cpuinfo{
      width: 250px;
      word-wrap:break-word;
    }
  }
   @media screen and (max-width: 1366px) {
    .cpuinfo{
      width: 180px;
      word-wrap:break-word;
    }
}
</style>
<style>
  .el-progress-circle{
    width: 80px!important;
    height: 80px!important;
  }
  .el-button{
    border:0!important;
  }
  .hardware{
    .el-dialog--small{
      width: 500px!important;
      .el-dialog__header{
        text-align: center;
      }
      .el-dialog__footer{
        text-align: center!important;
      }
      .delateinfo{
        font-size: 18px;
        text-align: center;
      }
    }
  }
</style>