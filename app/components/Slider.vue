<template lang="pug">
  .slider
    .title
      | {{ title }}
    .bottom
      input(type="range" :min="min" :max="max" :step="step" :value="value" @input="$emit('change', Number($event.target.value))")
      .value
        | {{ value }}

</template>

<script lang="ts">
import "../style/slider.sass";
import Component from 'vue-class-component';
import Vue from 'vue';
import {Model, Prop} from 'vue-property-decorator';

@Component
export default class Slider extends Vue {

  @Prop({default: ""}) title: string;
  @Prop({default: 0}) min: number;
  @Prop({default: 100}) max: number;
  @Prop({default: 1}) step: number;
  @Model("change", {type: Number}) readonly value: number;
}
</script>
