import React from "react";
import SimpleChart, { ComponentDataType } from "../../components/SimpleChart/SimpleChart";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import classnames from "classnames";
import "./HomebaseHistory.css";
import RealtimeCharts from "../../components/RealtimeChart/RealtimeCharts";

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
    return (
      <div>
        <section>
          <RealtimeCharts chartMaxValue={100} data={[happy]} name={"Happiness"} />
        </section>
        <section className={"nowItems"}>
          <SimpleChart chartMaxValue={1000} data={[this.state.statuses[0]]} name={"Light"} />
          <SimpleChart chartMaxValue={150} data={[this.state.statuses[1]]} name={"Volume"} />
          <SimpleChart chartMaxValue={50} data={[this.state.statuses[2]]} name={"Temperature"} />
          <SimpleChart chartMaxValue={100} data={[this.state.statuses[5]]} name={"Humidity"} />
          <SimpleChart chartMaxValue={2000} data={[this.state.statuses[3]]} name={"Dust"} />
          <SimpleChart chartMaxValue={2000} data={[this.state.statuses[4]]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default HomebaseHistory;
