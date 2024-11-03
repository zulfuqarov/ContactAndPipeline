import React, { useEffect } from "react";
import * as d3 from "d3";

const Statuscount = ({ dataset }) => {

    const color = d3.scaleOrdinal()
        .domain(["Lost", "New", "Qualified", "Proposition", "Won"]) // İsimler
        .range(["#FFA61A", "#2B8547", "#AF59F7", "#6A8BF7", "#1971F6"]); // Renkler


    useEffect(() => {
        const w = 300,
            h = 300;

        const outerRadiusArc = w / 2;
        const innerRadiusArc = 100;


        d3.select("#chart").select("svg").remove();

        const svg = d3
            .select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", `translate(${w / 2}, ${h / 2})`);

        const pie = d3.pie().value(d => d.percentage).sort(null);
        const arc = d3.arc().innerRadius(innerRadiusArc).outerRadius(outerRadiusArc);

        // Tooltip elementini ekleyin
        const tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("display", "none")
            .style("background", "#fff")
            .style("border", "1px solid #ddd")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("box-shadow", "0px 2px 10px rgba(0, 0, 0, 0.1)");

        svg
            .selectAll("path")
            .data(pie(dataset))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => color(d.data.stageName))
            .transition()
            .duration(1000)
            .attrTween("d", (d) => {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return (t) => arc(interpolate(t));
            })
            .on("end", function () {
                d3.select(this)
                    .on("mouseover", (event, d) => {
                        tooltip.style("display", "block").html(d.data.stageName);
                    })
                    .on("mousemove", (event) => {
                        tooltip
                            .style("left", event.pageX + 10 + "px")
                            .style("top", event.pageY - 10 + "px");
                    })
                    .on("mouseout", () => {
                        tooltip.style("display", "none");
                    });
            });

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 0)
            .style("font-size", "30px")
            .style("fill", "#000");

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 0)
            .attr("y", 30)
            .style("font-size", "15px")
            .style("fill", "#555");

    }, [dataset]);

    const getColorFunc = (key) => {
        switch (key) {
            case "Won":
                return "#1971F6";
            case "Lost":
                return "#FFA61A";
            case "Qualified": // Düzeltildi
                return "#AF59F7";
            case "New":
                return "#2B8547";
            case "Proposition":
                return "#6A8BF7";
            default:
                return "#6A8BF7"; // Veya başka bir varsayılan renk
        }
    };

    return (
        <div className=" w-[780px] bg-white p-[30px]">
            <div className="pb-[40px]">
                <p className="text-[24px] font-bold">Status count</p>
            </div>
            <div className="flex justify-between items-center">
                <div className=" ">
                    <div id="chart" className="chart-container"></div>
                </div>
                <div className="w-[350px] ">
                    <div className="space-y-2">
                        {
                            dataset &&
                            dataset.map((oneMap, index) => (
                                <div key={index} className="h-[40px] flex justify-between items-center text-gray-700">
                                    <div className="relative pl-6">
                                        <span className={`absolute  left-0 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5  rounded-full
                                            bg-[${getColorFunc(oneMap.stageName)}]
                                            `}></span>
                                        <span className="text-[24px] font-normal">{oneMap.stageName}</span>
                                    </div>
                                    <p className="text-[#7C838B] text-[24px]">{oneMap.percentage}%</p>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Statuscount;
