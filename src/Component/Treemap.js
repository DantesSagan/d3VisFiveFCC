/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

import { treemap } from 'd3-hierarchy';
import * as d3 from 'd3';

import React from 'react';

export default function Treemap({ width, height }) {
  const [kickStarterPledges] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'
  );
  const [movieSales] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
  );
  const [videoGameSales] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
  );
  const svgRef = useRef(null);
  let dataKickStarter;

  const drawTreeMap = () => {
    const root = d3
      .hierarchy(dataKickStarter)
      .sum((item) => item.value)
      .sort((a, b) => b.value - a.value);

    const svg = d3.select(svgRef.current);
    svg.attr('width', width).attr('height', height);

    const treeMapRoot = treemap().size([width, height]).padding(1)(root);

    const nodes = svg
      .selectAll('g')
      .data(treeMapRoot.leaves())
      .join('g')
      .attr('transform', (item) => `translate (${item.x0},${item.y0})`);
    console.log(treeMapRoot.leaves());
    const fader = (color) => d3.interpolateRgb(color, '#fff')(0.3);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    nodes
      .append('rect')
      .attr('class', 'tile')
      .attr('data-name', (item) => item.data.name)
      .attr('data-category', (item) => item.data.category)
      .attr('data-value', (item) => item.data.value)
      .attr('width', (item) => item.x1 - item.x0)
      .attr('height', (item) => item.x1 - item.x0)
      .attr('fill', (item) => colorScale(item.data.category));

    const innerText = nodes
      .append('text')
      .attr('class', 'text')
      .attr('x', 3)
      .attr('y', 12)
      .text((item) => `${item.data.name} `)
      .attr('font-size', '0.7em');
    return { treeMapRoot, innerText };
  };

  //   const renderTreeMap = () => {
  //     const nodes = svg.selectAll;
  //   };

  useEffect(() => {
    d3.json(kickStarterPledges).then((data, error) => {
      if (error) {
      } else {
        dataKickStarter = data;
        // Need to add this to the value for cut to 4 numbers .toFixed(4)
        console.log(dataKickStarter);
        drawTreeMap();
      }
    });
  }, [dataKickStarter]);
  return (
    <div style={{ marginBottom: '2em' }}>
      <h1 id='title'>Visualize Data with a Treemap Diagram</h1>
      <div id='description'>
        <p>KickStarterDledges</p>
        <p>MoviesSales</p>
        <p>VideoGamesSales</p>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}
