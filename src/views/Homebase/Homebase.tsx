import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "./Homebase.css";
import classnames from "classnames";
import BlockData from "../../components/BlockData/BlockData";

type MyState = { statuses: Array<number>; homebaseId: number };

class Homebase extends React.Component<{}, MyState> {
  intervalID: any;

  async getLatestData() {
    try {
      const res = await fetch("https://my-office-happiness.com:9443/current/1");
      const statuses = await res.json();
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

    const percentage: number = this.state.statuses[6];

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
          <BlockData chartMaxValue={1000} data={this.state.statuses[0]} name={"Light"} />
          <BlockData chartMaxValue={150} data={this.state.statuses[1]} name={"Volume"} />
          <BlockData chartMaxValue={50} data={this.state.statuses[2]} name={"Temperature"} />
          <BlockData chartMaxValue={100} data={this.state.statuses[5]} name={"Humidity"} />
          <BlockData chartMaxValue={2000} data={this.state.statuses[3]} name={"Dust"} />
          <BlockData chartMaxValue={2000} data={this.state.statuses[4]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default Homebase;
