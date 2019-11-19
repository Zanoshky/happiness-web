import React, { ComponentProps, useEffect } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "./Homebase.css";
import { RouteComponentProps, withRouter } from "react-router-dom";
import classnames from "classnames";
import SimpleChart from "../../components/SimpleChart/SimpleChart";

const data = [
  {
    id: "negative",
    data: [
      { x: 0, y: 4 },
      { x: 1, y: 5 },
      { x: 2, y: 8 },
      { x: 3, y: 9 },
      { x: 4, y: 9 },
      { x: 5, y: 10 },
      { x: 6, y: 9 },
      { x: 7, y: 9.4 },
      { x: 8, y: 11.6 },
      { x: 9, y: 12 }
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
        <SimpleChart data={data} name={"Humidity"} />
        <SimpleChart data={data} name={"Temperature"} />
      </section>
    </>
  );
};

export default withRouter(Homebase);
