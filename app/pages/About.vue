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
                        h2 Von Potsdam nach Berlin, Leipzig und Niedersachsen!
                        p Hallo du! Wir sind eine Gruppe Master-Studierende aus Potsdam und Bayern. Zusammengeschweißt nicht nur durch unseren gemeinsamen Bachelor-Abschluss am Hasso-Plattner-Institut in IT-Systems Engineering, sondern auch durch unsere Leidenschaft für Hackathons, sind ein paar von uns bereits 2017 auf Coding Da Vinci gestoßen. Das Konzept von einem mehrwöchigen Hackathon fanden wir schon damals ganz cool: Statt übliche Hackathons mit zu verstaubenden Repos zu verlassen, hatte man nun die Gelegenheit für ein größeres, fertiges Projekt. Auch erfrischend war es, mit den Kulturdaten aus unserer technischen Informatiker-Bubble zu kommen. Demnach nahmen wir mit #[a(href="https://codingdavinci.de/projekte/skelex") Skelex] teil, verbreiteten unter unseren Kommilitonen die guten Erfahrungen und waren mit unterschiedlichen Teams in Nachfolgeevents unter anderem mit #[a(href="https://codingdavinci.de/projekte/snailsnap") SnailSnap], #[a(href="https://codingdavinci.de/projekte/altlas") Altlas] und #[a(href="https://codingdavinci.de/projekte/battlesim") Battlesim] wiederzufinden. An Coding Da Vinci Niedersachsen teilzunehmen konnten wir uns also nicht entgehen lassen! Mit neu erlangten Kenntnissen in Bildverarbeitung, Algorithmen und der Bestimmung eines Scrum-Masters entstand also FabSeal.
                        p Unser gesamter Code befindet sich frei zugänglich in #[a(href="https://github.com/Siegler-von-Catan") unserem Github-Repo]. Wenn du Wünsche für weitere Features oder gar Lust an der Mitarbeit hast, meld dich gerne bei uns unter siegler.von.catan@gmail.com.
                .container__col-sm-4
                    .text
                        p Joana Bergsiek
                        p Generierung 3D-Modelle, Siegelextrahierung, Webseite
                .container__col-sm-4
                    .text
                        p Leonard Geier
                        p Backend, Clustering der Daten
                .container__col-sm-4
                    .text
                        p Lisa Ihde
                        p Content, Design, Webseite
                .container__col-sm-4
                    .text
                        p Tobias Markus
                        p Backend, Shape From Shading, Siegelextrahierung
                .container__col-sm-4
                    .text
                        p Dominik Meier
                        p Daten, Design, Shape From Shading
                .container__col-sm-4
                    .text
                        p Paul Methfessel
                        p Backend, Webseite
</template>

<script lang="ts">
    import Vue from "vue";
    import "../style/bigSealPage.sass";
    import Component from "vue-class-component";

    @Component
    export default class About extends Vue {

    }
</script>
