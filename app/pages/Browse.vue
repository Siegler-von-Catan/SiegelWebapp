<template lang="pug">
  extends page

  block content
    h1 Browse
    svg(width="500" height="500" viewbox="0 0 500 500")
      rect(width="500" height="500" fill="none" stroke="black")
      g(id="zoomable")
        rect(width="500" height="500" opacity="0%")
        g(id="seals")
</template>

<script lang="ts">
  import Page from './Page';
  import Component from 'vue-class-component';
  import * as d3 from "d3";
  import {getSealBrowseCoordinatesUrl} from '../util/api';

  const thumbnailWidth = 20;
  const thumbnailHeight = thumbnailWidth;

  let prevK = null;

  @Component
  export default class Browse extends Page {

    public async mounted() {
      const data = await d3.csv(getSealBrowseCoordinatesUrl(), row => {
        return {
          /* cluster: row.cluster, */
          id: row.id,
          record_id: row.record_id,
          coord: [Number(row.x), Number(row.y)],
        }
      });

      const extentX = d3.extent(data.map(row => row.coord[0]));
      const extentY = d3.extent(data.map(row => row.coord[1]));

      const scaleX = d3.scaleLinear().domain(extentX).range([0, 500]);
      const scaleY = d3.scaleLinear().domain(extentY).range([0, 500]);

      const zoomable = d3.select("#zoomable");

      const sealGroups = zoomable.select("#seals")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
          .attr("transform", d => `translate(${scaleX(d.coord[0])} ${scaleY(d.coord[1])})`);

      const links = sealGroups
        .append("a")
          .attr("href", d => `/siegel.html?s=${d.id}`)
          .attr("target", "_blank");

      const images = links.append("image")
          .attr("href", d => `http://localhost:8080/staticBrowse/thumbnails/record_kuniweb_${d.record_id}-img.jpg`)
          .attr("x", -thumbnailWidth / 2)
          .attr("y", -thumbnailHeight / 2)
          .attr("width", thumbnailWidth)
          .attr("height", thumbnailHeight);

      function zoomed(e) {
        const transform = e.transform;

        const newScaleX = transform.rescaleX(scaleX.copy());
        const newScaleY = transform.rescaleY(scaleY.copy());

        sealGroups
            .attr("transform", d => `translate(${newScaleX(d.coord[0])} ${newScaleY(d.coord[1])})`);

        if (transform.k !== prevK) {
          prevK = transform.k;
          images
            .attr("width", thumbnailWidth * transform.k)
            .attr("height", thumbnailHeight * transform.k);
        }
      }

      zoomable.call(d3.zoom().extent([[0, 0], [500, 500]]).scaleExtent([1, 4]).on("zoom", zoomed));
    }
  }
</script>

<style lang="sass" scoped>

</style>
