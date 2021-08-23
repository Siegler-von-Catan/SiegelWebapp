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
  .padding-page
    Location(:entries="[{title: 'Übersicht', href: '/home'}, {title: 'Datensätze', href: '/browse'}, {title: datasetName, href: datasetId}]")

    .browse
      .search
        select(v-model="limit")
          option 25
          option 50
          option 100
        .offset
          input(type="number" v-model="offset" min="0")
        p {{ "Items: " + itemsCount }}
        p {{ "Currently shown: " + loadedItems.length }}
        button(@click="loadItems") Load
      .items
        .item(v-for="(item, i) in loadedItems" :key="i")
          h1 {{ item.name }}
          p {{ item.subjects.join(', ') }}
</template>

<script lang="ts">
  import "../style/browse.sass";
  import "../style/page.sass";
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import Location from '../components/Location.vue';
  import {get} from "../util/api";
  import {DatasetData} from "../components/Dataset.vue";

  interface Item {
    id: string;
    name: string;
    subjects: string[];
  }

  interface DatasetInfo {
    dataset: DatasetData;
    itemsCount: number;
  }

  @Component({components: {Location}})
  export default class Browse extends Vue {
    private datasetName: string = "";
    private itemsCount = 0;
    private loadedItems: Item[] = [];
    private limit = 25;
    private offset = 0;

    private async mounted() {
      const info: DatasetInfo = await get(`datasets/${this.datasetId}/items/info`);
      this.datasetName = info.dataset.title;
      this.itemsCount = info.itemsCount;
      await this.loadItems();
    }

    private async loadItems() {
      this.loadedItems = await get(`datasets/${this.datasetId}/items`, {limit: this.limit, offset: this.offset});
    }

    private get datasetId(): string {
      return this.$route.params.dataset;
    }
  }
</script>
