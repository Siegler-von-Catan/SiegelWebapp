<template lang="pug">
  .siegel3d(ref="canvas")
    .tooltip Hello
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Renderer from '../graphics/renderer';
    import {Prop} from 'vue-property-decorator';

    @Component
    export default class Siegel3DCanvas extends Vue {

      @Prop({default: ""})
      public heightmap: string;

      $refs!: {
        canvas: HTMLDivElement
      }

      private renderer: Renderer;

      public mounted() {
        this.renderer = new Renderer(this.$refs.canvas, this.texture);
        window.addEventListener("mousemove", event => {
          this.renderer.update(event.x / window.innerWidth);
        });
      }

      private _createImage(source: string) {
        const image = document.createElement("img");
        image.style.display = "none";
        document.body.appendChild(image);
        image.addEventListener("load", () => {});
        image.src = `data:image/png;base64`
      }
    }
</script>

<style lang="sass" scoped>
  @import ../pages/variables

  .siegel3d
    position: relative
    width: 100%
    height: 100%

    .tooltip
      opacity: 0
      position: absolute
      bottom: 0
      left: 50%
      transform: translate(-50%, .7em)

      font-size: 1.3em
      background: $accent
      color: $base

      padding: .3em .8em
      border-radius: .5em

      transition: opacity .5s ease

      &::after
        position: absolute
        display: block
        content: ""
        width: 0
        height: 0
        left: 50%
        top: 0
        transform: translate(-50%, -.5em)
        border-left: 1em solid transparent
        border-right: 1em solid transparent
        border-bottom: 1em solid $accent

    &:hover .tooltip
      opacity: 1
</style>
