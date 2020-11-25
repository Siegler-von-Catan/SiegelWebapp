<template lang="pug">
  extends page

  block content
    section(id="home")
      Siegel3DCanvas#siegel(:textures="textures")
      .home-button(id="link-create") Create your own seal
      .home-button(id="link-browse") Browse seals
    section(id="info")
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Siegel3DCanvas from '../components/Siegel3DCanvas.vue';
  import bumpMap from "../assets/bumpMap.png"
  import bumpMap2 from "../assets/out_copy.png"
  import bumpMap3 from "../assets/out2_blur.png"
  import Page from './Page';

  @Component({components: {Siegel3DCanvas}})
  export default class Home extends Page {

    public textures = [bumpMap, bumpMap2, bumpMap3];
  }
</script>

<style lang="sass" scoped>
  #home
    display: flex
    flex-direction: column
    align-items: center
    height: 100vh

    #siegel
      width: 80%
      height: 40vh
      margin-top: 14vh
</style>
