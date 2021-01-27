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
    link(rel="stylesheet" href="./browse.sass")
    h1(style="position: absolute; z-index: 1;") Browse
    #tooltip
      h3#tooltip-family family
      p Begriffe: 
        span#tooltip-tags placeholder
    #svg-container(style="position: relative; height: 85vh")
      svg(style="position: absolute" width="100%" height="100%" viewbox="0 0 500 500")
        //rect(width="500" height="500" fill="none" stroke="black")
        g(id="zoomable")
          rect#interaction-rect(width="500" height="500" opacity="0%")
          g(id="seals")
</template>

<script lang="ts">
  import Page from './Page';
  import Component from 'vue-class-component';
  import * as d3 from "d3";
  import {getSealBrowseCoordinatesUrl, getThumbnailUrl, getIdForRecordId} from '../util/api';

  const thumbnailWidth = 20;
  const thumbnailHeight = thumbnailWidth;

  let prevK = null;

  @Component
  export default class Browse extends Page {

    public async mounted() {
      const divBB = document.getElementById("svg-container").getBoundingClientRect();
      let width = divBB.width;
      let height = divBB.height;
      d3.select("svg")
          .attr("viewbox", `0 0 ${width} ${height}`);
      d3.select("#interaction-rect")
          .attr("width", width)
          .attr("height", height);

      window.onresize = function(e) {
        console.log(e);
      }

      const data = await d3.dsv(";", getSealBrowseCoordinatesUrl(), row => {
        return {
          tags: row.tags.replaceAll(",", ", "),
          family: row.family,
          id: row.id,
          record_id: row.record_id,
          coord: [Number(row.x), Number(row.y)],
        }
      });

      const extentX = d3.extent(data.map(row => row.coord[0]));
      const extentY = d3.extent(data.map(row => row.coord[1]));

      const sideLength = Math.min(width, height);
      const scaleX = d3.scaleLinear().domain(extentX).range([sideLength == width ? 0 : (width - sideLength) / 2, (width - sideLength) / 2 + sideLength]);
      const scaleY = d3.scaleLinear().domain(extentY).range([sideLength == height ? 0 : (height - sideLength) / 2,(height - sideLength) / 2 + sideLength]);

      const zoomable = d3.select("#zoomable");

      const sealGroups = zoomable.select("#seals")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
          .attr("transform", d => `translate(${scaleX(d.coord[0])} ${scaleY(d.coord[1])})`);

      const links = sealGroups
        .append("a")
          /* .attr("href", async (d) => { */
              /* const id = await getIdForRecordId(d.record_id); */
              /* return `/siegel.html?s=${id}`; */
            /* }) */
          .attr("target", "_blank")
          .each(async function(d) {
            const id = await getIdForRecordId(d.record_id);
            d3.select(this).attr("href", `/siegel.html?s=${id}`);
          });

      links.append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", 5)
          .attr("fill", "darkred");

      d3.select("#interaction-rect")
        .on("mouseover", () => {
            tooltip.style("visibility", "hidden");
          });

      const tooltip = d3.select("#tooltip");
      const tooltipFamily = d3.select("#tooltip-family")
      const tooltipTags = d3.select("#tooltip-tags")

      const images = links.append("image")
          .attr("href", d => getThumbnailUrl(d.record_id, 100))
          .attr("x", -thumbnailWidth / 2)
          .attr("y", -thumbnailHeight / 2)
          .attr("width", thumbnailWidth)
          .attr("height", thumbnailHeight)
          .on("mouseover", e => {
              d3.select(e.target.parentNode.parentNode).raise();
              const d = d3.select(e.target).data()[0];
              tooltipFamily.text(d.family);
              tooltipTags.text(d.tags);
              tooltip.style("visibility", "visible");
            });

      const svgOffset = d3.select("svg").node().getBoundingClientRect().top;
      const pointerOffset = 20;
      console.log(svgOffset)
      d3.select("body").on("mousemove", e => {
        tooltip
            .style("transform", `translate(${e.clientX + pointerOffset}px, ${e.clientY - svgOffset + pointerOffset}px)`);
      });

      function getSize(k) {
          if (k > 2) return 100;
          return 50;
      }

      function zoomed(e) {
          zoomable.attr("transform", e.transform);

          if (e.transform.k !== prevK && ((prevK < 3 && e.transform.k>3) || (prevK > 3 && e.transform.k<3)) ) {
              prevK = e.transform.k;
              images.attr("href", d => getThumbnailUrl(d.record_id, getSize(e.transform.k)));
          }
      }

      zoomable.call(d3.zoom().extent([[0, 0], [width, height]]).scaleExtent([1, 8]).on("zoom", zoomed));
    }
  }
</script>

<style lang="sass" scoped>

</style>
