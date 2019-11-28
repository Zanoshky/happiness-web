import React, { ComponentProps } from "react";
import "./SimpleChart.css";
import { ResponsiveLine } from "@nivo/line";

const commonProperties = {
  margin: { top: 10, right: 0, bottom: 0, left: 0 },
  animate: false,
  enableGridX: false,
  enableGridY: true,
  useMesh: true,
  colors: ["var(--color-info)"],
  enablePoints: false,
  pointBorderWidth: 1.2,
  lineWidth: 2
};

export type ComponentDataType = { id: string | number; data: { x: string; y: number }[] }[];

interface IProps extends ComponentProps<any> {
  data: any;
  name?: string;
  chartMaxValue?: number;
}

// const curveOptions = ['linear', 'monotoneX', 'step', 'stepBefore', 'stepAfter'];

const SimpleChart = (props: IProps) => {
  return (
    <div className={"sC"}>
      <div className={"sCTop"}>{props.name || ""}</div>
      <div className="sCChart">
        <ResponsiveLine
          {...commonProperties}
          curve={"monotoneX"}
          pointBorderColor={"white"}
          enableArea={true}
          areaOpacity={0.09}
          axisBottom={null}
          axisLeft={null}
          enableCrosshair={false}
          data={props.data}
          yScale={{
            type: "linear",
            min: 0,
            max: props.chartMaxValue ? props.chartMaxValue : "auto"
          }}
        />
      </div>
    </div>
  );
};

export default SimpleChart;
