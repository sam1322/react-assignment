"use client";
import { FC, use, useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartComponentProps {}

const PieChartComponent: FC<PieChartComponentProps> = ({}) => {
  const ref = useRef();
  const maxWidth = 900;
  const maxHeight = 600;
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };

  const padding = 30;

  const data = [
    { name: "<5", value: 19912018 },
    { name: "5-9", value: 20501982 },
    { name: "10-14", value: 20679786 },
    { name: "15-19", value: 21354481 },
    { name: "20-24", value: 22604232 },
    { name: "25-29", value: 21698010 },
    { name: "30-34", value: 21183639 },
    { name: "35-39", value: 19855782 },
    { name: "40-44", value: 20796128 },
    { name: "45-49", value: 21370368 },
    { name: "50-54", value: 22525490 },
    { name: "55-59", value: 21001947 },
    { name: "60-64", value: 18415681 },
    { name: "65-69", value: 14547446 },
    { name: "70-74", value: 10587721 },
    { name: "75-79", value: 7730129 },
    { name: "80-84", value: 5811429 },
    { name: "≥85", value: 5938752 },
  ];

  const runChart = () => {
    const svg = d3.select(ref.current);
    // const width =      svg.node().parentNode.clientWidth - margin.left - margin.right - 90;
    const height = maxHeight - margin.top - margin.bottom;
    const width = maxWidth - margin.left - margin.right;

    // const svg = d3
    // .select(ref.current)
    // .attr("width", width)
    // .attr("height", height)
    svg
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // svg
    //   .attr(
    //     "viewBox",
    //     `0 0 ${width + margin.left + margin.right} ${
    //       height + margin.top + margin.bottom
    //     }`
    //   )
    //   .attr("preserveAspectRatio", "xMidYMid meet");

    // Create the color scale.
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const labelRadius = arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    // Create the SVG container.

    // Add a sector path for each value.
    svg
      .append("g")
      .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text((d) => d.data.value.toLocaleString("en-US"))
      );
  };

  useEffect(() => {
    runChart();
  }, []);

  return (
    <>
      <svg
        // @ts-ignore
        ref={ref}
        style={{ width: "100%", height: maxHeight }}
        id="piechart"
      />
    </>
  );
};

export default PieChartComponent;
