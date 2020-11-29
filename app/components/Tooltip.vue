<template lang="pug">
  #tooltip(:style="style")
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Vue from "vue";

  @Component
  export default class Tooltip extends Vue {

    public style = {
      top: "0px",
      left: "0px"
    }

    public mounted() {
      window.addEventListener("mousemove", event => {
        this.style.top = event.y + "px";
        this.style.left = event.x + "px";
      });
    }
  }
</script>

<style lang="sass" scoped>
  @import ../pages/variables

  #tooltip
    display: none
    position: absolute
    width: 20px
    height: 20px
    background: blue

</style>
