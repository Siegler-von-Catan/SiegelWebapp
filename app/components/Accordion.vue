<template lang="pug">
  .question
    .tab__header
      a.tab__link(@click.prevent="toggleActive") {{ title }}
        span.down-Arrow(v-show="!active") &#5121;
        span.up-Arrow(v-show="active") &#5123;
    .tab__content(v-show="active")
      slot
</template>

<script lang="ts">
import "../style/accordion.sass";
import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class Accordion extends Vue {

  active = false;

  toggleActive(){
    this.active = !this.active
  }

  @Prop({default: ""})
  public title: string;

}
</script>
