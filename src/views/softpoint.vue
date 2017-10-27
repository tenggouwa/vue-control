<template>
	<div class="softpoint">

    <!-- <echartsCanvas></echartsCanvas> -->
    <div id="scrollHei">
      <div class="softpoint1">
        <p>
          <span class="sp1">节点高度：#{{nodeheight}}</span>
          <span class="sp1">节点数: {{pointcount}}</span>
          <span class="sp1">状态: {{pointstatus|changeT}}</span>
        </p>
      </div>
      <div class="softpoint2" v-model="dataList" v-for="item in dataList">
        <div class="softpoint2-tit">{{item.name}}<span class="softpointaddlist">&nbsp;&nbsp;({{item.publickey}})</span><hr class="hr-1"></div>
        <div class="softpoint2-con">
          <span class="point-sp1">节点高度:</span>
          <span class="point-sp2">{{item.height}}</span>
          <span class="point-sp1">机器编号:</span>
          <span class="point-sp2">{{item.id}}</span>
          <span class="point-sp1">机器名称:</span>
          <span class="point-sp2">{{item.name}}</span>
          <span class="point-sp1">机器IP:</span>
          <span class="point-sp2">{{item.ip}}</span>
          <span class="point-sp1">节点状态:</span>
          <span class="point-sp2">{{item.status|changeJ}}</span>
        </div>
  <!--   <div class="softpoint1">
      <p>
        <span class="sp1">节点高度：#{{nodeheight}}</span>
        <span class="sp1">节点数: {{pointcount}}</span>
        <span class="sp1">状态: {{pointstatus|changeT}}</span>
      </p>
    </div>
    <div class="softpoint2" v-model="dataList" v-for="item in dataList">
      <div class="softpoint2-tit">{{item.name}}<hr class="hr-1"></div>
      <div class="softpoint2-con">
        <span class="point-sp1">节点高度:</span>
        <span class="point-sp2">{{item.height}}</span>
        <span class="point-sp1">机器编号:</span>
        <span class="point-sp2">{{item.id}}</span>
        <span class="point-sp1">机器名称:</span>
        <span class="point-sp2">{{item.name}}</span>
        <span class="point-sp1">机器IP:</span>
        <span class="point-sp2">{{item.ip}}</span>
        <span class="point-sp1">节点公钥:</span>
        <span class="point-sp2">{{item.publickey}}</span>
        <span class="point-sp1">节点状态:</span>
        <span class="point-sp2">{{item.status|changeJ}}</span>-->

      </div> 
    </div>
    
    

 	</div>

</template>
<script>

import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'
import echartsCanvas from './echartsCanvas.vue'
export default {
  // name: 'hello',
  data () {
    return {
      input:'',
      mangername:{
        id:'',
      },
      nodeheight:0,
      pointcount:0,
      pointstatus:'',
      dataList:[],
      }
  },
  components:{

    echartsCanvas,

  },
  created(){
    this.pointjiankong();
  },
  mounted(){
      this.$nextTick(()=>{
        var height=window.screen.availHeight-180+"px";
        var ele=document.getElementById('scrollHei');
        ele.style.height=height;

      })
    },
  filters:{  
      changeT(e){
        // console.log(e)
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
      },
      changeJ(e){
        let labelname="";
        switch(e)
        {
          case '-1':
          labelname="无法访问";
          break;
          case '0':
          labelname="高度不匹配";
          break;
          case '9':
          labelname="正常";
          break;
        }
        return labelname;
      }
    
  },
  methods:{
    pointjiankong(){
      let id = this.$route.query.id;
      this.mangername.id = id;
      console.log(this.mangername.id);
      ajax(this,this.extendApi.pointjiankong,this.mangername,(res)=>{
          this.dataList = res.data.rows;
          this.nodeheight=res.data.last_height;
          this.pointcount = res.data.count;
          this.pointstatus = res.data.status;
      },'POST');
    }
  }
}
</script>
<style scoped>
#scrollHei{
  overflow-y: auto;
}
.sp1{
  /*margin-left: 30px;*/
  margin-right: 60px;
}
.softpointaddlist{
  font-weight: normal;
}
  .softpoint1{
    margin: 20px 20px 0 20px;
    background: #fff;
    height: 84px;
    line-height: 84px;
    border-radius: 5px;
  }
  .softpoint1 p{
    margin-left: 20px;
    font-size: 24px;
  }
  .softpoint2{
    height: 120px;
    background: #fff;
    margin: 20px 20px 0 20px;
    border-radius: 5px;
  }
  .softpoint2-tit{
    margin: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .softpoint2-con{
    margin:0 20px;
     height: 60px;
    line-height: 60px;
  }
  .point-sp1{
    color: #bfcbd9;
  }
  .point-sp2{
    color: #1f2f3d;
    width: 180px;
    display: inline-block;
  }
  .hr-1{
    border-top: 1px solid #ccc;
  }
  @media screen and (max-width: 1866px) {
    .point-sp2 {
        width: auto;
        margin-right: 80px;
    }
}
@media screen and (max-width: 1575px) {
    .point-sp2 {
        width: auto;
        margin-right: 10px;
    }
}
</style>