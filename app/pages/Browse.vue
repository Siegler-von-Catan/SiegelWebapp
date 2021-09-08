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

    Loadable(:loaded="hasLoadedItems")
      .browse(v-show="hasLoadedItems")
        .search
          .title
            h1 {{ datasetName }}
            p {{ `${itemsCount} Elemente` }}
          .page-filter
            Dropdown(v-model="limit" :options="[25, 50, 100]" title="Elemente pro Seite: ")
        PageOffset.top(v-model="offset" :itemCount="itemsCount" :items-per-page="limit")
        .items
          router-link.item(v-for="(item, i) in loadedItems" :key="i" :to="`/browse/${datasetId}/detail/${item.id}`")
            img(:src="loadedThumbs[i]" :alt="item.name")
            h1 {{ item.name }}
            p {{ item.subjects.join(', ') }}
        PageOffset.bottom(v-model="offset" :itemCount="itemsCount" :items-per-page="limit")
</template>

<script lang="ts">
  import "../style/browse.sass";
  import "../style/page.sass";
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import Location from '../components/Location.vue';
  import {DatasetData} from "../components/Dataset.vue";
  import PageOffset from "../components/PageOffset.vue";
  import {Watch} from "vue-property-decorator";
  import Dropdown from "../components/Dropdown.vue";
  import Api from "../util/api";
  import Loadable from "../components/Loadable.vue";

  interface Item {
    id: string;
    name: string;
    subjects: string[];
  }

  interface DatasetInfo {
    dataset: DatasetData;
    itemsCount: number;
  }

  @Component({components: {Dropdown, PageOffset, Location, Loadable}})
  export default class Browse extends Vue {
    private datasetName: string = "";
    private itemsCount = 1;
    private loadedItems: Item[] = [];
    private hasLoadedItems = false;
    private loadedThumbs: string[] = [];
    private limit = 25;
    private offset = 0;

    private async mounted() {
      const info: DatasetInfo = await Api.get(`datasets/${this.datasetId}/items/info`);
      this.datasetName = info.dataset.title;
      this.itemsCount = info.itemsCount;
      await this.loadItems();
      await this.loadThumbs();
    }

    @Watch("offset")
    @Watch("limit")
    private async reloadPage() {
      await this.loadItems();
      await this.loadThumbs();
    }

    private async loadItems() {
      this.loadedItems = await Api.get(`datasets/${this.datasetId}/items`, {params: {limit: this.limit, offset: this.offset}});
      this.hasLoadedItems = true;
    }

    private async loadThumbs() {
      for (const item of this.loadedItems) {
        const thumb = await Api.get(`datasets/${this.datasetId}/items/${item.id}/original`);
        this.loadedThumbs.push(Api.staticUrl(thumb.file));
      }
    }

    private get datasetId(): string {
      return this.$route.params.dataset;
    }
  }
</script>
