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
        .info-section
          .text
            h2 Worauf sollte ich beim Druck achten?
            p 3D-Drucker gibt es mittlerweile in vielen Variationen. Sie unterscheiden sich beispielsweise im Druckmaterial und der damit zusammenhängenden Technik. Einige Verfahren können somit detaillierte Druckergebnisse erzeugen als andere.
            p Bei der Herstellung eines Siegelstempels sollte für ein optimales Ergebnis ein Drucker genutzt werden, der besonders feine Strukturen erzeugen kann. Wir empfehlen einen Resindrucker, welcher meist ab 140€ kaufbar ist. Bei dieser Druckweise solltest du immer einen Atemschutz und Schutzhandschuhe tragen. Näheres dazu findest du in diesem [PDF]( https://www.billieruben.info/post/my-3d-printing-posters-1). Falls du keinen eigenen Resindrucker besitzt, dann such nach Makerspaces oder FabLabs in deiner Nähe unter https://www.offene-werkstaetten.org/werkstatt-suche.
            p Alternativ zum Resindrucker kann das Modell mit einem weitverbreiteten 3D-Drucker mit PLA-Filament hergestellt werden. Die feinen Strukturen des Siegelstempels bei dieser Druckweise können aber nicht so gut umgesetzt werden. Bei unseren Testdrucken konnten wir dennoch Stempel erzeugen, wo sich das Siegelmotiv erkennen ließ. Wir haben dafür individuell die Relieftiefe angepasst, bis der Druck mit dem PLA-Filament funktioniert.
          .picture
            picture
              source(media="(max-width: 428px)" srcset="../assets/resinFinished_192w.webp")
              source(media="(max-width: 428px)" srcset="../assets/resinFinished_192w.jpg")
              source(media="(max-width: 856px)" srcset="../assets/resinFinished_384w.webp")
              source(media="(max-width: 856px)" srcset="../assets/resinFinished_384w.jpg")
              source(media="(min-width: 857px)" srcset="../assets/resinFinished_768w.webp")
              source(media="(min-width: 857px)" srcset="../assets/resinFinished_768w.jpg")
              img(src="../assets/resinFinished_768w.jpg" alt="Resin Drucker")
        .info-section
          .picture
            picture
              source(media="(max-width: 480px)" srcset="../assets/resinplatte_256w.webp")
              source(media="(max-width: 480px)" srcset="../assets/resinplatte_256w.jpg")
              source(media="(max-width: 960px)" srcset="../assets/resinplatte_512w.webp")
              source(media="(max-width: 960px)" srcset="../assets/resinplatte_512w.jpg")
              source(media="(min-width: 961px)" srcset="../assets/resinplatte_1024w.webp")
              source(media="(min-width: 961px)" srcset="../assets/resinplatte_1024w.jpg")
              img(src="../assets/resinplatte_1024w.jpg" alt="Resinplatte")
          .text
            h2 Wie stemple ich am besten?
            p Herkömmliche Siegelstempel bestehen aus hitzeresistentem Material. Resin auch bekannt als Kunstharz kann meist Temperaturen von bis 260°C standhalten. Siegelwachs verflüssigt sich bei einer Temperatur von 140°C. 
            p Bei der Nutzung eines Siegelstempels aus PLA haben sich zwei Tipps für nützlich erwiesen:
            ol 
              li Stellt den Siegelstempel vor der Benutzung in Eiswasser 
              li Bestreicht die Siegelfläche vorm Stempel mit Vaseline oder Seife, damit sich das besser vom Siegelwachs entfernen lässt. 
            p Beim Siegeln erhitzt man das Wachs und tropft dieses auf die vorgesehene Stelle. Danach drückt man den Siegelstempel in das Wachs und lässt es drin stehen, bis das Wachs ausgehärtet ist.
            p Wenn ihr euren Siegelstempel ohne viel Materialverschwendung testen wollt, dann besorgt euch ein Knetradiergummi. Diesen findet ihr in den meisten Schreibwarengeschäften. Das Material kann man wieder verwenden und zeigt schnell, ob der Druck was geworden ist.
</template>