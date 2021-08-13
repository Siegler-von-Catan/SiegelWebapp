<template lang="pug">
  .big-seal-page
    .toolbar
      .main
        Slider(title="Optimierung").center
        Slider(title="Kontrast").center
    .big-seal
      | Much big Seal go here
    .toolbar
      .info Hello World
      .group
        ActionButton(title="Upload" icon="upload").end
        ActionButton(title="Export" icon="download").end
</template>

<script lang="ts">
  import "../style/bigSealPage.sass";
  import Component from 'vue-class-component';
  import Slider from '../components/Slider.vue';
  import ActionButton from '../components/ActionButton.vue';
  import Vue from 'vue';

  @Component({components: {ActionButton, Slider}})
  export default class Merge extends Vue {

  }
</script>
