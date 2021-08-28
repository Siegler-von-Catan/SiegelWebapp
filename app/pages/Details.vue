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
  #detail.padding-page.screen-height-page(v-show="loaded")
    Location(:entries="[{title: 'Übersicht', href: '/home'}, {title: 'Datensätze', href: '/browse'}, {title: dataset.title, href: datasetId}, {title: item.name, href: 'detail/' + itemId}]")
    .big-seal-page
      .toolbar
        .group
          h1 {{ item.name }}
          .tags
            .tag(v-for="(tag, i) in item.subjects" :key="i") {{ tag }}
        .main
          h1 Originalfoto
          img(:src="original" :alt="item.name")
      .big-seal
        img(:src="heightmap" :alt="item.name")
      .toolbar
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import Siegel3DCanvas from "../components/Siegel3DCanvas.vue";
import Location from '../components/Location.vue';
import "../style/details.sass";
import "../style/page.sass";
import {asUrl, get} from "../util/api";
import {DatasetData} from "../components/Dataset.vue";

export interface Item {
  id: number;
  name: string;
  subjects: string[];
}

@Component({components: {Siegel3DCanvas, Location}})
export default class Details extends Vue {

  private dataset: DatasetData = {id: "", title: "", description: ""};
  private item: Item = {id: 0, subjects: [], name: ""};
  private heightmap: string = "";
  private original: string = "";
  private loaded = false;

  public async mounted() {
    const data = await get(`datasets/${this.datasetId}/items/${this.itemId}`);
    this.item = data.item;
    this.dataset = data.dataset;
    const heightmapFile = await get(`datasets/${this.datasetId}/items/${this.itemId}/heightmap`);
    this.heightmap = asUrl(heightmapFile.file);
    const originalFile = await get(`datasets/${this.datasetId}/items/${this.itemId}/original`);
    this.original = asUrl(originalFile.file);
    this.loaded = true;
  }

  private get datasetId(): string {
    return this.$route.params.dataset;
  }

  private get itemId(): string {
    return this.$route.params.item;
  }
}
</script>
