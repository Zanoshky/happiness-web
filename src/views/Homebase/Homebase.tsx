import React, { ComponentProps, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "./Homebase.css";
import { RouteComponentProps, withRouter } from "react-router-dom";
import classnames from "classnames";
import SimpleChart, { ComponentDataType } from "../../components/SimpleChart/SimpleChart";

let data: ComponentDataType = [
  {
    id: "qweqwe",
    data: [
      {
        x: new Date(new Date().getTime() + 1 * 60 * 1000).toTimeString().split(" ")[0],
        y: Math.floor(Math.random() * 100)
      },
      {
        x: new Date(new Date().getTime() + 2 * 60 * 1000).toTimeString().split(" ")[0],
        y: Math.floor(Math.random() * 100)
      },
      {
        x: new Date(new Date().getTime() + 3 * 60 * 1000).toTimeString().split(" ")[0],
        y: Math.floor(Math.random() * 100)
      },
      {
        x: new Date(new Date().getTime() + 4 * 60 * 1000).toTimeString().split(" ")[0],
        y: Math.floor(Math.random() * 100)
      },
      {
        x: new Date(new Date().getTime() + 5 * 60 * 1000).toTimeString().split(" ")[0],
        y: Math.floor(Math.random() * 100)
      }
    ]
  }
];

interface IParams {
  homebaseId: string;
}
interface IProps extends ComponentProps<any>, RouteComponentProps<IParams> {}

const Homebase = (props: IProps) => {
  const { params } = props.match;
  const [percentage, setPercentage] = React.useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercentage(Math.floor(Math.random() * 100));
    }, 0);
  }, [params]);

  // let status = "bad";
  // if (percentage > 50) {
  //   status = "ok";
  // }
  // if (percentage > 80) {
  //   status = "good";
  // }
  return (
    <>
      <section>
        <div
          className={classnames("mainCircle", {
            good: percentage > 80,
            ok: percentage > 50 && percentage <= 80,
            bad: percentage > 0 && percentage <= 50
          })}
        >
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              strokeLinecap: "round",
              pathTransitionDuration: 1,
              pathColor: `rgba(255,255,255,.8)`,
              trailColor: "transparent",
              backgroundColor: "transparent"
            })}
          >
            <div>
              <strong>{percentage}%</strong>
              <span>HAPPINESS</span>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </section>

      <section className={"nowItems"}>
        <SimpleChart data={data} name={"Light"} />
        <SimpleChart data={data} name={"Volume"} />
        <SimpleChart data={data} name={"Temperature"} />
      </section>
      <section className={"nowItems"}>
        <SimpleChart data={data} name={"Humidity"} />
        <SimpleChart data={data} name={"Dust"} />
        <SimpleChart data={data} name={"Gas"} />
      </section>
    </>
  );
};

export default withRouter(Homebase);
