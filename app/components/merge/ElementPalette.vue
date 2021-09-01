<template lang="pug">
#element-palette
  .element(v-show="elements" v-for="element in elements")
    img(:src="element.preRendered" @click="onClick(element)")
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {SealElement} from "../../data/SealElement";
import {asUrl, get} from "../../util/api";

@Component
export default class ElementPalette extends Vue {
  private elements: SealElement[] | null = null;

  private async mounted() {
    const elements: SealElement[] = await get("merge/elements");
    elements.forEach(elem => {
      elem.heightmap = asUrl(`assets/merge/heightmaps/${elem.id}.png`);
      elem.preRendered = asUrl(`assets/merge/preRendered/${elem.id}.png`);
    });
    this.elements = elements;
  }

  private onClick(element: SealElement) {
    this.$emit('click', element);
  }
}
</script>

<style scoped>

</style>
