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
          a(:href="downloadObjUrl()" download="3d-printable-siegel.obj") 3D Druck
          a(:href="downloadLaserUrl()" download="laser-cut-siegel.png") Laser-cut
          a(:href="downloadOriginalUrl()" download="2d-siegel.png") Original Bild
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
    return getFileUrl("obj", this.siegel);
  }

  private downloadLaserUrl() {
    return this.texture;
  }

  private downloadOriginalUrl() {
    return getFileUrl("original", this.siegel);
  }
}
</script>
