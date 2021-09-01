<template lang="pug">
  .dropdown
    label(:for="_uid") {{ title }}
    select(:id="_uid" :value="value" @change="$emit('change', $event.target.value)")
      option(v-for="(option, i) in options" :key="i") {{ option }}
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";
import {Model, Prop} from "vue-property-decorator";
import "../style/dropdown.sass";

@Component
export default class Dropdown extends Vue {
  @Prop() readonly title: string;
  @Prop() readonly options: any[];
  @Model("change") readonly value: any;
}
</script>
