import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default class SidebarMenu extends Component {
  render() {
    return (
      <>
        <Link to="/invoices">
          <Menu.Item>
            <Icon name="file alternate outline" />
            Invoices
          </Menu.Item>
        </Link>
        <Link to="/inventory">
          <Menu.Item>
            <Icon name="boxes" />
            Inventory
          </Menu.Item>
        </Link>
        <Link to="/invoices">
          <Menu.Item>
            <Icon name="users" />
            Customers
          </Menu.Item>
        </Link>
        <Link to="/invoices">
          <Menu.Item>
            <Icon name="sitemap" />
            Organization
          </Menu.Item>
        </Link>
      </>
    );
  }
}
