"use client";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

interface DonutChartComponentsProps {}

const DonutChartComponents: FC<DonutChartComponentsProps> = ({}) => {
  const ref = useRef();
  const maxWidth = 900;
  const maxHeight = 400;
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };

  const padding = 80;

  // const data = [
  //   { name: "<5", value: 19912018 },
  //   { name: "5-9", value: 20501982 },
  //   { name: "10-14", value: 20679786 },
  //   { name: "15-19", value: 21354481 },
  //   { name: "20-24", value: 22604232 },
  //   { name: "25-29", value: 21698010 },
  //   { name: "30-34", value: 21183639 },
  //   { name: "35-39", value: 19855782 },
  //   { name: "40-44", value: 20796128 },
  //   { name: "45-49", value: 21370368 },
  //   { name: "50-54", value: 22525490 },
  //   { name: "55-59", value: 21001947 },
  //   { name: "60-64", value: 18415681 },
  //   { name: "65-69", value: 14547446 },
  //   { name: "70-74", value: 10587721 },
  //   { name: "75-79", value: 7730129 },
  //   { name: "80-84", value: 5811429 },
  //   { name: "≥85", value: 5938752 },
  // ];

  const data = [
    { name: "1 - 2 Days", value: 18589, percentage: 47.2 },
    { name: "3 - 4 Days", value: 18248, percentage: 46.3 },
    { name: "5 Days", value: 1476, percentage: 3.7 },
    { name: ">5 Days", value: 1103, percentage: 2.8 },
  ];

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  const runChart = () => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    // const width =      svg.node().parentNode.clientWidth - margin.left - margin.right - 90;
    const height = maxHeight - margin.top - margin.bottom;
    const width = maxWidth - margin.left - margin.right;
    const radius = Math.min(width, height) / 2;

    // const svg = d3
    // .select(ref.current)
    // .attr("width", width)
    // .attr("height", height)
    svg
      // .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("viewBox", [
        -width / 2 - padding,
        -height / 2 - padding,
        width + 2 * padding,
        height + 2 * padding,
      ])
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

    const arc = d3
      .arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const arcLabel2 = d3
      .arc()
      .innerRadius(radius * 1)
      .outerRadius(radius - 1);

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

    const labelRadius = arc.outerRadius()() * 1.4;
    // const labelRadius = arc.outerRadius()() *0.8

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    // const pieData = d3.pie()(data); // Assuming 'data' is your dataset

    // const angles = pieData.map((d) => ({
    //   startAngle: d.startAngle,
    //   endAngle: d.endAngle,
    //   midAngle: (d.startAngle + d.endAngle) / 2,
    // }));

    // const labelPositions = angles.map((angle) => ({
    //   x: radius * Math.cos(angle.midAngle),
    //   y: radius * Math.sin(angle.midAngle),
    // }));

    // function isOverlapping(pos1, pos2, threshold = 20) {
    //   const distance = Math.sqrt(
    //     (pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2
    //   );
    //   return distance < threshold;
    // }

    // const adjustedPositions = [...labelPositions];

    // for (let i = 0; i < adjustedPositions.length; i++) {
    //   for (let j = i + 1; j < adjustedPositions.length; j++) {
    //     if (isOverlapping(adjustedPositions[i], adjustedPositions[j])) {
    //       // Move the label away from the center
    //       adjustedPositions[j].x += 20; // Adjust the distance as needed
    //       adjustedPositions[j].y += 20; // Adjust the distance as needed
    //     }
    //   }
    // }

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
      .selectAll("polyline")
      .data(arcs)
      .join("polyline")
      .attr("points", function (d) {
        const posA = arc.centroid(d); // Line from arc to label
        const posB = arcLabel.centroid(d);
        return [posA, posB];
      })
      .style("fill", "none")
      .style("stroke", "black")
      .style("stroke-width", 1);

    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      // .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .attr("transform", (d) => {
        const [x, y] = arcLabel.centroid(d);
        const offset = d.startAngle > Math.PI ? -15 : 15; // Adjust offset based on position
        return `translate(${x + offset}, ${y + offset})`;
      })
      // .attr("transform", (d) => {
      //   // Calculate the centroid of each arc and move the label outward
      //   const [x, y] = arcLabel.centroid(d);
      //   const offset = -50; // Adjust this value to move the labels farther out
      //   const radAngle = (d.startAngle + d.endAngle) / 2; // Calculate the angle of the arc

      //   const getAngle = (angle: number) => angle * (180 / Math.PI);

      //   const angle = getAngle(radAngle);
      //   const xOffset = Math.cos(radAngle) * offset;
      //   const yOffset = Math.sin(radAngle) * offset;
      //   console.log("xOffset", xOffset, x + xOffset);
      //   console.log("yOffset", yOffset, y + yOffset);
      //   console.log(
      //     "angle",
      //     radAngle.toFixed(2),
      //     angle.toFixed(2),
      //     d.data.name
      //   );
      //   // console.log(
      //   //   "start angle",
      //   //   d.startAngle.toFixed(2),
      //   //   getAngle(d.startAngle).toFixed(2)
      //   // );
      //   return `translate(${x + xOffset + 50}, ${y + yOffset})`;
      // })
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .attr("font-size", "12px")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          // .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          // .attr("fill-opacity", 0.7)
          .attr("font-size", "12px")
          .text(
            (d) =>
              d.data.value.toLocaleString("en-US") +
              " (" +
              ((d.data.value * 100.0) / totalValue).toFixed(2) +
              "%)"
          )
      );

  };

  useEffect(() => {
    runChart();
  }, []);

  return (
    <div className="w-full p-5">
      <svg
        // @ts-ignore
        ref={ref}
        style={{ width: "100%", height: maxHeight }}
        id="piechart"
      />
    </div>
  );
};

export default DonutChartComponents;
