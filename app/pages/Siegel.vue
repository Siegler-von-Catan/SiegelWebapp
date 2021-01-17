<template lang="pug">
  extends page

  block content
    #loading(v-if="!loaded")
      #error(v-if="error")
        span Error loading siegel
      span(v-else) Loading
    #siegel(v-if="loaded")
      Siegel3DCanvas(v-if="texture" :heightmap="texture" offset="0")
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from "vue";
    import {getQueryParams} from "../util/util";
    import {getDataFor, getFileUrl} from "../util/api";
    import Siegel3DCanvas from "../components/Siegel3DCanvas.vue";

    @Component({components: {Siegel3DCanvas}})
    export default class Siegel extends Vue {

      private texture: string;
      private sName: string;
      private loaded = false;
      private error = false;

      public async mounted() {
        const s = getQueryParams()["s"];
        if (!s) {
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

        this.sName = data.name;
        this.texture = getFileUrl(`heightmaps/${data.heightmap}`);
        this.loaded = true;
      }
    }
</script>

<style lang="sass" scoped>

</style>
