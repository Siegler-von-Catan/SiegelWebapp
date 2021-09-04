<template lang="pug">
  .loadable
    .loading(v-if="!loaded")
      span {{ title }}
    slot(v-else)
</template>

<script lang="ts">
import "../style/loadable.sass";
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class Loadable extends Vue {
  @Prop({default: "Am laden"}) title: string;
  @Prop() loaded: boolean;
}
</script>
