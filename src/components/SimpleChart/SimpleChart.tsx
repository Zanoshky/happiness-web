import React, { ComponentProps } from "react";
import "./SimpleChart.css";
import { ResponsiveLine } from "@nivo/line";

const commonProperties = {
  margin: { top: 10, right: 0, bottom: 0, left: 0 },
  animate: true,
  enableGridX: false,
  enableGridY: false,
  colors: ['var(--color-info)'],
  pointSize: 5,
  enablePoints: true,
  pointBorderWidth: 1.2,
  lineWidth: 3
};

interface IProps extends ComponentProps<any> {
  data: {id: string | number, data: {x: number, y: number}[] }[];
  name?: string;
}

const SimpleChart = (props: IProps) => {
  return (
    <div className={"sC"}>
      <div className={"sCTop"}>
        {props.name || ''}
      </div>
      <div className="sCChart">
        <ResponsiveLine
          {...commonProperties}
          curve={"natural"}
          pointBorderColor={"white"}
          useMesh={true}
          enableArea={true}
          areaOpacity={0.09}
          axisBottom={null}
          axisLeft={null}
          enableCrosshair={false}
          data={props.data}
        />
      </div>
    </div>
  );
};

export default SimpleChart;
