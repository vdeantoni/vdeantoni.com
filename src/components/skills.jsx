import React, { useRef, useEffect } from "react";
import * as $ from "classnames";
import * as d3 from "d3";

const Skills = ({ data = [] }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const [w, h] = [400, 400];
    const el = elementRef.current;

    const svg = d3
      .select(el)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("viewBox", String([0, 0, w, h]))
      .attr("font-size", "0.8rem")
      .attr("text-anchor", "middle");

    const color = d3.scaleOrdinal(
      data.map((d) => d.group),
      d3.schemeDark2
    );

    data.sort((a, b) => b.value - a.value);

    const pack = (data) => d3.pack().size([w, h]).padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));

    const root = pack(data);

    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    leaf
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill-opacity", 0.95)
      .attr("fill", (d) => color(d.data.group));

    leaf
      .append("text")
      .style("font-size", function (d) {
        const words = d.data.name.split(/(?=[A-Z][a-z])|\s+/g);
        words.sort((a, b) => a.length - b.length);
        if (words[0].length * 3.4 < d.r) {
          return null;
        }

        return (words[0].length * 36) / d.r + "px";
      })

      .selectAll("tspan")
      .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text((d) => d);

    return () => {
      el.textContent = "";
    };
  }, [data]);
  return <div ref={elementRef} className={$("flex", "justify-center")}></div>;
};

export default Skills;
