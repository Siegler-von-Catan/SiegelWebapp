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
    Location(:entries="[{title: 'Übersicht', href: '/home'}, {title: 'Datensätze', href: '/browse'}]")
    .datasets
      Dataset(v-for="(dataset, i) in datasets" :dataset="dataset" :key="i")
      .dataset.fake
        p Mehr Datensätze kommen bald!
</template>

<script lang="ts">
  import "../style/browse.sass";
  import "../style/page.sass";
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import {get} from "../util/api";
  import Dataset, {DatasetData} from "../components/Dataset.vue";
  import Location from "../components/Location.vue";

  @Component({components: {Dataset, Location}})
  export default class Datasets extends Vue {
    private datasets: DatasetData[] = [];

    public async mounted() {
      const datasetMap = await get("datasets");
      this.datasets = Object.values(datasetMap);
    }
  }
</script>
