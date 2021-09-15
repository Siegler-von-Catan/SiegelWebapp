<template lang="pug">
  .big-seal-page.result
    .toolbar
      ActionButton(title="Zurück" icon="undo" @click="goBack")
    .big-seal
      Item3d(:heightmap="result.heightmap")
    .toolbar
      ActionLink(title="3D-Modell" icon="download" :href="model_url")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import "../style/result.sass";
import Item3d from "../components/Item3d.vue";
import getCreateSessionModelUrl from "../util/createAPI.ts";
import ActionButton from "../components/ActionButton.vue";
import ActionLink from "../components/ActionLink.vue";
import {ResultData} from "../data/ResultData";
import { Component, Provide } from 'vue-property-decorator'

const domain = process.env.DOMAIN || "";

@Component({components: {ActionButton, ActionLink, Item3d}})
export default class Result extends Vue {
  private result = ResultData.instance;

  @Provide() model_url = `${domain}/api/v1/create/result?type=model`

  public async goBack() {
    await this.$router.push(this.result.backLink);
  }
}
</script>
