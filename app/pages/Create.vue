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
        .main.info Irgendwann kommt der Punkt, an dem du weißt: Wie es ist, darf es nicht bleiben. Die großen Aufgaben sind liegen geblieben. Weil sie groß sind. Weil du weißt, dass sie anstrengend werden. Lieber nochmal das Bücherregal abstauben oder durch den Newsfeed scrollen. Um Digitalisierung, Bildung, Klima, Freiheit und Wirtschaft kümmern wir uns dann morgen. Und man hofft darauf, dass sich diese Themen von selbst erledigen. Dass sich das schon ergibt. Digitalisierung kann aber kein Nebenthema mehr sein. Es ist ein Überlebensthema. Das hat die Pandemie gezeigt. Unsere Kinder brauchen dringend moderne Bildung. Für den Klimaschutz sind schlaue Lösungen notwendig. Unsere Freiheit ist bedroht – wie können wir sie wieder sichern? Jetzt ist die Zeit, etwas zu tun. Warten wir nicht länger auf die Zukunft. Gehen wir hin. Heute. Nie gab es mehr zu tun. Irgendwann kommt der Punkt, an dem du weißt: Wie es ist, darf es nicht bleiben. Die großen Aufgaben sind liegen geblieben. Weil sie groß sind. Weil du weißt, dass sie anstrengend werden. Lieber nochmal das Bücherregal abstauben oder durch den Newsfeed scrollen. Um Digitalisierung, Bildung, Klima, Freiheit und Wirtschaft kümmern wir uns dann morgen. Und man hofft darauf, dass sich diese Themen von selbst erledigen. Dass sich das schon ergibt. Digitalisierung kann aber kein Nebenthema mehr sein. Es ist ein Überlebensthema. Das hat die Pandemie gezeigt. Unsere Kinder brauchen dringend moderne Bildung. Für den Klimaschutz sind schlaue Lösungen notwendig. Unsere Freiheit ist bedroht – wie können wir sie wieder sichern? Jetzt ist die Zeit, etwas zu tun. Warten wir nicht länger auf die Zukunft. Gehen wir hin. Heute. Nie gab es mehr zu tun.
      FileUpload.big-seal(tooltip="Upload or Drag an Image" sticky-tooltip="true" @successfulUpload="showOptions = true")
      .toolbar
        .group
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
