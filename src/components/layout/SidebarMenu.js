import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export class SidebarMenu extends Component {
  render() {
    const super_admin_menu = (
      <>
        <Link to="/organizations">
          <Menu.Item>
            <Icon name="file alternate outline" />
            Organization
          </Menu.Item>
        </Link>
        <Link to="/invoices">
          <Menu.Item>
            <Icon name="sitemap" />
            Reports
          </Menu.Item>
        </Link>
      </>
    );
    const org_admin_menu = (
      <>
        <Link to="/invoices" onClick={() => this.props.sidebarToggle()}>
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
        <Link to="/invoices">
          <Menu.Item>
            <Icon name="sitemap" />
            Reports
          </Menu.Item>
        </Link>
      </>
    );
    const org_staff_menu = (
      <>
        <Link to="/invoices" onClick={() => this.props.sidebarToggle()}>
          <Menu.Item>
            <Icon name="file alternate outline" />
            Invoices
          </Menu.Item>
        </Link>
        <Link to="/inventory" onClick={() => this.props.sidebarToggle()}>
          <Menu.Item>
            <Icon name="boxes" />
            Inventory
          </Menu.Item>
        </Link>
        <Link to="/customers" onClick={() => this.props.sidebarToggle()}>
          <Menu.Item>
            <Icon name="users" />
            Customers
          </Menu.Item>
        </Link>
      </>
    );

    const default_menu = (
      <>
        <Menu.Item>
          <Icon name="cross" />
          Invalid
        </Menu.Item>
      </>
    );

    switch (this.props.user_type) {
      case "admin":
        console.log(this.props.user_type);
        return super_admin_menu;
      case "staff":
        return org_staff_menu;
      case "superstaff":
        return org_admin_menu;
      default:
        console.log(this.props.user_type);
        return default_menu;
    }
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  user_type: state.authReducer.user_type,
});
export default connect(mapStateToProps, null)(SidebarMenu);
