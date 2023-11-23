<template>
  <div class="contenedor">
    <div class="iconCont">
      <div class="icon" v-for="iconName in iconList" :key="iconName">
        <DinamicIcon :iconName="iconName"  @updateIcon="handleIconClick" />
      </div>
    </div>
  </div>
</template>

<script>
import DinamicIcon from './DinamicIcon.vue';
import util from '@/utils/utils';

export default {
  name:'IconList',
  emits: ['update-icon'],
  components: {
    DinamicIcon,
  },
  data() {
    return {
      iconList: util.iconList,
    };
  },
  methods: {
    handleIconClick(iconName) {
      this.$emit('update-icon', iconName)
    },
  },
};
</script>
<style scoped lang="scss">
.contenedor{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #daecec;
  .iconCont{
    width: 100%;
    padding: 10px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .icon{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px;
      border: 1px solid #0d7277;
      border-radius: 50%;
      background-color: #99DCDD;
      cursor: pointer;
    }
    .icon:hover{
      border: 1px solid #99DCDD;
      background-color: #0d7277;
    }
  }
}
</style>
