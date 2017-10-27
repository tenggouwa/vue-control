<template>
	<div class="manger">
    <div class="manger1">
      <div class="manger-tab">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="用户名"
            width="">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="用户手机号"
            width="">
          </el-table-column>
          <el-table-column
            prop="email"
            label="用户邮箱">
          </el-table-column>     
        </el-table>
      </div>
      <!-- <div class="manger-page">
        <el-pagination
          small
          layout="prev, pager, next"
          :total="50" 
          class="manger-page2">
        </el-pagination>
      </div> -->
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
      mangername:{
        id:'',
      },
      tableData: [],
    }
  },
  created(){
    this.manager();
  },
  methods:{
        manager(){
          let that = this;
          let id = that.$route.query.id;
          that.mangername.id = id;
          console.log(that.extendApi.mangeradmins)
          ajax(that,that.extendApi.mangeradmins,that.mangername,(res) => {
              if (res.code == 200) {
                that.tableData = res.data;
              }else{
                alert("是崩了");
              }
          },'POST');
        }
  },

}
</script>
<style scoped>
  .manger1{
    margin: 20px 20px 0 260px;
    background: #fff;
/*    height: 500px;*/
    border-radius: 5px;
    padding-bottom: 50px;
  }
  .manger-tab{
    margin: 0 20px;
    padding-top: 40px;
  }
  .manger-page{
    background: #090;
    margin-top: 50px;
  }
  .manger-page2{
    position: absolute;
    left: 50%;
  }
</style>