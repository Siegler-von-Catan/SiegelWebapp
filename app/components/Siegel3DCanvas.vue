<template lang="pug">
  .siegel3d(ref="canvas")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Renderer from '../graphics/renderer';

    @Component
    export default class Siegel3DCanvas extends Vue {

      $refs!: {
        canvas: HTMLDivElement
      }

      private renderer: Renderer;

      public mounted() {
        this.renderer = new Renderer(this.$refs.canvas);
        requestAnimationFrame(time => this._loop(time));
      }

      private _loop(time: number) {
        this.renderer.update(time);
        requestAnimationFrame(time => this._loop(time));
      }
    }
</script>

<style lang="sass" scoped>
  .siegel3d
    margin: 25vh 25%
    width: 50%
    height: 50vh
</style>
