/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

import { treemap } from 'd3-hierarchy';
import { pointer } from 'd3-selection';
import * as d3 from 'd3';

import React from 'react';

export default function TreemapMovieSales({ width, height }) {
  const [videoGameSales] = useState(
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
  );
  const svgRef = useRef(null);
  const legendRef = useRef(null);
  let dataGameSales;

  const drawTreeMap = () => {
    const root = d3
      .hierarchy(dataGameSales)
      .sum((item) => item.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    const svg = d3.select(svgRef.current);
    svg.attr('width', width).attr('height', height);
    svg.selectAll('g').remove();

    const treeMapRoot = treemap().size([width, height]).padding(1)(root);

    const nodes = svg
      .selectAll('g')
      .data(treeMapRoot.leaves())
      .join('g')
      .attr('transform', (item) => `translate (${item.x0},${item.y0})`);

    console.log(treeMapRoot.leaves());

    const fader = (color) => d3.interpolateRgb(color, '#fff')(0.2);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    // const validNumber = (num) => {
    //   return num.toString().replace(/(?=\d)(?=(\d{3})+(?!\d))/g, ' ');
    // };
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('visibility', 'hidden');

    nodes
      .append('rect')
      .attr('class', 'tile')
      .attr('data-name', (item) => item.data.name)
      .attr('data-category', (item) => item.data.category)
      .attr('data-value', (item) => item.data.value)
      .attr('width', (item) => item.x1 - item.x0 - 0)
      .attr('height', (item) => item.y1 - item.y0 - 0)
      .attr('fill', (item) => colorScale(item.data.category))
      .on('mousemove', (event, item) => {
        const [x, y] = pointer(event);

        tooltip
          .transition()
          .duration(200)
          .style('visibility', 'visible')
          .attr('data-value', item.data.value);

        tooltip
          .style('left', x + item.x1 + 250 + 'px')
          .style('top', y + item.y0 + 450 + 'px')
          .style('position', 'absolute')
          .style('display', 'inline-block')
          .html(
            `Name: ${item.data.name} <br /> Value: ${Math.round(
              item.data.value
            )} <br /> Category: ${item.data.category}`
          );
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('visibility', 'hidden');
      });

    const innerText = nodes
      .append('text')
      .attr('class', 'text')
      .attr('x', 3)
      .attr('y', 12)
      .text((item) => `${item.data.name}`)
      .attr('font-size', '0.7em');

    const legendContainer = d3.select(legendRef.current);

    legendContainer.selectAll('g').remove();

    let categories = root.leaves().map((item) => item.data.category);

    categories = categories.filter(
      (category, index, self) => self.indexOf(category) === index
    );
    legendContainer.attr('width', width).attr('height', height - 300);

    const legend = legendContainer
      .selectAll('g')
      .data(categories)
      .join('g')
      .attr('id', 'legend');

    legend
      .append('rect')
      .attr('width', 12)
      .attr('height', 12)
      .attr('x', 12)
      .attr('y', (item, i) => 12 * 2 * i)
      .attr('class', 'legend-item')
      .attr('fill', (item) => colorScale(item));

    legend
      .append('text')
      .attr('transform', `translate(0, ${12})`)
      .attr('x', 12 * 3)
      .attr('y', (_, i) => 12 * 2 * i)
      .style('font-size', 12)
      .text((item) => item);
    return { treeMapRoot, innerText };
  };

  useEffect(() => {
    d3.json(videoGameSales).then((data, error) => {
      if (error) {
      } else {
        dataGameSales = data;
        // Need to add this to the value for cut to 4 numbers .toFixed(4)
        console.log(dataGameSales);
        drawTreeMap();
      }
    });
  }, [dataGameSales]);
  return (
    <div className='border-4 border-red-600 mt-6 rounded-b-lg mb-6'>
      <h1 id='title' className='text-5xl p-4 font-bold mt-6'>
        Visualize Data with a Treemap Diagram
      </h1>
      <div id='description' className='text-3xl p-4 font-bold'>
        <p>GameSales</p>
      </div>
      <svg ref={svgRef} className='m-6 '></svg>
      <h2>Legend by category</h2>
      <svg ref={legendRef}></svg>
    </div>
  );
}
