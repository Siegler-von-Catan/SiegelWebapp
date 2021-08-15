<!--
  - ShapeFromShading - Creating heightmaps out of 2D seal images.
  - Copyright (C) 2021
  - Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU General Public License as published by
  - the Free Software Foundation, either version 3 of the License, or
  - (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU General Public License for more details.
  -
  - You should have received a copy of the GNU General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

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
        router-link(to="/home") Home
        router-link(to="/browse") Browse
        router-link(to="/remix") Remix
        router-link(to="/create") Create
        a(href="https://youtu.be/xnUtEY7K_qE" target="_blank" style="color:#FF3333") Youtube
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
