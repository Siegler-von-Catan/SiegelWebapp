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
  .padding-page
    Location(:entries="[{title: 'Übersicht', href: '/home'}, {title: 'Datensätze', href: '/browse'}]")
    div
      router-link(to="/browse/seals") Siegelsammlung Paul Arnold Grun
</template>

<script lang="ts">
  import "../style/browse.sass";
  import "../style/page.sass";
  import Component from 'vue-class-component';
  import Vue from 'vue';
  import Location from "../components/Location";

  @Component({components: {Location}})
  export default class Datasets extends Vue {

  }
</script>
