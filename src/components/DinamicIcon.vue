<template>
  <div class="icons">
    <i :class="['fas', `fa-${iconName}`]" @click="$emit('iconClick', iconName.toString())"></i>
  </div>
</template>

<script>
export default {
  name:'DinamicIcon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  .icons{
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #15b4bc;
  }
</style>
