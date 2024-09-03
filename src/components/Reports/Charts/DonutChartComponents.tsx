"use client";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { InfoIcon } from "lucide-react";

interface DonutChartComponentsProps {}

const DonutChartComponents: FC<DonutChartComponentsProps> = ({}) => {
  const ref = useRef();
  // const maxWidth = 900;
  const maxHeight = 300;
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };

  const padding = 50;

  const getAngle = (rad: number) => rad * (180 / Math.PI);
  const getRadAngle = (angle: number) => angle * (Math.PI / 180);

  const data = [
    { name: "1 - 2 Days", value: 18589, label: 2, color: "#44C1D5" },
    { name: "3 - 4 Days", value: 18248, label: 3, color: "#82A7C2" },
    { name: "5 Days", value: 1476, label: 5, color: "#F0627B" },
    { name: ">5 Days", value: 1103, label: 7, color: "#F8A55B" },
  ];

  const totalValue = data.reduce((acc, cur) => acc + cur.value, 0);

  const runChart = () => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width =
      svg.node().parentNode.clientWidth - margin.left - margin.right - 90;
    // const width = maxWidth - margin.left - margin.right;
    const height = maxHeight - margin.top - margin.bottom;
    // const radius = Math.min(width, height) / 2;
    const radius = Math.max(200, Math.min(300, Math.min(width, height))) / 2;
    const thresholdAngle = 20;

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

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      // .range(
      //   d3
      //     .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
      //     .reverse()
      // );
      // .range([
      //   "#44C1D5", // Color for the first data point
      //   "#82A7C2", // Color for the second data point
      //   "#F0627B", // Color for the third data point
      //   "#F8A55B", // Color for the fourth data point
      // ]);

      .range(data.map((d) => d.color));

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const labelRadius = arc.outerRadius()() * 1.5;
    // const labelRadius = arc.outerRadius()() *0.8

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

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
    // svg
    //   .append("g")
    //   .selectAll("polyline")
    //   .data(arcs)
    //   .join("polyline")
    //   .attr("points", function (d) {
    //     const posA = arc.centroid(d); // Line from arc to label
    //     const posB = arcLabel.centroid(d);
    //     return [posA, posB];
    //   })
    //   .style("fill", "none")
    //   .style("stroke", "black")
    //   .style("stroke-width", 1);

    const angleArr: number[] = [];

    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("font-size", "10px")
      .attr("transform", (d) => {
        let [x, y] = arcLabel.centroid(d);
        let radAngle = (d.startAngle + d.endAngle) / 2;
        let angle = getAngle(radAngle);

        for (let i = 0; i < angleArr.length; i++) {
          if (Math.abs(angle - angleArr[i]) < thresholdAngle) {
            angle += 20;
            x = labelRadius * Math.cos(radAngle);
            y = labelRadius * Math.sin(radAngle);
          }
        }

        const newRadAngle = getRadAngle(angle - 90);

        x = labelRadius * Math.cos(newRadAngle);
        y = labelRadius * Math.sin(newRadAngle);

        let offset = 0;
        if (angle > 300 || angle < 60) {
          offset = 30;
        } else {
          offset = 10;
        }

        angleArr.push(angle);
        // const offset = d.startAngle > Math.PI ? -15 : 15; // Adjust offset based on position
        return `translate(${x + offset}, ${y + offset})`;
      })
      // .attr("transform", (d) => {
      //   // Calculate the centroid of each arc and move the label outward
      //   const [x, y] = arcLabel.centroid(d);
      //   const offset = -50; // Adjust this value to move the labels farther out
      //   const radAngle = (d.startAngle + d.endAngle) / 2; // Calculate the angle of the arc

      //   const angle = getAngle(radAngle);

      //   let xNew = x;
      //   let yNew = y;

      //   // for (let i = 0; i < angleArr.length; i++) {
      //   //   if (Math.abs(angle - angleArr[i]) < thresholdAngle) {
      //   //     angle += 10;
      //   //   }
      //   // }

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
      //   // return `translate(${x + xOffset + 50}, ${y + yOffset})`;

      //   return `translate(${xNew}, ${yNew})`;
      // })
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          // .attr("font-weight", "bold")
          // .attr("font-size", "12px")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          // .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          // .attr("fill-opacity", 0.7)
          // .attr("font-size", "12px")
          .text(
            (d) =>
              d.data.value.toLocaleString("en-US") +
              " (" +
              ((d.data.value * 100.0) / totalValue).toFixed(2) +
              "%)"
          )
      );

    let totalDays = data.reduce((acc, cur) => acc + cur.value, 0);

    let averageValue =
      data.reduce((acc, cur) => acc + cur.value * cur.label, 0) / totalDays;

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle") // Center vertically
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .attr("fill", "#004B84")
      .text(averageValue.toFixed(1)) // Display average with 2 decimal places
      .call((text) =>
        text
          .append("tspan")
          .attr("x", 0)
          .attr("y", "1.5em")
          .attr("font-size", "12px")
          .text("Average Value")
      );
  };

  useEffect(() => {
    runChart();
  }, []);

  return (
    <div className="relative">
      <svg
        // @ts-ignore
        ref={ref}
        style={{ width: "100%", height: maxHeight }}
        id="piechart"
      />
      <div className="w-full flex flex-col gap-4 justify-center items-center relative -top-5">
        <div className="w-full flex justify-center items-center text-sm gap-6  ">
          {data.map((item) => (
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 flex items-center justify-center"
                style={{ background: item.color }}
              ></div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center ">
          <div className="bg-[#004B84] text-white text-sm flex items-center py-2 px-4 rounded-full">
            <InfoIcon size={25} fill="#fff" stroke="#004B84" />
            <span className="text-md font-semibold ml-2 mr-1">47.2%</span>
            of your orders are delivered in 1-2 days
          </div>
        </div>
      </div>
      {/* <div className="w-full ">
        <div className="w-full flex justify-center items-center text-sm gap-6 absolute bottom-10  ">
          {data.map((item) => (
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 flex items-center justify-center"
                style={{ background: item.color }}
              ></div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center ">
          <div className="bg-[#004B84] text-white text-sm flex items-center py-2 px-4 rounded-full">
            <InfoIcon size={25} fill="#fff" stroke="#004B84" />
            <span className="text-md font-semibold ml-2 mr-1">47.2%</span>
            of your orders are delivered in 1-2 days
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DonutChartComponents;
