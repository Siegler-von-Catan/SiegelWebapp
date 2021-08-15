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
    .big-seal-page#merge
      .toolbar
        .main
          ElementPalette(@click="placeElement")
      DrawableSeal.big-seal(ref="drawableSeal")
        | Much big Seal go here
      .toolbar
        .group
          ActionButton(title="Undo" icon="undo")
          ActionButton(title="Redo" icon="redo")
        .group
          ActionButton(title="Upload" icon="upload")
          ActionButton(title="Export" icon="download" @click="doExport")
    img(ref="result")
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import ElementPalette from "../components/merge/ElementPalette.vue";
import DrawableSeal from "../components/merge/DrawableSeal.vue";
import {merge} from "../data/MergeExport";
import {SealElement} from "../data/SealElement";
import "../style/merge.sass";
import "../style/bigSealPage.sass";
import ActionButton from '../components/ActionButton.vue';

@Component({components: {ActionButton, ElementPalette, DrawableSeal}})
export default class Merge extends Vue {

  $refs!: {
    drawableSeal: DrawableSeal,
    result: HTMLImageElement
  }

  private placeElement(element: SealElement) {
    this.$refs.drawableSeal.placeElement(element);
  }

  private doExport() {
    const json = this.$refs.drawableSeal.getSerializedElements();
    merge(json).then(result => {
      this.$refs.result.setAttribute("src", result);
    });
  }
}
</script>

