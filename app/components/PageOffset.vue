<template lang="pug">
  .offset
    .first(@click="onChange(0)" :class="clazz(0)")
    .prev(@click="onChange(page - 1)" :class="clazz(page - 1)")
    select(:value="page" @change="onChange($event.target.value)")
      option(v-for="i in range" :key="i" :value="i") {{ i + 1 }}
    .next(@click="onChange(page + 1)" :class="clazz(page + 1)")
    .last(@click="onChange(lastPage)" :class="clazz(lastPage)")
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import {Model, Prop} from "vue-property-decorator";
import "../style/pageOffset.sass";

@Component
export default class PageOffset extends Vue {
  @Prop() itemCount: number;
  @Prop() itemsPerPage: number;
  @Model("change") readonly offset: number;

  private onChange(newValue: number) {
    const page = Math.max(0, Math.min(newValue, this.lastPage));
    this.$emit("change", page * this.itemsPerPage);
  }

  private get page(): number {
    return Math.round(this.offset / this.itemsPerPage);
  }

  private get range(): number[] {
    return Array.from(Array(this.lastPage + 1).keys());
  }

  private clazz(value: number) {
    const valid = value >= 0 && value <= this.lastPage;
    const notSame = this.page !== value;
    return {show: valid && notSame};
  }

  private get lastPage() {
    return Math.ceil(this.itemCount / this.itemsPerPage) - 1;
  }
}
</script>
