import React from "react";
import SimpleChart, { ComponentDataType } from "../../components/SimpleChart/SimpleChart";

type Status = {
  happiness: number;
  homebaseId: number;
  timestamp: number;
  humidity: number;
  temperature: number;
  dust: number;
  gas: number;
  volume: number;
  light: number;
};

type MyState = { statuses: Array<Status> };

class HomebaseHistory extends React.Component<{}, MyState> {
  intervalID: any;

  constructor(props: any) {
    super(props);
    this.state = { statuses: [] };
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

  // Before mounting fetch the data
  componentWillMount() {
    this.getLatestData();
  }

  // After mounting, fetch data each second
  componentDidMount() {
    this.intervalID = setInterval(() => this.getLatestData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getLightData() {
    const statuses = [];
    const data = { id: "Light", data: Array<any>() };

    data["id"] = "Light";
    this.state.statuses.forEach(status => {
      const stat = {
        x: new Date(new Date(status.timestamp).getTime()).toTimeString().split(" ")[0],
        y: status.light
      };
      console.log(stat);
      data.data.push(stat);
    });

    statuses.push(data);
    return statuses;
  }

  getVolumeData() {
    const statuses = [];
    const data = { id: "Volume", data: Array<any>() };

    data["id"] = "Volume";
    this.state.statuses.forEach(status => {
      const stat = { x: new Date(new Date(status.timestamp).getTime()).toTimeString().split(" ")[0], y: status.volume };
      data.data.push(stat);
    });

    statuses.push(data);
    return statuses;
  }

  getTemperatureData() {
    const statuses = [];
    const data = { id: "Temperature", data: Array<any>() };

    data["id"] = "Temperature";
    this.state.statuses.forEach(status => {
      const stat = {
        x: new Date(new Date(status.timestamp).getTime()).toTimeString().split(" ")[0],
        y: status.temperature
      };
      data.data.push(stat);
    });

    statuses.push(data);
    return statuses;
  }

  getHumidityData() {
    const statuses = [];
    const data = { id: "Humidity", data: Array<any>() };

    data["id"] = "Humidity";
    this.state.statuses.forEach(status => {
      const stat = {
        x: new Date(new Date(status.timestamp).getTime()).toTimeString().split(" ")[0],
        y: status.humidity
      };
      data.data.push(stat);
    });

    statuses.push(data);
    return statuses;
  }

  getDustData() {
    const statuses = [];
    const data = { id: "Dust", data: Array<any>() };

    data["id"] = "Dust";
    this.state.statuses.forEach(status => {
      const stat = { x: new Date(new Date(status.timestamp).getTime()).toTimeString().split(" ")[0], y: status.dust };
      data.data.push(stat);
    });

    statuses.push(data);
    return statuses;
  }

  getGasData() {
    const statuses = [];
    const data = { id: "Gas", data: Array<any>() };

    data["id"] = "Gas";
    this.state.statuses.forEach(status => {
      const stat = { x: new Date(new Date(status.timestamp).getTime()).toTimeString().split(" ")[0], y: status.gas };
      data.data.push(stat);
    });

    statuses.push(data);
    return statuses;
  }

  render = () => {
    return (
      <div>
        <div>TestCharts</div>
        <section className={"nowItems"}>
          <SimpleChart data={this.getLightData()} name={"Light"} />
          <SimpleChart data={this.getVolumeData()} name={"Volume"} />
          <SimpleChart data={this.getTemperatureData()} name={"Temperature"} />
        </section>
        <section className={"nowItems"}>
          <SimpleChart data={this.getHumidityData()} name={"Humidity"} />
          <SimpleChart data={this.getDustData()} name={"Dust"} />
          <SimpleChart data={this.getGasData()} name={"Gas"} />
        </section>
      </div>
    );
  };
}

export default HomebaseHistory;
