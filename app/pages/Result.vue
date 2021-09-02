<template lang="pug">
  .big-seal-page.result
    .toolbar
      ActionButton(title="Zurück" icon="undo" @click="goBack")
    .big-seal
      Item3d(:heightmap="result.heightmap")
    .toolbar
      ActionButton(title="3D-Modell" icon="download" @click="downloadStl")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import "../style/result.sass";
import Item3d from "../components/Item3d.vue";
import ActionButton from "../components/ActionButton.vue";
import {ResultData} from "../data/ResultData";

@Component({components: {ActionButton, Item3d}})
export default class Result extends Vue {
  private result = ResultData.instance;

  public downloadStl() {
    window.location = this.result.stl as any;
  }

  public async goBack() {
    await this.$router.push(this.result.backLink);
  }
}
</script>
