<template lang="pug">
  .screen-height-page.padding-page
    Location(:entries="[{title: 'Übersicht', href: '/home'}, {title: 'Datensatz', href: '/data'}, {title: 'Siegelsammlung Paul Arnold Grun', href: '100'}]")
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
  import Location from '../components/Location.vue';

  @Component({components: {ActionButton, Slider, Location}})
  export default class Merge extends Vue {

  }
</script>
