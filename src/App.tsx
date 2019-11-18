import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard/Dashboard";
import Homebase from "./views/Homebase/Homebase";
import Navigation from "./components/Navigation/Navigation";
import HomebaseHistory from "./views/HomebaseHistory/HomebaseHistory";
import { Layout } from "antd";
const { Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Router>
      <Layout>
        <Sider
          theme="dark"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <div
            className="siderToggle"
            onClick={() => setCollapsed(!collapsed)}
          />
          <Navigation />
        </Sider>
        <Layout
          style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.2s" }}
        >
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: "calc(100vh - 50px)"
            }}
          >
            <Switch>
              <Route path="/homebase/:homebaseId/history">
                <HomebaseHistory />
              </Route>
              <Route path="/homebase/:homebaseId">
                <Homebase />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
