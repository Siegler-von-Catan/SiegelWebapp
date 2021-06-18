<template lang="pug">
#element-palette
  .element(v-show="elements" v-for="element in elements")
    img(:src="element.preRendered" @click="onClick(element)")
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {loadElements, SealElement} from "../../data/SealElement";

@Component
export default class ElementPalette extends Vue {
  private elements: SealElement[] | null = null;

  private mounted() {
    loadElements().then(elements => {
      this.elements = elements;
    });
  }

  private onClick(element: SealElement) {
    this.$emit('click', element);
  }
}
</script>

<style scoped>

</style>
