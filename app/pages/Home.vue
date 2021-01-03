<template lang="pug">
  extends page

  block content
    section(id="home")
      #siegels
        Siegel3DCanvas(v-for="(tex, i) in textures" :heightmap="tex" :offset="i - Math.floor(textures.length / 2)")
      a.home-button#link-create(href="/merge.pug") Create your own seal
      a.home-button#link-browse(href="/browse.pug") Browse seals
    section(id="info")
      .part
        img(src="../assets/mock.jpg" alt="Mock")
        span
          h2 Space, the final frontier.
          p These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.
          | Many say exploration is part of our destiny, but it’s actually our duty to future generations,
      .part
        span
          h2 The Rise of Skywalker
          p The dead speak! The galaxy has heard a mysterious broadcast, a threat of revenge in the sinister voice of the late emperor Palpatine.
          | General Leia Organa dispatches secret agents to gather intelligence, while Rey, the last hope of the Jedi, trains for battle against the diabolical First Order. Meanwhile, Supreme Leader Kylo Ren rages in search of the phantom Emperor, determined to destroy any threat to his power....
        img(src="../assets/mock.jpg" alt="Mock")
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Siegel3DCanvas from '../components/Siegel3DCanvas.vue';
  import Page from './Page';
  import {getData, getFileUrl, Siegel} from '../util/api';
  import {randomSubArray} from '../util/util';

  @Component({components: {Siegel3DCanvas}})
  export default class Home extends Page {

    private textures: string[] = [];
    private siegels: Siegel[] = [];

    public async mounted() {
      const data = await getData();
      this.siegels = randomSubArray(data, 3);
      this.textures = this.siegels.map(s => getFileUrl(`heightmaps/${s.heightmap}`));
    }

  }
</script>

<style lang="sass" scoped>
  @import variables

  #home
    display: flex
    flex-direction: column
    align-items: center

    #siegels
      display: flex
      justify-content: center
      align-items: center
      width: 90%
      height: 50vh
      margin-top: 6em

      .siegel3d
        width: 15em
        height: 15em

    .home-button
      font-size: 2em
      text-decoration: none
      border-radius: 10px
      padding: .5em 1.2em
      margin: .4em 0

      user-select: none

      transition: padding .4s ease, background .1s ease, color .2s ease

      &:hover
        padding: .5em 1.6em

      &#link-create
        color: $base
        background: $accent
        font-size: 2.3em
        border: 2px solid $accent

        &:active
          background: $base
          color: $accent

      &#link-browse
        color: $accent
        background: $base
        border: 2px solid $accent

        &:active
          background: $accent
          color: $base

  #info
    font-size: 2em
    margin: 3em 10em

    .part
      display: flex
      justify-content: space-between
      align-content: center
      margin: 8em 0

      img
        height: 20em

      span
        padding: 0 4em

        &.right-aligned
          text-align: right
</style>
