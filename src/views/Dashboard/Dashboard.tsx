import React from "react";
import { Button } from "antd";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <Button type="primary" size={"large"} href="/homebase/1">
        PROTOTYPE
      </Button>
    </div>
  );
};

export default Dashboard;
