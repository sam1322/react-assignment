// @ts-nocheck
"use client";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { InfoIcon } from "lucide-react";

interface ZonePieChartProps {}
const data = [
  { name: "A + B", value: 14710, color: "#DEF3F0", label: "Zone A + Zone B" },
  { name: "C", value: 22286, color: "#F0627B", label: "Zone C" },
  { name: "D", value: 14061, color: "#F8A55B", label: "Zone D" },
  { name: "E", value: 1037, color: "#B5E0FD", label: "Zone E" },
];

const barData = [
  { name: "B", value: 6716, color: "#82A7C2", label: "Zone B" },
  { name: "A", value: 7994, color: "#44C1D5", label: "Zone A" },
];

const barData1 = [
  { name: "A", value: 7994, color: "#44C1D5", label: "Zone A" },
  { name: "B", value: 6716, color: "#82A7C2", label: "Zone B" },
];

const ZonePieChart: FC<ZonePieChartProps> = ({}) => {
  const ref = useRef();
  const maxWidth = 400;
  const maxHeight = 400;
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };

  const padding = 30;

  //   const color = d3
  //     .scaleOrdinal()
  //     .domain(data.map((d) => d.name))
  //     .range(["#e0f7f7", "#ff6f61", "#ffcc80", "#cfe1ff"]);

  const getAngle = (rad: number) => rad * (180 / Math.PI);
  const getRadAngle = (angle: number) => angle * (Math.PI / 180);

  const runBarChart2 = () => {
    // Set up dimensions
    // const svgWidth = 800;
    // const svgHeight = 600;
    // const pieRadius = 100;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    // const width = svg.node().parentNode.clientWidth /2 ;
    // const width = svg.node().parentNode.clientWidth - margin.left - margin.right;
    const width = maxWidth - margin.left - margin.right;
    const height = maxHeight - margin.top - margin.bottom;
    console.log("width", width, height);

    // const radius = Math.min(width, height) / 2;
    // const radius = Math.min(width*0.75, 400) / 2;
    const radius = Math.max(200, Math.min(200, Math.min(width, height))) / 2;

    const barWidth = 45;
    const padding = 20;

    const totalValue = d3.sum(data, (d) => d.value);

    // Create the SVG canvas

    // const svg = d3.select("#chart")
    //   .append("svg")
    // svg.attr("width", svgWidth).attr("height", svgHeight);

    svg
      .attr("width", "100%") // Responsive width
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`) // Maintain aspect ratio
      .attr("preserveAspectRatio", "xMidYMid meet"); // Center alignment

    // Set up color scale
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      //   .range(["#e0f7f7", "#ff6f61", "#ffcc80", "#cfe1ff"]);
      .range(data.map((item) => item.color));

    // Set up color scale
    const color2 = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      //   .range(["#e0f7f7", "#ff6f61", "#ffcc80", "#cfe1ff"]);
      .range(barData.map((item) => item.color));

    // Calculate the center of the SVG
    const centerX = width / 3;
    const centerY = height / 2;
    // Create Pie Chart

    // Create Stacked Bar Chart
    const barGroup = svg
      .append("g")
      .attr(
        "transform",
        `translate(${2.3 * radius + 2 * padding}, ${height / 9})`
      );

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.sum(barData, (d) => d.value)])
      //   .range([height / 2, 0]);
      .range([height * 0.8, 0]);

    barGroup
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) =>
        yScale(d3.sum(barData.slice(0, i + 1), (s) => s.value))
      )
      .attr("width", barWidth)
      .attr("height", (d) => height * 0.8 - yScale(d.value))
      .attr("fill", (d) => color2(d.name));

    barGroup
      .selectAll("text")
      .data(barData)
      .enter()
      .append("text")
      .attr("x", barWidth / 2 + 27)
      .attr("font-size", "10px")
      .attr(
        "y",
        (d, i) => yScale(d3.sum(barData.slice(0, i + 1), (s) => s.value)) + 15
      )
      // .attr("text-anchor", "middle")
      .each(function (d) {
        const text = d3.select(this);

        text.append("tspan").text(d.name);

        text
          .append("tspan")
          .attr("x", barWidth / 2 + 27) // Align to the same x as the main text
          .attr("dy", "1.2em") // Move this line down
          .text(
            `${d.value.toLocaleString("en-US")} (${(
              (d.value * 100.0) /
              totalValue
            ).toFixed(2)}%)`
          );
      });

    const pieGroup = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);
    //   .attr("transform", `translate(${radius + padding}, ${height / 2})`);
    //   .attr(
    //     "transform",
    //     `translate(${pieRadius + padding}, ${svgHeight / 2}) rotate(20)`
    //   ); // Rotate by 90 degrees
    const rotationAngle = 30;
    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null)
      .startAngle(rotationAngle * (Math.PI / 180)) // Rotate the pie chart by the desired angle
      .endAngle((rotationAngle + 360) * (Math.PI / 180));

    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const arcLabel = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius * 2.5);

    const arcs = pie(data);

    pieGroup
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      //   .attr(
      //     "transform",
      //     `translate(${pieRadius + padding}, ${svgHeight / 2}) rotate(20)`
      //   )
      .attr("fill", (d) => color(d.data.name));

    // Add labels to pie chart
    pieGroup
      .selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .attr("dy", "0.2em")
      //   .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      //   .text((d) => `${d.data.name}`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.5em")
          // .attr("font-weight", "bold")
          // .attr("font-size", "12px")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          // .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.8em")
          .text(
            (d) =>
              d.data.value.toLocaleString("en-US") +
              " (" +
              ((d.data.value * 100.0) / totalValue).toFixed(2) +
              "%)"
          )
      );
    //   .call((text) =>
    //     text
    //     //   .filter((d) => d.endAngle - d.startAngle > 0.25)
    //       .append("tspan")
    //       .attr("x", 0)
    //       .attr("y", "0.7em")
    //       .attr("fill-opacity", 0.7)
    //       .text((d) => d.data.value.toLocaleString())
    //   ;
  };

  useEffect(() => {
    runBarChart2();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full relative ">
      <svg
        // @ts-ignore
        ref={ref}
        style={{ width: "100%", height: maxHeight }}
        id="piechart"
      />
      <div className="w-full flex flex-col gap-4 justify-center items-center relative -top-5">
        <div className="w-full flex justify-center items-center text-sm gap-6  ">
          {barData1.map((item) => (
            <div className="flex items-center gap-2" key={item.label}>
              <div
                className="w-2 h-2 flex items-center justify-center"
                style={{ background: item.color }}
              ></div>
              <div>{item.label}</div>
            </div>
          ))}

          {data.map((item) => (
            <div className="flex items-center gap-2" key={item.label}>
              <div
                className="w-2 h-2 flex items-center justify-center"
                style={{ background: item.color }}
              ></div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center ">
          <div className="bg-[#004B84] text-white text-sm flex items-center py-2 px-4 rounded-full">
            <InfoIcon size={25} fill="#fff" stroke="#004B84" />
            <span className="text-md font-semibold ml-2 mr-1">28.2%</span>
            of your orders are in short shipping range
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZonePieChart;
