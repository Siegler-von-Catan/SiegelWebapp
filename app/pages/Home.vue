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
  .page
    section(class="container--fluid")
      .container__row
        .container__col-sm-12
          .teaser
            video(media="(max-width: 480px)" src="../assets/teaser_vs1.mp4" autoplay loop)
            h1 Erstelle eigene Siegelstempel 
              br
              |oder wähle ein historisches Motiv aus!
        .links      
          .container__col-sm-4
            .group
              h2 Browse
              img(src="../assets/siegelsammlung_grun_571w.jpg")
              p Besuche unsere digitale Ausstellung und erfahre mehr über die enthaltenen Stücke
              ActionButton(title="Zur Ausstellung" icon="forward" @click="goToBrowse")
          .container__col-sm-4
            .group_center
              h2 Remix
              img(src="../assets/siegelsammlung_grun_571w.jpg")
              p Werde kreativ und stelle dein eigenes Siegel zusammen
              ActionButton(title="Zum Editor" icon="forward" @click="goToRemix")
          .container__col-sm-4
            .group
              h2 Create
              img(src="../assets/siegelsammlung_grun_571w.jpg")
              p Lade ein Foto hoch, um es als Siegel ausdrucken zu können
              ActionButton(title="Zum Upload" icon="forward" @click="goToCreate")
        .container__col-sm-12
          .faq
            h2 Hier könnte ein FAQ stehen

</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import "../style/home.sass";
import ActionButton from '../components/ActionButton.vue';

@Component({components: {ActionButton}})
export default class Home extends Vue { 

  private goToBrowse() {
   this.$router.push('/browse'); 
  }

  private goToRemix() {
   this.$router.push('/remix'); 
  }

  private goToCreate() {
   this.$router.push('/create'); 
  }

}

</script>
