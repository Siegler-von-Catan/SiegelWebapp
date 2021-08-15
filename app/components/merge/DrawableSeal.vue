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
  div
    canvas#drawable-seal
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {fabric} from "fabric";
import {FabricSealElement, SealElement} from "../../data/SealElement";

@Component
export default class DrawableSeal extends Vue {
  private canvas: fabric.Canvas;

  private mounted() {
    this.canvas = new fabric.Canvas("drawable-seal", {width: 500, height: 500});

    const bg = new fabric.Circle({left: 0, top: 0, fill: "red", radius: 250, selectable: false});
    this.canvas.add(bg);
  }

  public placeElement(element: SealElement) {
    const img = document.createElement("img") as HTMLImageElement;
    img.src = element.preRendered;
    document.getElementById("drawable-seal")?.append(img);

    const imgElement = new fabric.Image(img, {left: 250, top: 250}) as FabricSealElement;
    imgElement.sealElement = element;
    this.canvas.add(imgElement);
  }

  public getSerializedElements(): object {
    const objects = this.canvas.getObjects("image").map(obj => ({
      sealElementId: (obj as FabricSealElement).sealElement.id,
      ...obj.toJSON()
    }));

    return {
      width: this.canvas.width,
      height: this.canvas.height,
      objects
    };
  }
}
</script>
