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
        .main.info
          p Willkommen bei FabSeal Create, bei der wir dir neben unserer #[router-link(to="/browse") vielseitigen Sammlung] die Möglichkeit geben, deine eigenen Motiven zu Stempeln umzuwandeln. Ob selbst kreiierte Wappen, Zeichnungen oder Fotos von deiner Katze sind dir keine Grenzen gesetzt. Lade ein Bild deiner Wahl hoch, bewege den gewünschten Ausschnitt zurecht und lade deine Kreation als 3D-Modell herunter.
          p Für detailierte Fotos mit vielen kleinen Elementen empfehlen wir einen Resindrucker, damit dein Motiv gut erkennbar gedruckt wird. Für herkömmliche 3D-Drucker eignen sich Vektor- oder Comicgrafiken mit wenigen Konturen und hohem Kontrast am Besten. Detailiertere Infos zur Fabrikation findest du in #[router-link(to="/guide") unserem Guide].
      FileUpload.big-seal(tooltip="Upload or Drag an Image" sticky-tooltip="true" @successfulUpload="showOptions = true")
      .toolbar
        .group
            #options(v-if="showOptions")
                CheckBox(title="Invertiere Motiv-Höhe" v-model="isInversed" left)
                CheckBox(title="Exportiere in niedriger Qualität" v-model="isLowQuality" left)
        .group
          ActionButton(title="Hochladen" icon="upload-alt")
          ActionButton(title="Exportieren" icon="download")

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
