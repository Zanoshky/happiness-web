import React from "react";
import "./HomebaseHistory.css";
import SimpleChart, { ComponentDataType } from "../../components/SimpleChart/SimpleChart";
import RealtimeCharts from "../../components/RealtimeChart/RealtimeCharts";

type MyState = { statuses: Array<ComponentDataType> };

class HomebaseHistory extends React.Component<{ match: any }, MyState> {
  intervalID: any;

  async getLatestData(homebaseId: number) {
    try {
      const res = await fetch("https://my-office-happiness.com:9443/status/" + homebaseId);
      const statuses = await res.json();
      this.setState({ statuses: statuses });
    } catch (e) {
      console.log(e);
    }
  }

  async loadData(homebaseId: number) {
    await this.getLatestData(homebaseId);
    this.intervalID = setTimeout(() => this.loadData(homebaseId), 5000);
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
      this.intervalID = setTimeout(() => this.loadData(this.props.match.params.homebaseId), 5000);
    }
  }

  render = () => {
    if (this.state === null || this.state.statuses === null) {
      return <div></div>;
    }

    const happy: any = this.state.statuses[6];

    return (
      <div>
        <section>
          <RealtimeCharts chartMaxValue={100} data={[happy]} name={"Happiness"} style="primary" />
        </section>
        <section className={"nowItems"}>
          <RealtimeCharts chartMaxValue={1000} data={[this.state.statuses[0]]} name={"Light"} />
          <RealtimeCharts chartMaxValue={150} data={[this.state.statuses[1]]} name={"Volume"} />
          <RealtimeCharts chartMaxValue={50} data={[this.state.statuses[2]]} name={"Temperature"} />
          <RealtimeCharts chartMaxValue={100} data={[this.state.statuses[5]]} name={"Humidity"} />
          <RealtimeCharts chartMaxValue={2000} data={[this.state.statuses[3]]} name={"Dust"} />
          <RealtimeCharts chartMaxValue={2000} data={[this.state.statuses[4]]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default HomebaseHistory;
