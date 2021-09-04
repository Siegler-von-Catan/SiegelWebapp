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
            .tag(v-for="(tag, i) in item.subjects" :key="i" :title="tag") {{ shorterTag(tag) }}
        .main.links
          h1 Originalfoto
          a(:href="original" target="_blank")
            img(:src="original" :alt="item.name")
          //a(href="https://www.youtube.com/watch?v=5qap5aO4i9A" target="_blank") Website der Sammlung
        .group
          .license {{ dataset.license }}
      .big-seal
        Item3d(:heightmap="heightmap")
      .toolbar
        .group.main
          h1 Stempel 3D-Drucken
          //CheckBox(title="Ohne Halterung" left)
          ActionButton(title="Model herunterladen" icon="download" @click="downloadStl")
        //.group
        //  h1 Stempel bestellen
        //  ActionButton(title="Model zu Bestelldienst schicken" icon="right")
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import Location from '../components/Location.vue';
import "../style/details.sass";
import "../style/page.sass";
import {DatasetData} from "../components/Dataset.vue";
import Item3d from "../components/Item3d.vue";
import CheckBox from "../components/CheckBox.vue";
import ActionButton from "../components/ActionButton.vue";
import Api from "../util/api";

export interface Item {
  id: number;
  name: string;
  subjects: string[];
}

@Component({components: {ActionButton, CheckBox, Item3d, Location}})
export default class Details extends Vue {

  private dataset: DatasetData = {id: "", title: "", description: "", license: ""};
  private item: Item = {id: 0, subjects: [], name: ""};
  private heightmap: string = "";
  private original: string = "";
  private loaded = false;

  public async mounted() {
    const data = await Api.get(`datasets/${this.datasetId}/items/${this.itemId}`);
    this.item = data.item;
    this.dataset = data.dataset;
    const heightmapFile = await Api.get(this.itemFileUrl("heightmap"));
    this.heightmap = Api.staticUrl(heightmapFile.file);
    const originalFile = await Api.get(this.itemFileUrl("original"));
    this.original = Api.staticUrl(originalFile.file);
    this.loaded = true;
  }

  private get itemUrl(): string {
    return `datasets/${this.datasetId}/items/${this.itemId}`;
  }

  private itemFileUrl(file: "original" | "heightmap" | "stl"): string {
    return `${this.itemUrl}/${file}`;
  }

  private get datasetId(): string {
    return this.$route.params.dataset;
  }

  private get itemId(): string {
    return this.$route.params.item;
  }

  private shorterTag(tag: string): string {
    const maxLength = 15;
    if (tag.length > maxLength) {
      return tag.substring(0, maxLength - 3) + "...";
    }
    return tag;
  }

  private async downloadStl() {
    const stl = await Api.get(this.itemFileUrl("stl"));
    window.location = Api.staticUrl(stl.file) as any;
  }
}
</script>
