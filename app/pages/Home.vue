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
            .over-video
              h1 Erstelle eigene Siegelstempel
              h1 oder wähle ein historisches Motiv aus!
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
            .container__col-sm-4
              h2 FAQ
            .container__col-sm-8
              .questions
                Accordion(title="Was ist FabSeal?")
                  p Mit "FabSeal" kann jede*r in Zukunft wortwörtlich Brief und Siegel geben. Die Webanwendung erweckt die Lacksiegel aus der Sammlung von Paul Arnold Grun wieder zum Leben, indem aus den 2D-Fotos des Siegels ein 3D-Modell automatisch generiert wird. Die 3D-Modelle können anschließend mit dem 3D-Drucker oder Lasercutter erneut physisch hergestellt werden, um ganz einfach zu Hause eigene Siegel zu erschaffen und zu benutzen. Diese Webanwendung kann als Grundlage dienen, um neben Siegeln auch andere Sammlungen wie bspw von Münzen in die 3D-Welt zu bringen.
                Accordion(title="Wie druckt man die Siegelstempel am besten?")
                  p Wie funktioniert nun die Herstellung des Siegels genau? Womit lässt sich ein Siegelstempel herstellen? Beim Durchstöbern der Siegel kann eines ausgewählt werden, welches dann als 3D-Modell angezeigt wird. Dort lässt sich sowohl eine 3D-Vorlage für die und im #[router-link(to="/guide") Herstellung mit dem 3D-Drucker] als auch eine Vektordatei für die Herstellung mit dem Lasercutter runterladen. Die besten Druckergebnisse erzielt ein Resindrucker mittels Kunstharz. Frag am besten im FabLab oder Makerspace in deiner Nähe nach, ob dort ein solcher Drucker vorhanden ist. Alternativ kannst du auch einen herkömmlichen 3D-Drucker zu Hause nutzen, der bspw mit PLA-Filament arbeitet. Hier könnten die Ergebnisse verbessert werden, indem das 3D-Modell ein leicht tieferes Relief erhält. Die Vorlage für den Lasercutter kannst du auch nutzen, um einen Siegelstempel aus Moosgummi mit einem Hobbyplotter herzustellen.
                Accordion(title="Wie funktioniert FabSeal?")
                  p Die technische Umsetzung für die Erstellung eines 3D-Modells aus den 2D-Fotos besteht aus verschiedenen Zwischenschritten, die ineinander greifen. Von jedem Lacksiegel der Sammlung existiert ein Foto, aus welchem wir die Siegelabdrücke automatisch freistellen und die Form herausfiltern. Neben rechteckigen und ovalen Siegelformen existieren auch weitere nicht-triviale Formen, die aufwendiger zu erkennen sind. Im nächsten Schritt berechnet unser Algorithmus Höheninformationen für das spätere 3D-Objekt unter Nutzung des Verfahrens "Shape-from-Shading (SfS)". Die Schwierigkeit entstand hierbei vor allem durch die Beleuchtung, die zum Teil ungünstige Schatten wirft, denn unser Programm arbeitet mit nur einem Foto pro Siegel. Das fertige Höhenbild wurde dann mit Bildalgorithmen nachbearbeitet, um das Rauschen zu entfernen bevor es in ein 3D-Modell umgewandelt wird.
                Accordion(title="Wie kam es zu FabSeal?")
                  p Beim Kulturhackathon "Coding da Vinci Niedersachen" wurde unter anderem die Siegelsammlung von Paul Arnold Grun vorgestellt. Dieser schenkte der Staats- und Universitätsbibliothek Göttingen seine fast 1500 Abdrücke von Lacksiegeln. Grun hatte schon zu Beginn seiner Militärzeit begonnen, Siegelabdrücke seiner Kameraden zu erbitten und damit eine kleine Siegelsammlung anzulegen. Erweitert wurde die Sammlung später durch weitere Siegelabdrücke, die Mitglieder der Genealogisch-Heraldischen Gesellschaft Göttingens beisteuerten. Im Jahr 2016 wurden die Siegel abfotografiert und im #[a(href="https://sammlungen.uni-goettingen.de/sammlung/slg_1034/", target="_blank") Onlineportal der Universität Göttingen] bereit gestellt. Der Datensatz enthält pro Siegel eine Abbildung, die Maße und den Namen der siegelführenden Familie, wie er unter dem Siegel verzeichnet ist. Darüber hinaus wurden die im Siegel abgebildeten Symbole durch Schlagworte erschlossen. Wir haben uns dann der Herausforderung gestellt, die ursprünglichen physischen Siegelstempel basierend auf diesen Fotos automatisch zu generieren.
                Accordion(title="Ich bin ein Museum und möchte meine Datensätze einpflegen lassen, wie komme ich mit euch in Kontakt?")
                  p Schreib uns eine Mail an siegler.von.catan@gmail.com.
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import "../style/home.sass";
import ActionButton from '../components/ActionButton.vue';
import Accordion from '../components/Accordion.vue';

@Component({components: {ActionButton, Accordion}})
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
