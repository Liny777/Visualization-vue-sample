<template>
    <div class="container">
      statistic
    </div>
  </template>
  <script>
  import HomeTopBar from './components/hometopbar'
export default {
  name: 'Home',
  components: { HomeTopBar },
  data() {
    return {
      // activeIndex: '1',
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
