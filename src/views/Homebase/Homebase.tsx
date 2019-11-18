import React from "react";
import { ResponsivePie } from "@nivo/pie";
import "./Homebase.css";

const data = [
  {
    id: "css",
    label: "css",
    value: 410,
    color: "hsl(19, 70%, 50%)"
  },
  {
    id: "sass",
    label: "sass",
    value: 175,
    color: "hsl(213, 70%, 50%)"
  },
  {
    id: "javascript",
    label: "javascript",
    value: 128,
    color: "hsl(58, 70%, 50%)"
  }
];

const Homebase: React.FC = () => {
  return (
    <div style={{width: '100%', height: '500px'}}>
      <ResponsivePie
        data={data}
        margin={{
          top: 40,
          right: 80,
          bottom: 80,
          left: 80
        }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={6}

      />
    </div>
  );
};

export default Homebase;
