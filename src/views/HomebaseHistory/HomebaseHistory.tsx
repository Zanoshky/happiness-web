import React from "react";
import "./HomebaseHistory.css";
import RealtimeCharts from "../../components/RealtimeChart/RealtimeCharts";
import Utils from "../../utils";

type Measurement = {
  id: string;
  homebaseId: number;
  timestamp: Date;
  humidity: number;
  temperature: number;
  gas: number;
  dust: number;
  pressure: number;
  volume: number;
  light: number;
  happiness: number;
};

type MyState = { statuses: Array<Measurement> };

class HomebaseHistory extends React.Component<{ match: any }, MyState> {
  intervalID: any;

  async getLatestData(homebaseId: number) {
    try {
      const res = await fetch(Utils.getApiUri() + "/status/" + homebaseId);
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

    return (
      <div>
        <section>
          <RealtimeCharts
            chartMaxValue={100}
            data={[this.state.statuses[0].happiness]}
            name={"Happiness"}
            chartStyle="primary"
          />
        </section>
        <section className={"nowItems"}>
          <RealtimeCharts chartMaxValue={150} data={[this.state.statuses[0].volume]} name={"Volume"} />
          <RealtimeCharts chartMaxValue={1000} data={[this.state.statuses[0].light]} name={"Light"} />
          <RealtimeCharts chartMaxValue={50} data={[this.state.statuses[0].temperature]} name={"Temperature"} />
          <RealtimeCharts chartMaxValue={100} data={[this.state.statuses[0].humidity]} name={"Humidity"} />
          <RealtimeCharts chartMaxValue={2000} data={[this.state.statuses[0].dust]} name={"Dust"} />
          <RealtimeCharts chartMaxValue={2000} data={[this.state.statuses[0].pressure]} name={"Pressure"} />
          <RealtimeCharts chartMaxValue={2000} data={[this.state.statuses[0].gas]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default HomebaseHistory;
