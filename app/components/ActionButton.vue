<template lang="pug">
  .action-button(@click="$emit('click')")
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
export default class ActionButton extends Vue {

  @Prop({default: ""})
  public title: string;

  @Prop({default: ""})
  public icon: string;

}
</script>
