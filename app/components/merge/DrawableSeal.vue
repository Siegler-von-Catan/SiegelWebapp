<template lang="pug">
canvas#drawable-seal

</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import {fabric} from "fabric";
import {SealElement} from "./SealElement";

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

    const imgElement = new fabric.Image(img, {left: 250, top: 250});
    this.canvas.add(imgElement);
  }
}
</script>
