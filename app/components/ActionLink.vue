<template lang="pug">
  doctype html
  a(class="action-button" download target="_blank" :href="href")
    .icon(:class="this.icon + '-icon'")
    .text
      | {{ title }}
</template>

<script lang="ts">
import "../style/actionButton.sass";
import Component from 'vue-class-component';
import Vue from 'vue';
import {Prop} from 'vue-property-decorator';

@Component
export default class ActionLink extends Vue {
  @Prop({default: ""})
  public href: string;

  @Prop({default: ""})
  public title: string;

  @Prop({default: ""})
  public icon: string;

}
</script>
