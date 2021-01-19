<template lang="pug">
  .siegel3d(ref="canvas" @click="$emit('click')")
    .tooltip(:class="stickyTooltip ? 'sticky' : ''") {{ tooltip }}
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Renderer from '../graphics/renderer';
    import {Prop, Watch} from 'vue-property-decorator';
    import {Texture, TextureLoader} from "three";

    @Component
    export default class Siegel3DCanvas extends Vue {

      @Prop({default: ""})
      public heightmap: string;

      @Prop({default: false})
      public stickyTooltip: boolean;

      @Prop({default: ""})
      public tooltip: string;

      $refs!: {
        canvas: HTMLDivElement
      }

      private renderer: Renderer;

      public mounted() {
        const tex = new TextureLoader().load(this.heightmap);
        this.renderer = new Renderer(this.$refs.canvas, tex);
        window.addEventListener("mousemove", event => {
          this.renderer.update(event.x / window.innerWidth);
        });
      }
    }
</script>
