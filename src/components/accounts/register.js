import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, Navigate } from "react-router-dom";
import { registerUser } from "../../actions/auth";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  };
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const user = { username, email, password };
    this.props.registerUser(user);
    this.setState({
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, email, password, password_confirm } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="/optic_invoicer_icon2.png" /> Register
          </Header>
          <Form size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={username}
                name="username"
                onChange={this.onChange}
                placeholder="User Name"
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                value={email}
                name="email"
                onChange={this.onChange}
                placeholder="E-Mail address"
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password}
                name="password"
                onChange={this.onChange}
                type="password"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password_confirm}
                name="password_confirm"
                onChange={this.onChange}
                type="password"
              />

              <Button color="teal" fluid size="large">
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already Have An account? <Link to="/login">Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});
export default connect(mapStateToProps, { registerUser })(Register);
