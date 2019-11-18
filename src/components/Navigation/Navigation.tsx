import React, {
  ComponentProps,
} from "react";
import { Icon, Menu} from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import './Navigataion.css'
const { SubMenu } = Menu;


interface IProps extends ComponentProps<any>, RouteComponentProps {}

const Navigation = (props: IProps) => {
  const pathname = props.location.pathname;

  const homebases = [
    { name: "Trantnerhof", slug: "hb0" },
    { name: "Heisenberg", slug: "hb3" },
    { name: "Quak Quak", slug: "its_a_duck" }
  ];

  const activeHomebase = homebases
    .filter(p => pathname.indexOf(`/${p.slug}`) !== -1)
    .map(p => `/homebase/${p.slug}`)[0];

  const renderHomebaseLinks = () => {
    return homebases.map((page, i) => {
      const slug = `/homebase/${page.slug}`;
      const nav = (
        <SubMenu
          key={slug}
          title={
            <span>
              <Icon type="home" />
              <span>{page.name}</span>
            </span>
          }
        >
          <Menu.Item key={`${slug}`}>
            <Link to={slug}>Now</Link>
          </Menu.Item>
          <Menu.Item key={`${slug}/history`}>
            <Link to={`${slug}/history`}>History</Link>
          </Menu.Item>
        </SubMenu>
      );

      return nav;
    });
  };

  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[activeHomebase]}
      >
        <Menu.Item key={"/"}>
          <Link to={"/"}>
            <Icon type={"dashboard"} />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        {renderHomebaseLinks()}
      </Menu>
    </>
  );
};

export default withRouter(Navigation);
