import React, { Component } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password);
    this.setState({
      username: "",
      password: "",
    });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    const { username, password } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {this.props.loading ? (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
              </Message.Content>
            </Message>
          ) : (
            <>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/optic_invoicer_icon2.png" /> Log-in to your account
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
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={this.onChange}
                    type="password"
                  />

                  <Button color="teal" fluid size="large">
                    Login
                  </Button>
                </Segment>
              </Form>
            </>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  loading: state.authReducer.loading,
  error: state.errorReducer,
  message: state.messageReducer,
});
export default connect(mapStateToProps, { loginUser })(Login);
