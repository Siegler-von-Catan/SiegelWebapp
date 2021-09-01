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
  .screen-height-page.padding-page
    .alert(@click="$event.target.style.display = 'none'")
      | Diese Seite ist noch im Bau
    .big-seal-page#remix
      .toolbar
        .main
          ElementPalette(@click="placeElement")
      DrawableSeal.big-seal(ref="drawableSeal")
      .toolbar
        .group
          ActionButton(title="Rückgängig" icon="undo")
          ActionButton(title="Wiederherstellen" icon="redo")
        .group
          ActionButton(title="Hochladen" icon="upload")
          ActionButton(title="Exportieren" icon="download" @click="doExport")
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import ElementPalette from "../components/merge/ElementPalette.vue";
import DrawableSeal from "../components/merge/DrawableSeal.vue";
import {SealElement} from "../data/SealElement";
import "../style/remix.sass";
import "../style/bigSealPage.sass";
import ActionButton from '../components/ActionButton.vue';
import {postGetFile} from "../util/api";
import {ResultData} from "./Result.vue";

@Component({components: {ActionButton, ElementPalette, DrawableSeal}})
export default class Remix extends Vue {

  $refs!: {
    drawableSeal: DrawableSeal
  }

  private placeElement(element: SealElement) {
    this.$refs.drawableSeal.placeElement(element);
  }

  public mounted() {
    this.restore();
  }

  private restore() {
    if (ResultData.instance.backLink === "remix") {
      this.$refs.drawableSeal.deserialize(ResultData.instance.original);
    }
    ResultData.instance.backLink = "";
  }

  private async doExport() {
    const json = this.$refs.drawableSeal.getSerializedElements();
    ResultData.instance.backLink = "remix";
    ResultData.instance.original = this.$refs.drawableSeal.serialize();
    ResultData.instance.heightmap = await postGetFile("merge", json);
    ResultData.instance.hasResult = true;
    await this.$router.push("result");
  }
}
</script>

