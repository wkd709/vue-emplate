<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <div id="content">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition> 
    </div>
    <m-footer></m-footer>  
  </div>
</template>


<script>
import mHeader from './components/header'
import mNav from './components/nav'
import mFooter from './components/footer'
// import { mapState, mapGetters, mapActions } from 'vuex' 
export default {
  name: 'app',
  computed: {
    // ...mapState({
    //   loading: state => state.loading
    // })
  },
  components: {
    props: ['flags'],
    mNav,
    mHeader,
    mFooter
  }
}
</script>

<style lang="scss">
@import './assets/scss/main.scss';
</style>

