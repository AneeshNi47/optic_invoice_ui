import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";
import { Image, Menu, Icon } from "semantic-ui-react";

export class PageHeader extends Component {
  render() {
    const { isAuthenticated, organization } = this.props.auth;
    const guestLinks = (
      <Menu.Menu position="right">
        <Link to="/login">
          <Menu.Item name="login" />
        </Link>
      </Menu.Menu>
    );
    const authLinks = (
      <>
        {organization ? (
          <Menu.Menu position="right">
            <Image alt="logo" src={organization.logo} avatar />
          </Menu.Menu>
        ) : (
          ""
        )}
        <Menu.Menu position="right">
          <Menu.Item name="logout" onClick={this.props.logoutUser} />
        </Menu.Menu>
      </>
    );
    if (isAuthenticated)
      return (
        <Menu fixed="top" inverted>
          <Menu.Item header href="#">
            <Image
              size="mini"
              src="/optic_invoicer_icon2.png"
              style={{ marginRight: "1.5em" }}
            />
            Optic Invoicer{"        "}
          </Menu.Item>
          {isAuthenticated ? (
            <Menu.Item onClick={() => this.props.sidebarToggle()}>
              <Icon name="right arrow" visible={this.props.sidebarVisible} />
            </Menu.Item>
          ) : (
            ""
          )}

          {isAuthenticated ? authLinks : guestLinks}
        </Menu>
      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  organization: state.authReducer.organization,
});

export default connect(mapStateToProps, { logoutUser })(PageHeader);
