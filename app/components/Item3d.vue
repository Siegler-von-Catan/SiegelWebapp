<!--
  - ShapeFromShading - Creating heightmaps out of 2D seal images.
  - Copyright (C) 2021
  - Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template lang="pug">
  .siegel3d(ref="canvas" @click="$emit('click')")
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import Renderer from '../graphics/renderer';
    import {Prop, Watch} from 'vue-property-decorator';
    import {Texture, TextureLoader} from "three";
    import "../style/siegel3dcanvas.sass";

    @Component
    export default class Item3d extends Vue {

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
        if (this.heightmap !== "") {
          this.onLoaded();
        }
      }

      @Watch("heightmap")
      public onLoaded() {
        const tex = new TextureLoader().load(this.heightmap, () => {
          this.renderer.plainRender();
        }, () => {}, (e) => {
          console.log(e)
        });
        this.renderer = new Renderer(this.$refs.canvas, tex);
      }
    }
</script>
