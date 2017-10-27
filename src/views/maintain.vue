<template>
  <div class="main-box">
    <head-part></head-part>
    <left-part id="scroll"></left-part>
    <div class="marginleft">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
import headPart from "../components/header.vue"
import leftPart from "../components/left.vue"
export default{
  data(){
    return{
      
    }
  },
  components:{
    headPart,
    leftPart
  },
  mounted(){
        this.$nextTick(()=>{
        var height=document.body.scrollHeight+"px";
        var ele=document.getElementById('scroll');
        console.log(height);
        ele.style.height=height+'px';
        })
      },
}
</script>
<style>
  .marginleft{
    margin: 20px 20px 0 220px;
  }

</style>