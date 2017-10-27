<template>
	<div class="softyyjk">
    <div v-model="dataList" v-for="itemlist in dataList">
      <div class="softyyjk1" v-for="item in itemlist.portstatus">
        <div class="softyyjk1-tit">{{item.name}}<hr class="hr-1"></div>
        <div class="softyyjk1-con">
          <span class="yyjk-sp1">端口号:</span>
          <span class="yyjk-sp2">{{item.port}}</span>
          <span class="yyjk-sp1">访问状态:</span>
          <span class="yyjk-sp2">{{item.status|changeyongT}}</span>
      
        </div>
      </div>
      </div>
      
 	</div>

</template>
<script>
import api from '../config/api-config.js'
import {ajax} from '../assets/js/common.js'

export default {
  // name: 'hello',
  data () {
    return {
      input:'',
      dataList:[],
      mangername:{
        project_id:'',
      }
    }
  },
  created(){
    this.applook();
  },
  filters:{
      changeyongT(e){
        // console.log(e)
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
      }
    },
  methods:{
    applook(){
      let _this = this;
      let id = _this.$route.query.id;
      _this.mangername.project_id = id;
      ajax(_this,_this.extendApi.appmonitoring,_this.mangername,(res)=>{
        if (res.code == 200) {
          console.log(res.data)
          _this.dataList = res.data;
        }else{
          console.log(987654)
        }
      },'POST');
    }
  },

}
</script>
<style scoped>
  .softyyjk1{
    margin: 20px 20px 0 260px;
    background: #fff;
    height: 84px;
    line-height: 84px;
    border-radius: 5px;
  }
  .softyyjk1{
    height: 120px;
    background: #fff;
    margin: 20px 20px 0 260px;
    border-radius: 5px;
  }
  .softyyjk1-tit{
    margin: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
  }
  .softyyjk1-con{
    margin:0 20px;
     height: 60px;
    line-height: 60px;
  }
  .yyjk-sp1{
    color: #bfcbd9;
    text-align: center;
  }
  .yyjk-sp2{
    color: #1f2f3d;
    width: 27%;
    display: inline-block;
  }
  @media screen and (max-width: 1788px) {
    .yyjk-sp2 {
        width: 300px;
     }
  }
  @media screen and (max-width: 1522px) {
    .yyjk-sp2 {
        width: 100px;
     }
  }
</style>