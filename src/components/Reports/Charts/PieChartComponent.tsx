// @ts-nocheck
"use client";
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

interface PieChartComponentProps {}

const PieChartComponent: FC<PieChartComponentProps> = ({}) => {
  const ref = useRef();
  // const maxWidth = 900;
  const maxWidth = 400;
  const maxHeight = 400;
  const margin = { top: 30, right: 30, bottom: 70, left: 60 };

  const getAngle = (rad: number) =>
    parseFloat((rad * (180 / Math.PI)).toFixed(2));
  const getRadAngle = (angle: number) => angle * (Math.PI / 180);
  const thresholdAngle = 20;
  const padding = 50;

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
    { name: "Amazon", value: 115, color: "#44C1D5" },
    { name: "Flipkart", value: 61, color: "#F8A55B" },
    { name: "Shopify", value: 52207, color: "#F0627B" },
    { name: "Nykaa", value: 607, color: "#F8A55B" },
    { name: "Myntra PPMP", value: 28690, color: "#8186EA" },
    { name: "Tata Cliq", value: 31, color: "#F25B81" },
    { name: "Manual", value: 0, color: "#E4D453" },
    { name: "Custom", value: 148, color: "#289190" },
  ];

  const totalValue = data.reduce((acc, d) => acc + d.value, 0);

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
    svg
      .attr("width", "100%") // Responsive width
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`) // Maintain aspect ratio
      .attr("preserveAspectRatio", "xMidYMid meet"); // Center alignment

    // Create the color scale.
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(data.map((d) => d.color));

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const labelRadius = arc.outerRadius()() * 1.5;
    // const labelRadius = arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    const centerX = width * 0.5;
    const centerY = height * 0.5;

    const pieGroup = svg
      .append("g")
      .attr("transform", `translate(${centerX}, ${centerY})`);
    // Create the SVG container.
    const angleArr: number[] = [];

    // Add a sector path for each value.
    pieGroup
      .selectAll()
      .data(arcs)
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);

    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    pieGroup
      // .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
      .attr("font-size", "10px")
      .attr("transform", (d) => {
        let [x, y] = arcLabel.centroid(d);
        let radAngle = (d.startAngle + d.endAngle) / 2;
        let angle = getAngle(radAngle);

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
        }
        if (angle >= 20 && angle < 40) {
          yoffset = 30;
          xoffset = -20;
        } else if (angle >= 40 && angle <= 180) {
          xoffset = -40;
        } else if (angle > 220 && angle < 300) {
          xoffset = -30;
        }
        // else if (angle > 180 && angle < 220) {
        //   // xoffset = -10;
        // }

        angleArr.push(angle);
        return `translate(${x + xoffset}, ${y + yoffset})`;
      })
      // .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          // .attr("font-weight", "bold")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          // .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
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
      <div className="flex justify-center items-center mb-10">
        <div>
          <div className="w-full  grid grid-cols-4 gap-2 text-sm ml-10">
            {data
              .filter((_, index) => index < 4)
              .map((item, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <div
                    className="w-2 h-2 flex items-center justify-center"
                    style={{ background: item.color }}
                  ></div>
                  <div>{item.name}</div>
                </div>
              ))}
          </div>
          <div className="w-full grid grid-cols-4 gap-2 text-sm ml-10">
            {data
              .filter((_, index) => index >= 4)
              .map((item, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <div
                    className="w-2 h-2 flex items-center justify-center"
                    style={{ background: item.color }}
                  ></div>
                  <div>{item.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <div className="w-[80%]  grid grid-cols-4 gap-2 text-sm ml-10">
        {data
        .filter((item, index) => index < 4)
        .map((item, index) => (
          <div className="flex items-center gap-2" key={index}>
            <div
              className="w-2 h-2 flex items-center justify-center"
              style={{ background: item.color }}
            ></div>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <div className="w-[80%] grid grid-cols-4 gap-2 text-sm ml-10">
        {data
        .filter((item, index) => index >= 4)
        .map((item, index) => (
          <div className="flex items-center gap-2" key={index}>
            <div
              className="w-2 h-2 flex items-center justify-center"
              style={{ background: item.color }}
            ></div>
            <div>{item.name}</div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default PieChartComponent;
