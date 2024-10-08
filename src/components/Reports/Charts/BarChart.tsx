// @ts-nocheck
import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";
interface BarChartProps {}

const BarChart: FC<BarChartProps> = ({}) => {
  const ref = useRef();
  const maxWidth = 900;
  const maxHeight = 600;

  type BarChartData = {
    date: string;
    orders: number;
    revenue: number;
  };
  const data: BarChartData[] = [
    { date: "2024-04-15", orders: 1200, revenue: 24 },
    { date: "2024-04-16", orders: 1300, revenue: 26 },
    { date: "2024-04-17", orders: 1500, revenue: 30 },
    { date: "2024-04-18", orders: 1700, revenue: 34 },
    { date: "2024-04-19", orders: 3600, revenue: 72 },
    { date: "2024-04-20", orders: 3200, revenue: 68 },
    { date: "2024-04-21", orders: 3400, revenue: 64 },
    { date: "2024-04-22", orders: 2900, revenue: 58 },
    { date: "2024-04-23", orders: 2400, revenue: 48 },
    { date: "2024-04-24", orders: 2000, revenue: 40 },
    { date: "2024-04-25", orders: 1800, revenue: 36 },
    { date: "2024-04-26", orders: 1600, revenue: 32 },
    { date: "2024-04-27", orders: 1400, revenue: 28 },
    { date: "2024-04-28", orders: 1500, revenue: 30 },
    { date: "2024-04-29", orders: 1600, revenue: 32 },
    { date: "2024-04-30", orders: 1700, revenue: 34 },
    { date: "2024-05-01", orders: 1600, revenue: 36 },
    { date: "2024-05-02", orders: 1500, revenue: 38 },
    { date: "2024-05-03", orders: 1600, revenue: 40 },
    { date: "2024-05-04", orders: 1600, revenue: 42 },
    { date: "2024-05-05", orders: 1800, revenue: 44 },
    { date: "2024-05-06", orders: 1900, revenue: 46 },
    { date: "2024-05-07", orders: 2000, revenue: 48 },
    { date: "2024-05-08", orders: 1600, revenue: 50 },
    { date: "2024-05-09", orders: 1500, revenue: 52 },
    { date: "2024-05-10", orders: 1500, revenue: 54 },
    { date: "2024-05-11", orders: 1700, revenue: 56 },
    { date: "2024-05-12", orders: 1800, revenue: 58 },
    { date: "2024-05-13", orders: 1600, revenue: 60 },
    { date: "2024-05-14", orders: 1900, revenue: 62 },
    { date: "2024-05-15", orders: 2000, revenue: 64 },
  ];

  const rev = (d: BarChartData) => d.orders - 400;

  useEffect(() => {
    // @ts-ignore
    const svg = d3.select(ref?.current);

    const renderChart = (data: BarChartData[]) => {
      svg.selectAll("*").remove();

      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      //   const width = maxWidth - margin.left - margin.right;

      const width =
        // @ts-ignore
        svg.node()?.parentNode.clientWidth - margin.left - margin.right - 90;
      const height = maxHeight - margin.top - margin.bottom;
      const padding = 30;
      svg
        .attr(
          "viewBox",
          `0 0 ${width + margin.left + margin.right} ${
            height + margin.top + margin.bottom
          }`
        )
        .attr("preserveAspectRatio", "xMidYMid meet");

      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const getPadding = () => {
        const newPadding = padding / (width / data.length);
        if (newPadding > 0.6) return 0.4;
        return newPadding;
      };
      // X axis
      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(data?.map((d) => d.date))
        // .padding(0.2);
        // .padding(1);
        .padding(getPadding()); // Adjust padding for scale

      // console.log("padding", 0.2, padding / (width / data.length));

      // console.log("data", data);

      chartGroup
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr("class", "x-axis");

      // Add Y axis
      // const yScaleLeft = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      // svg.append("g").call(d3.axisLeft(yScaleLeft));

      // Secondary Y axis (Right)
      // const yScaleRight = d3
      //   .scaleLinear()
      //   .domain([0, d3.max(data, (d) => d.orders)])
      //   .nice()
      //   .range([height, 0]);

      const yScaleLeft = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.orders)])
        .nice()
        .range([height, 0]);

      chartGroup
        .append("g")
        .call(
          d3.axisLeft(yScaleLeft).tickFormat((y) => {
            if (y == 0) return 0;
            return y * 0.001 + " K";
            // return (y + 5500).toFixed();
          })
        )
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("x2", width)
            .attr("stroke-opacity", 0.1)
        );

      const yScaleRight = d3
        .scaleLinear()
        // .domain([0, d3.max(data, rev)])
        // @ts-ignore
        .domain([0, d3.max(data, (d) => d.orders)])
        // .domain([d3.min(data, (d) => rev(d)), d3.max(data, (d) => d.orders)])
        // .domain([0, d3.max(data, (d) => d.revenue)])
        .nice()
        .range([height, 0]);

      chartGroup
        .append("g")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(yScaleRight))
        .call(
          d3.axisRight(yScaleRight).tickFormat((y) => {
            if (y == 0) return 0;
            return y * 0.003 + " lac";
            // return (y + 5500).toFixed();
          })
        )
        .attr("class", "y-axis-right");

      // Line or points for the secondary y-axis
      const line = d3
        .line()
        .x((d) => xScale(d.date) + xScale.bandwidth() / 2)
        .y((d) => yScaleRight(rev(d)))
        .curve(d3.curveMonotoneX);
      // .curve(d3.curveBasis)
      chartGroup
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => xScale(d.date))
        .attr("y", (d) => yScaleLeft(d.orders))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScaleLeft(d.orders))
        .attr("fill", "#44C1D5");

      chartGroup
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#F8A55B")
        .attr("stroke-width", 2)
        .attr("d", line);

      // **Dots for Revenue**
      chartGroup
        .selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("cx", (d) => xScale(d.date) + xScale.bandwidth() / 2)
        .attr("cy", (d) => yScaleRight(rev(d)))
        .attr("r", 4)
        .attr("fill", "#F8A55B")
        .attr("stroke", "white")
        .attr("stroke-width", 2);

      // Bars

      // Add Y Axis label
      chartGroup
        .append("text")
        .attr("class", "y-axis-label")
        // .attr("text-anchor", "middle")
        .attr(
          "transform",
          `translate(${-margin.left / 2}, ${height / 2}) rotate(-90)`
        )
        .attr("y", -margin.left / 3)
        // .attr("x", -height / 2)
        .text("Orders")
        .style("font-size", "12px")
        .style("fill", "black");

      chartGroup
        .append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          `translate(${width + margin.right / 2}, ${height / 2}) rotate(90)`
        )
        .attr("y", -margin.right)
        .attr("x", -20)
        // .attr("x", -height / 2 )
        .text("Revenue")
        .style("font-size", "12px")
        .style("fill", "black");

      // Add X Axis label
      //   chartGroup
      //     .append("text")
      //     .attr("class", "x-axis-label")
      //     .attr("text-anchor", "middle")
      //     .attr(
      //       "transform",
      //       `translate(${width / 2}, ${height + margin.bottom - 10})`
      //     )
      //     .attr("y", 10)
      //     .text("X Axis Label")
      //     .style("font-size", "12px")
      //     .style("fill", "black");
    };
    // );

    renderChart(data);

    // Re-render on window resize
    window.addEventListener("resize", () => renderChart(data));
    return () => window.removeEventListener("resize", () => renderChart(data));
  }, []);

  //   return <svg width={maxWidth} height={maxHeight} id="barchart" ref={ref} />;
  return (
    <>
      <svg
        // @ts-ignore
        ref={ref}
        style={{ width: "100%", height: maxHeight }}
        id="barchart"
      />
      <div className="w-full flex justify-center items-center text-sm gap-2 pb-6">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 flex items-center justify-center"
            style={{ background: "#44C1D5" }}
          ></div>
          <div>Orders</div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-[2px] flex items-center justify-center"
            style={{ background: "#F8A55B" }}
          >
            <div
              className="rounded-full border border-white w-[10px] h-[10px]"
              style={{ background: "#F8A55B" }}
            ></div>
          </div>
          <div>Revenue</div>
        </div>
      </div>
    </>
  );
  //   return <div className="p-4">BarChart</div>;
};

export default BarChart;
