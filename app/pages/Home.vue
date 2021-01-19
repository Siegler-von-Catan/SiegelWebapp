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
  extends page

  block content
    section(class="container--fluid")
      .container__row
        #home
          .container__col-sm-12
            #siegels
              Siegel3DCanvas(v-for="(tex, i) in textures" @click="onClick(siegels[i])" :tooltip="siegels[i].name" :heightmap="tex" :offset="i - Math.floor(textures.length / 2)")
          .container__col-sm-12
            a.home-button#link-browse(href="/browse.pug") Siegel durchstöbern
          .container__col-sm-12
            h1 Erwecke historische Siegel zum Leben!
      .container__row
          .container__col-sm-12.container__col-lg-6
            .picture
              img(src="../assets/siegelsammlung_grun.jpg" alt="Siegelsammlung Grun")
          .container__col-sm-12.container__col-lg-6
            .text
              h2 Die Siegelsammlung
              p Der Sammler Paul Arnold Grun schenkte der Staats- und Universitätsbibliothek Göttingen seine fast 1500 Abdrücke von Lacksiegeln. Grun hatte schon zu Beginn seiner Militärzeit begonnen, Siegelabdrücke seiner Kameraden zu erbitten und damit eine kleine Siegelsammlung anzulegen. Erweitert wurde die Sammlung später durch weitere Siegelabdrücke, die Mitglieder der Genealogisch-Heraldischen Gesellschaft Göttingens beisteuerten. Im Jahr 2016 wurden die Siegel abfotografiert und im #[a(href="https://sammlungen.uni-goettingen.de/sammlung/slg_1034/", target="_blank") Onlineportal der Universität Göttingen] bereit gestellt. Der Datensatz enthält pro Siegel eine Abbildung, die Maße und den Namen der siegelführenden Familie, wie er unter dem Siegel verzeichnet ist. Darüber hinaus wurden die im Siegel abgebildeten Symbole durch Schlagworte erschlossen.
          .container__col-sm-12.container__col-lg-6
            .text
              h2 Eigene Siegelstempel
              p Mit "FabSeal" kann jede*r in Zukunft wortwörtlich Brief und Siegel geben. Die Webanwendung erweckt die Lacksiegel aus der Sammlung von Paul Arnold Grun wieder zum Leben, indem aus den 2D-Fotos des Siegels ein 3D-Modell automatisch generiert wird. Die 3D-Modelle können anschließend mit dem 3D-Drucker oder Lasercutter erneut physisch hergestellt werden, um ganz einfach zu Hause eigene Siegel zu erschaffen und zu benutzen. Diese Webanwendung kann als Grundlage dienen, um neben Siegeln auch andere Sammlungen wie bspw von Münzen in die 3D-Welt zu bringen.
          .container__col-sm-12.container__col-lg-6
            .picture
              img(src="../assets/fabricatedSeal.jpg" alt="Selbstgemachter Siegelstempel")
          .container__col-sm-12.container__col-lg-6
            .picture
              img(src="../assets/pipeline.gif" alt="Pipeline")
          .container__col-sm-12.container__col-lg-6
            .text
              h2 Funktionsweise
              p Die technische Umsetzung für die Erstellung eines 3D-Modells aus den 2D-Fotos besteht aus verschiedenen Zwischenschritten, die ineinander greifen. Von jedem Lacksiegel der Sammlung existiert ein Foto, aus welchem wir die Siegelabdrücke automatisch freistellen und die Form herausfiltern. Neben rechteckigen und ovalen Siegelformen existieren auch weitere nicht-triviale Formen, die aufwendiger zu erkennen sind. Im nächsten Schritt berechnet unser Algorithmus Höheninformationen für das spätere 3D-Objekt unter Nutzung des Verfahrens "Shape-from-Shading (SfS)". Die Schwierigkeit entstand hierbei vor allem durch die Beleuchtung, die zum Teil ungünstige Schatten wirft, denn unser Programm arbeitet mit nur einem Foto pro Siegel. Das fertige Höhenbild wurde dann mit Bildalgorithmen nachbearbeitet, um das Rauschen zu entfernen bevor es in ein 3D-Modell umgewandelt wird.
          .container__col-sm-12
            img#line(src="../assets/hr2.svg")
          .container__col-sm-12
            #contact
              a.envelope(href="mailto:fab.seal@gmail.com")
                span.seal.ss-social-regular
                  span.embossed FabSeal
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import Siegel3DCanvas from '../components/Siegel3DCanvas.vue';
  import Page from './Page';
  import {getFileUrl, getRandomData, openDetails, Siegel} from '../util/api';

  @Component({components: {Siegel3DCanvas}})
  export default class Home extends Page {

    private textures: string[] = [];
    private siegels: Siegel[] = [];

    public async mounted() {
      this.siegels = await getRandomData(3);
      this.textures = this.siegels.map(s => getFileUrl("heightmap", s));
    }

    private onClick(s: Siegel) {
      openDetails(s);
    }
  }
</script>
