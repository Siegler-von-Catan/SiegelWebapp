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

export class ResultData {
  public heightmap: string = "";
  public stl: string = "";
  public original: any = {};
  public backLink: string = "";

  private constructor() {}
  public readonly static instance = new ResultData();
}

@Component({components: {ActionButton, Item3d}})
export default class Result extends Vue {
  private result = ResultData.instance;

  public downloadStl() {
    window.location = this.result.stl;
  }

  public async goBack() {
    await this.$router.push(this.result.backLink);
  }
}
</script>
