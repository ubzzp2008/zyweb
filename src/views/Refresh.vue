<template>
  <div>
  </div>
</template>

<script>
// 空白页面，用于当前路由刷新
export default {
  name: "refresh",
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.path);
    });
  }
};
</script>