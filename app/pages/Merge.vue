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
  .big-seal-page
    .toolbar
      .main
        Slider(title="Optimierung").center
        Slider(title="Kontrast").center
    .big-seal
      | Much big Seal go here
    .toolbar
      .info Hello World
      .group
        ActionButton(title="Upload" icon="upload").end
        ActionButton(title="Export" icon="download").end
      ElementPalette(@click="placeElement")
      DrawableSeal(ref="drawableSeal")
      ToolBar(@doExport="doExport")
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import ElementPalette from "../components/merge/ElementPalette.vue";
import DrawableSeal from "../components/merge/DrawableSeal.vue";
import ToolBar from "../components/merge/ToolBar.vue";
import {merge} from "../data/MergeExport";
import {SealElement} from "../data/SealElement";

@Component({components: {ElementPalette, DrawableSeal, ToolBar}})
export default class Merge extends Vue {

  $refs!: {
    drawableSeal: DrawableSeal
  }

  private placeElement(element: SealElement) {
    this.$refs.drawableSeal.placeElement(element);
  }

  private doExport() {
    const json = this.$refs.drawableSeal.getSerializedElements();
    merge(json);
  }
}
</script>

