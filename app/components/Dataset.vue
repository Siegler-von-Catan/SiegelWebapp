<template lang="pug">
  router-link.dataset(:to="`/browse/${dataset.id}`")
    img(:src="img" :alt="dataset.title" v-show="img")
    h1 {{ dataset.title }}
    p {{ dataset.description }}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";
import "../style/datasets.sass";
import {asUrl, get} from "../util/api";

export interface DatasetData {
  id: string;
  title: string;
  description: string;
  license: string;
}

@Component
export default class Dataset extends Vue {
  @Prop() dataset: DatasetData;
  private img: any = "";

  public async mounted() {
    const image = await get(`datasets/${this.dataset.id}/thumb`);
    this.img = asUrl(image.file);
  }
}
</script>
