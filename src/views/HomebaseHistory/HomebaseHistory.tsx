import React from "react";
import SimpleChart, { ComponentDataType } from "../../components/SimpleChart/SimpleChart";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "./HomebaseHistory.css";
import classnames from "classnames";

type MyState = { statuses: Array<ComponentDataType> };

class HomebaseHistory extends React.Component<{}, MyState> {
  intervalID: any;

  constructor(props: any) {
    super(props);
  }

  async getLatestData() {
    try {
      const res = await fetch("https://my-office-happiness.com:9443/status/1");
      const statuses = await res.json();
      console.log(statuses);
      this.setState({ statuses: statuses });
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.getLatestData();
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.getLatestData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render = () => {
    if (this.state === null || this.state.statuses === null) {
      return <div></div>;
    }

    const happy: any = this.state.statuses[6];
    const percentage = happy.data[29].y;
    return (
      <div>
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
          <SimpleChart data={[this.state.statuses[0]]} name={"Light"} />
          <SimpleChart data={[this.state.statuses[1]]} name={"Volume"} />
          <SimpleChart data={[this.state.statuses[2]]} name={"Temperature"} />
          <SimpleChart data={[this.state.statuses[5]]} name={"Humidity"} />
          <SimpleChart data={[this.state.statuses[3]]} name={"Dust"} />
          <SimpleChart data={[this.state.statuses[4]]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default HomebaseHistory;
