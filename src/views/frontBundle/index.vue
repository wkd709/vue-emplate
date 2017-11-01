<template>
  <div>
    <h1>index</h1>
  </div>
</template>
<script>
  import * as _ from '../../util/tool'
  import api from '../../fetch/api'
  export default {
    data() {
      return {
      };
    },
    watch: {
      '$route': function () {
        this.getData();
      }
    },
    mounted() {
      this.$nextTick(function() {
        window.scrollTo(0,0);
        this.getData();
      })
    },
    methods: {
      getData() {//获取整个首页数据
        api.index()
          .then(res => {
            if (res.errMsg && res.errMsg == 'SUCCESS') {
            } else {
              _.message('error',res.errMsg);
              return false;
            }
          })
          .catch(err => {console.log(err, '0')});
      },
    },
  }
</script>
<style lang="scss" scoped>
@import '../../assets/scss/pages/index.scss'
</style>