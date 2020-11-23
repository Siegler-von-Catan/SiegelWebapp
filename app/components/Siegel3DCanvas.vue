<template lang="pug">
  .siegel3d(ref="canvas")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Renderer from '../graphics/renderer';
    import {Prop} from 'vue-property-decorator';

    @Component
    export default class Siegel3DCanvas extends Vue {

      @Prop({default: []})
      public textures: string[];

      $refs!: {
        canvas: HTMLDivElement
      }

      private renderer: Renderer;

      public mounted() {
        this.renderer = new Renderer(this.$refs.canvas, this.textures);
        window.addEventListener("mousemove", event => {
          this.renderer.update(event.x / window.innerWidth);
        });
      }
    }
</script>

<style lang="sass" scoped>
  .siegel3d
    width: 100%
    height: 100%
</style>
