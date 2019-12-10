import React from "react";
import "./Homebase.css";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import classnames from "classnames";
import BlockData from "../../components/BlockData/BlockData";

type MyState = { statuses: Array<number>; homebaseId: number };

class Homebase extends React.Component<{ match: any }, MyState> {
  intervalID: any;

  async getLatestData(homebaseId: number) {
    try {
      const res = await fetch("https://my-office-happiness.com:9443/current/" + homebaseId);
      const statuses = await res.json();
      this.setState({ statuses: statuses });
    } catch (e) {
      console.log(e);
    }
  }

  async loadData(homebaseId: number) {
    await this.getLatestData(homebaseId);
    this.intervalID = setTimeout(() => this.loadData(homebaseId), 1000);
  }

  componentWillMount() {
    this.getLatestData(this.props.match.params.homebaseId);
  }

  componentDidMount() {
    this.loadData(this.props.match.params.homebaseId);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.match.params.homebaseId !== prevProps.match.params.homebaseId) {
      clearInterval(this.intervalID);
      this.intervalID = setTimeout(() => this.loadData(this.props.match.params.homebaseId), 1000);
    }
  }

  render = () => {
    if (this.state === null || this.state.statuses === null) {
      return <div></div>;
    }

    const percentage: number = this.state.statuses[6];
    console.log(this.state.statuses);
    return (
      <div>
        <section>
          <div
            className={classnames("mainCircle", {
              good: percentage >= 80,
              ok: percentage > 50 && percentage <= 79,
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
        <section className={"currentItems"}>
          <BlockData value={this.state.statuses[0]} name={"Light"} />
          <BlockData value={this.state.statuses[1]} name={"Volume"} />
          <BlockData value={this.state.statuses[2]} name={"Temperature"} />
          <BlockData value={this.state.statuses[5]} name={"Humidity"} />
          <BlockData value={this.state.statuses[3]} name={"Dust"} />
          <BlockData value={this.state.statuses[4]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default Homebase;
