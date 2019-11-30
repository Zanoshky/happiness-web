import React, { ComponentProps } from "react";
import "./RealtimeCharts.css";
import { ResponsiveLine } from "@nivo/line";

const commonProperties = {
  margin: { top: 20, right: 0, bottom: 20, left: 35 },
  animate: false,
  enableGridX: false,
  enableGridY: true,
  useMesh: true,
  colors: ["white"],
  enablePoints: false,
  pointBorderWidth: 1.2,
  lineWidth: 3
};

export type ComponentDataType = { id: string | number; data: { x: string; y: number }[] }[];

interface IProps extends ComponentProps<any> {
  data: any;
  name?: string;
  chartMaxValue?: number;
}

const RealtimeCharts = (props: IProps) => {
  const [data, setData] = React.useState(props.data);

  React.useEffect(() => {
    const newData = props.data[0].data.map((v: any, i: number) => {
      return {
        y: v.y,
        x: Date.now() + i
      };
    });
    let dataCopy = [...data];

    let i = 0;
    let int = setInterval(() => {
      const newOne = {
        y: newData[i].y,
        x: Date.now() + i
      };

      let allData = [...dataCopy[0].data, newOne];
      // const concatData = allData.slice(allData.length - 10, allData.length);
      if (allData.length > 30) {
        allData = allData.slice(allData.length - 30);
      }
      dataCopy[0].data.push(newOne);
      setData([
        {
          id: dataCopy[0].id,
          data: allData
        }
      ]);
      if (i === newData.length - 1) {
        clearInterval(int);
      }
      i++;
    }, 5000 / newData.length);
  }, [props.data]);

  return (
    <div className={"lC"}>
      <div className={"lCTop"}>{props.name || ""}</div>
      <div className="lCChart">
        <ResponsiveLine
          {...commonProperties}
          pointBorderColor={"white"}
          axisBottom={null}
          // axisLeft={null}
          // enableCrosshair={false}
          data={data}
          yScale={{
            type: "linear",
            min: 0,
            max: 100
          }}
          enablePoints={true}
          curve="monotoneX"
          animate={false}
          motionStiffness={120}
          motionDamping={50}
          isInteractive={false}
          enableSlices={false}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: "white"
                },
                text: {
                  fill: "white"
                }
              }
            },
            grid: {
              line: {
                stroke: "rgba(255,255,255,.4)",
                strokeWidth: 1,
                strokeDasharray: "4 10"
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default RealtimeCharts;
