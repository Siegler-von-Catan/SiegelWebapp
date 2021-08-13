<template lang="pug">
  #app
    header
      #about
        router-link(to="/")
          picture
            source(media="(max-width: 171px)" srcset="../assets/FabSealLogo_116w.webp")
            source(media="(max-width: 171px)" srcset="../assets/FabSealLogo_116w.png")
            source(media="(max-width: 348px)" srcset="../assets/FabSealLogo_232w.webp")
            source(media="(max-width: 348px)" srcset="../assets/FabSealLogo_232w.png")
            source(media="(min-width: 349px)" srcset="../assets/FabSealLogo_464w.webp")
            source(media="(min-width: 349px)" srcset="../assets/FabSealLogo_464w.png")
            img(src="../assets/FabSealLogo_464w.png" alt="FabSeal Logo")
        router-link(to="/")#title FabSeal
      menu
        a(href="https://youtu.be/xnUtEY7K_qE" target="_blank" style="color:#FF3333") Youtube
        router-link(to="/browse") Siegel durchstöbern
    router-view
    footer
      span Copyright © 2021 FabSeal | #[a(href="https://codingdavinci.de/de/events/niedersachsen-2020", target="_blank") Coding da Vinci Niedersachsen]
</template>

<script lang="ts">
import "../style/page.sass";
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Page extends Vue {}
</script>
