import React, { ComponentProps } from "react";
import "./RealtimeCharts.css";
import "../SimpleChart/SimpleChart.css";
import { ResponsiveLine } from "@nivo/line";

export type ComponentDataType = { id: string | number; data: { x: string; y: number }[] }[];

type ChartStyles = "primary" | "secondary";

interface IProps extends ComponentProps<any> {
  data: any;
  name?: string;
  chartMaxValue?: number;
  style?: ChartStyles;
}

const primaryTheme = {
  props: {
    pointBorderColor: "white",
    colors: ["white"],
    margin: { top: 20, right: 0, bottom: 20, left: 35 },
    animate: false,
    enableGridX: false,
    enableGridY: true,
    useMesh: true,
    enablePoints: false,
    pointBorderWidth: 1.2,
    lineWidth: 3
  },
  theme: {
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
  }
};

const secondaryTheme = {
  props: {
    pointBorderColor: "black",
    colors: ["black"],
    margin: { top: 20, right: 0, bottom: 20, left: 35 },
    animate: false,
    enableGridX: false,
    enableGridY: true,
    useMesh: true,
    enablePoints: false,
    pointBorderWidth: 0,
    lineWidth: 2
  },
  theme: {
    axis: {
      ticks: {
        line: {
          stroke: "black"
        },
        text: {
          fill: "black"
        }
      }
    },
    grid: {
      line: {
        stroke: "rgba(0,0,0,.1)",
        strokeWidth: 1,
        strokeDasharray: "2 10"
      }
    }
  }
};

const addTimestamps = (data: any) => {
  const d = data[0].data.map((v: any, i: number) => {
    return {
      y: v.y,
      x: Date.now() + i
    };
  });
  return [{ id: data.id, data: d }];
};

const RealtimeCharts = (props: IProps) => {
  const { name = "Chart", chartMaxValue = 100, style = "secondary" } = props;
  const [data, setData] = React.useState(addTimestamps(props.data));
  const [theme, setTheme] = React.useState(primaryTheme);

  const classNameBase = style === "secondary" ? "sC" : "lC";
  const numberOfPoints = style === "secondary" ? 20 : 30;

  React.useEffect(() => {
    setTheme(style === "secondary" ? secondaryTheme : primaryTheme);
  }, [style]);

  React.useEffect(() => {
    const newData = addTimestamps(data)[0].data;
    let dataCopy = [...data];

    let i = 0;
    let int = setInterval(() => {
      const newOne = {
        y: newData[i].y,
        x: Date.now() + i
      };

      let allData = [...dataCopy[0].data, newOne];

      if (allData.length > numberOfPoints) {
        allData = allData.slice(allData.length - numberOfPoints);
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
    }, 5000 / Math.floor(newData.length));
  }, [props.data]);

  return (
    <div className={classNameBase}>
      <div className={`${classNameBase}Top`}>{name}</div>
      <div className={`${classNameBase}Chart`}>
        <ResponsiveLine
          {...theme.props}
          axisBottom={null}
          // axisLeft={null}
          // enableCrosshair={false}
          data={data}
          yScale={{
            type: "linear",
            min: 0,
            max: chartMaxValue
          }}
          enablePoints={true}
          curve="monotoneX"
          animate={false}
          motionStiffness={120}
          motionDamping={50}
          isInteractive={false}
          enableSlices={false}
          theme={theme.theme}
        />
      </div>
    </div>
  );
};

export default RealtimeCharts;
