<template lang="pug">
    .page
      section(id="home")
        Siegel3DCanvas#siegel
        .home-button(id="link-create") Create your own seal
        .home-button(id="link-browse") Browse seals
      section(id="info")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import Siegel3DCanvas from '../components/Siegel3DCanvas.vue';

    @Component({components: {Siegel3DCanvas}})
    export default class Home extends Vue {
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
