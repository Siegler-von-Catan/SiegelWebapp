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
  extends page

  block content
    #detail
      #loading(v-if="!loaded")
        #error(v-if="error")
          span Error loading siegel
        span(v-else) Loading
      #siegel(v-if="loaded")
        Siegel3DCanvas(v-if="texture" :heightmap="texture" :tooltip="siegel.name" offset="0" sticky-tooltip="true")
        #export
          a(:href="downloadObjUrl()" :download="`${siegel.name}.stl`") 3D Druck
          //a(:href="downloadLaserUrl()" download="laser-cut-siegel.png") Laser-cut
          a(:href="downloadOriginalUrl()" download) Original Bild
          //a(@click="a('Coming soon')") 3D Druck
          a(@click="a('Coming soon')") Laser-cut
          //a(@click="a('Coming soon')") Original Bild
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {getQueryParams} from "../util/util";
import {getDataFor, getFileUrl, Siegel} from "../util/api";
import Siegel3DCanvas from "../components/Siegel3DCanvas.vue";

@Component({components: {Siegel3DCanvas}})
export default class SiegelView extends Vue {

  private siegel: Siegel;
  private texture: string;

  private loaded = false;
  private error = false;

  public async mounted() {
    const s = getQueryParams()["s"];
    if (!s || isNaN(s as any)) {
      console.error("Invalid query")
      this.error = true;
      return;
    }

    const data = await getDataFor(s);
    if (!data) {
      console.error("Invalid query: " + s);
      this.error = true;
      return;
    }

    this.siegel = data;
    this.texture = getFileUrl("heightmap", this.siegel);
    this.loaded = true;
  }

  private downloadObjUrl() {
    return getFileUrl("stl", this.siegel);
  }

  private downloadLaserUrl() {
    return this.texture;
  }

  private downloadOriginalUrl() {
    return getFileUrl("original", this.siegel);
  }

  private a(str: string) { alert(str); }
}
</script>
