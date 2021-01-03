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

  @Component
  export default class Browse extends Page {
    public async mounted() {
      const data = await d3.csv(getSealBrowseCoordinatesUrl(), row => {
        return {
          /* cluster: row.cluster, */
          id: row.id,
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

      sealGroups
        .append("a")
          .attr("href", d => `/siegel.html?s=${d.id}`)
          .attr("target", "_blank")
        .append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", 2);

      function zoomed(e) {
        const transform = e.transform;

        const newScaleX = transform.rescaleX(scaleX.copy());
        const newScaleY = transform.rescaleY(scaleY.copy());

        sealGroups
            .attr("transform", d => `translate(${newScaleX(d.coord[0])} ${newScaleY(d.coord[1])})`)
      }

      zoomable.call(d3.zoom().extent([[0, 0], [500, 500]]).on("zoom", zoomed));
    }
  }
</script>

<style lang="sass" scoped>

</style>
