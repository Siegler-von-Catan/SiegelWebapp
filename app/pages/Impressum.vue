<!--
  - FabSeal Website.
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
    .page
        section(class="container--fluid")
            .container__row
                .container__col-sm-12
                    .text
                        h2 Impressum
                        p Tobias Markus
                        p Lieblstr. 31
                        p 93059 Regensburg
                        p siegler.von.catan@gmail.com
                        p (0941) 5865582

</template>

<script lang="ts">
    import Vue from "vue";
    import "../style/bigSealPage.sass";
    import Component from "vue-class-component";

    @Component
    export default class Impressum extends Vue {

    }
</script>
