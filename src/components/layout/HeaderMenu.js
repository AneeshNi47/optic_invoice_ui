import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { Image, Menu, Button, Icon } from "semantic-ui-react";

export class PageHeader extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = (
      <Menu.Menu position="right">
        <Link to="/login">
          <Menu.Item name="login" />
        </Link>
        <Link to="/register">
          <Menu.Item name="Register" />
        </Link>
      </Menu.Menu>
    );
    const authLinks = (
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={this.props.logoutUser} />
      </Menu.Menu>
    );
    return (
      <Menu fixed="top" inverted>
        <Menu.Item header onClick={() => this.props.sidebarToggle()}>
          <Image
            size="mini"
            src="/optic_invoicer_icon2.png"
            style={{ marginRight: "1.5em" }}
          />
          Optic Invoicer{"        "}
          <Icon name="right arrow" visible={this.props.sidebarVisible} />
        </Menu.Item>
        {isAuthenticated ? authLinks : guestLinks}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(PageHeader);
