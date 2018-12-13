<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <h2 class="vue-title1">Waterford Store only</h2>
    <p>email :  pizzaparty@gmail.com</p>
    <p>Phone Number :  1800123456</p>
  </div>
</template>

<script>
  export default {
    name: 'ContactUs',
    data () {
      return {
        messagetitle: ' Contact information '
      }
    }
  }
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .vue-title1 {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .hero{
    font-weight: 100;
    font-size: 2.0rem;
  }
</style>
