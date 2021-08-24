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

<!--            #options-->
<!--                #checkbox-->
<!--                    input(type="checkbox" id="inverse")-->
<!--                    label(for="inverse") Inverse-->

<template lang="pug">
    .screen-height-page.padding-page
        .big-seal-page#create
            .toolbar
                ActionButton(title="Upload" icon="upload-alt")
                .main
                    CheckBox(title="Inverse motif height" v-model="isInversed")
                    CheckBox(title="Export as low quality" v-model="isLowQuality")
            FileUpload.big-seal(tooltip="Upload or Drag an Image" sticky-tooltip="true" @successfulUpload="showOptions = true")
            .toolbar
                div
                ActionButton(title="Export" icon="download")

</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import FileUpload from "../components/FileUpload.vue";
    import "../style/bigSealPage.sass";
    import ActionButton from "../components/ActionButton.vue";
    import CheckBox from '../components/CheckBox.vue';

    @Component({components: {FileUpload, ActionButton, CheckBox}})
    export default class Create extends Vue {
        private showOptions = false;
        private isInversed = false;
        private isLowQuality = false;

    }

</script>
