<template>
      <div class="echartscharts">
            <div class="point1">
                  <p class="pointnum">{{count}}</p>
                  <p class="pointtitle">节点数</p>
            </div>

            <div class="point2">
                  <p class="pointnum">{{last_height}}</p>
                  <p class="pointtitle">区块高度</p>
            </div>
            <div class="point3">
                  <p class="pointnum2">{{status|formatstatus}}</p>
                  <p class="pointtitle">状态</p>
            </div>      
            <div class="pointcanvas">
                  <canvas id="echarts" width="1200px" height="800px"></canvas>
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
      count:'',
      last_height:'',
      status:'',
      nodeList:[]
      }
  },
  filters:{
    formatstatus(val){
      let e=Number(val);
      let status='';
      switch(e){
        case -1:
           status="无法访问";
           break;
        case 9:
           status="正常";
           break;
        case 0:
           status="高度不匹配";
           break;
      }
      return status;
    }
  },
  mounted(){
    // this.drawdream();
    // window.addEventListener("load",drawdream,true);
    this.getinfoNodeList();
    
    
  },
  methods:{
    //获取项目节点信息
    getinfoNodeList(){
      let that=this;
      let arrayItem={
        id:this.$route.query.id
      }
       ajax(that,that.extendApi.getinfoNodelist,arrayItem,(res)=>{
              if(res.code == 200) {
                // console.log(res.data);
                that.count=res.data.count;
                that.last_height=res.data.last_height;
                that.status=res.data.status;
                that.nodeList=res.data.rows;
                this.drawdream(that.nodeList);

              }else{
              }
          },'POST');
    },
    drawdream(list){
      let length=list.length;
      // console.log("length:"+length);
      var c=document.getElementById('echarts');
      var context=c.getContext("2d");

      context.scale(1.8,1.8);
      context.translate(0,0);
      
      context.strokeStyle="#0ec73a";
      context.fillStyle='#0ec73a';
      
      context.lineWidth='1';
      context.beginPath();  
      var x=150;
      var y=100; 
      for(let i=0;i<length;i++) {
        x=x+50*Math.random()+20;
        y=y+100*Math.random()-10;
        context.lineTo(x+50,y);
        context.lineTo(x+50,y+40);
        context.lineTo(x,y+40);
        context.lineTo(x,y);
        context.closePath();
        context.fill();
        context.moveTo(x+25,y+20);
        context.lineTo(x+50*Math.random()+20,y+100*Math.random()-10);
        context.closePath();
        context.stroke();
        context.moveTo(x+20,y+40);
        context.lineTo(x+20,y+50);
        context.lineTo(x+15,y+50);
        context.lineTo(x+15,y+52);
        context.lineTo(x+35,y+52);
        context.lineTo(x+35,y+50);
        context.lineTo(x+30,y+50);
        context.lineTo(x+30,y+40);

        context.fill();
        context.stroke();
        context.font = '16px Verdana';
        context.strokeStyle = "red";
        context.strokeText(list[i].height,(x+25),(y+20));
        context.strokeStyle="#0ec73a"; 
        context.stroke();
        context.beginPath(); 
       
      }
      // if(length==2){
      //   context.beginPath();  
      //   context.lineWidth='2';
      //   var x=150;
      //   var y=100;   
      //   context.moveTo(x+25,y+20);
      //   context.lineTo(x+125,y+70);
      //   context.closePath();
      //   context.stroke();
      // }
      // if(length==4){
      //   context.beginPath();  
      //   context.lineWidth='2';
      //   var x=150;
      //   var y=100;   
      //   context.moveTo(x+25,y+20);
      //   context.lineTo(x+125,y+70);
      //   context.closePath();
      //   context.stroke();
      //   x=150+50*Math.random()+20;
      //   y=100+100*Math.random()-10;
      //    context.moveTo(x+25,y+20);
      //   context.lineTo(x+125,y+70);
      //   context.closePath();
      //   context.stroke();
      //    x=150+(50*Math.random()+20)*2;
      //   y=100+(100*Math.random()-10)*2;
      //    context.moveTo(x+25,y+20);
      //   context.lineTo(x+125,y+70);
      //   context.closePath();
      //   context.stroke();
      //    x=150+(50*Math.random()+20)*3;
      //   y=100+(100*Math.random()-10)*3;
      //    context.moveTo(x+25,y+20);
      //   context.lineTo(x+125,y+70);
      //   context.closePath();
      //   context.stroke();

      // }
     
      }

     
      

    } 
   
}
    
  

</script>
<style scoped>
  .echartscharts{
    margin:20px 20px 20px 260px;
    background: #EDEFF5;
  }
  #echarts{
    width: 1200px;
    height: 750px;
    background: #fff;
    margin: 0 auto;
    margin-left: 100px;
  }
  .point1{
      float: left;
      background: #fff;
      width: 32%;
      height: 100px;
      margin-right: 20px;
      border-radius: 5px;
  }
  .point2{
      float: left;
      background: #fff;
      width: 32%;
      height: 100px;
      margin-right: 20px;
      border-radius: 5px;
  }
  .point3{
      float: left;
      background: #fff;
      width: 32%;
      height: 100px;
      border-radius: 5px;
  }
  .pointcanvas{
      background: #fff;
      float: left;
      width: 98%;
      margin: 20px 20px 5px 0;
      border-radius: 5px;
  }
  .pointtitle{
      font-size: 16px;
      color: #ccc;
      margin-left: 30px;
  }
  .pointnum{
      font-size: 38px;
      margin-top: 20px;
      margin-left: 30px;
  }
  .pointnum2{
      color: #0ec73a;
      font-size: 38px;
      margin-top: 20px;
      margin-left: 30px;
  }
</style>