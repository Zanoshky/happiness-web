import React from "react";
import { Button } from "antd";

const pjson = require("./../../../package.json");

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <Button type="primary" size={"large"} href="/homebase/1">
        PROTOTYPE
      </Button>
      <br />
      <br />
      <br />
      <h3>Version: {pjson.version}</h3>
    </div>
  );
};

export default Dashboard;
