"use client";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
import { InfoIcon } from "lucide-react";

interface DonutChartComponentsProps {}

const DonutChartComponents: FC<DonutChartComponentsProps> = ({}) => {
  const ref = useRef();
  // const maxWidth = 900;
  // const maxHeight = 400;
  const maxWidth = 400;
  const maxHeight = 400;
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const thresholdAngle = 20;

  const padding = 30;

  const getAngle = (rad: number) => rad * (180 / Math.PI);
  const getRadAngle = (angle: number) => angle * (Math.PI / 180);
  const checkAngle = (angle: number, angleArr: number[]) => {
    let minDiff = Infinity;
    let count = 0;

    angleArr.forEach((usedAngle: number) => {
      // Calculate the direct difference
      let diff = Math.abs(angle - usedAngle);
      // Calculate the difference wrapping around the circle
      let wrapDiff = 360 - diff;
      // Take the smaller of the two differences
      let actualDiff = Math.min(diff, wrapDiff);

      if (actualDiff < minDiff) {
        minDiff = actualDiff;
      }
      if (actualDiff < thresholdAngle) {
        count++;
      }
    });

    return count;
  };
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
    // const width =
    // svg.node().parentNode.clientWidth - margin.left - margin.right - 90;
    const width = maxWidth - margin.left - margin.right;
    const height = maxHeight - margin.top - margin.bottom;
    // const radius = Math.min(width, height) / 2;
    const radius = 100;
    // console.log("radius", radius, width, height);

    const thresholdAngle = 20;
    svg
      .attr("width", "100%") // Responsive width
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`) // Maintain aspect ratio
      .attr("preserveAspectRatio", "xMidYMid meet"); // Center alignment

    const arc = d3
      .arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
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

    // const centerX = width * 0.55;
    // const centerY = height * 0.75;

    const centerX = width * 0.5;
    const centerY = height * 0.5;

    const pieGroup = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);
    // Add a sector path for each value.
    // svg
    pieGroup
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

    // svg
    pieGroup
      // .append("g")
      // .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("font-size", "10px")
      .attr("transform", (d) => {
        let [x, y] = arcLabel.centroid(d);
        let radAngle = (d.startAngle + d.endAngle) / 2;
        let angle = getAngle(radAngle);

        // for (let i = 0; i < angleArr.length; i++) {
        //   if (Math.abs(angle - angleArr[i]) < thresholdAngle) {
        //     angle += 20;
        //   }
        // }

        // Avoid overlap by checking proximity to other labels using the enhanced checkAngle function
        let f = checkAngle(angle, angleArr);
        if (f > 0) {
          angle += f * thresholdAngle; // Adjust the angle to avoid overlap
          angle %= 360; // Ensure angle is within 0-360 degrees
        }
        f = checkAngle(angle, angleArr);
        if (f > 0) {
          angle += f * thresholdAngle;
          angle %= 360;
        }
        f = checkAngle(angle, angleArr);
        if (f > 0) {
          angle += f * thresholdAngle;
          angle %= 360;
        }

        const newRadAngle = getRadAngle(angle - 90);

        x = labelRadius * Math.cos(newRadAngle);
        y = labelRadius * Math.sin(newRadAngle);

        let xoffset = 0,
          yoffset = 0;
        if (angle > 350 || angle < 20) {
          yoffset = 30;
          xoffset = -50;
        } else if (angle > 300 || angle < 40) {
          yoffset = 40;
          xoffset = -50;
        } else if (angle >= 40 && angle <= 180) {
          xoffset = -40;
        } else if (angle > 220 && angle < 300) {
          xoffset = -30;
        }
        // else if (angle > 180 && angle < 220) {
        //   // xoffset = -10;
        // }

        angleArr.push(angle);
        // const offset = d.startAngle > Math.PI ? -15 : 15; // Adjust offset based on position
        return `translate(${x + xoffset}, ${y + yoffset})`;
      })
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
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
  };

  useEffect(() => {
    runChart();
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
    </div>
  );
};

export default DonutChartComponents;
