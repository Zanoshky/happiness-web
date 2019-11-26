import React from "react";
import SimpleChart, { ComponentDataType } from "../../components/SimpleChart/SimpleChart";

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

    return (
      <div>
        <div>TestCharts</div>
        <section className={"nowItems"}>
          <SimpleChart data={[this.state.statuses[0]]} name={"Light"} />
          <SimpleChart data={[this.state.statuses[1]]} name={"Volume"} />
          <SimpleChart data={[this.state.statuses[2]]} name={"Temperature"} />
        </section>
        <section className={"nowItems"}>
          <SimpleChart data={[this.state.statuses[5]]} name={"Humidity"} />
          <SimpleChart data={[this.state.statuses[3]]} name={"Dust"} />
          <SimpleChart data={[this.state.statuses[4]]} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default HomebaseHistory;
