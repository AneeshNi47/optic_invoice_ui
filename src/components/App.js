import React, { Fragment } from "react";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderMenu from "./layout/HeaderMenu";
import Alerts from "./layout/Alerts";
import InvoiceDashboard from "./invoices/Dashboard";
import InventoryDashboard from "./inventory/InventoryDashboard";
import Users from "./accounts/users";
import Groups from "./accounts/groups";
import Dashboard from "./Dashboard";
import Register from "./accounts/register";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./accounts/login";
import { Provider } from "react-redux";
import { loadUser } from "../actions/auth";
import store from "../store";
import SidebarMenu from "./layout/SidebarMenu";
import {
  Header,
  Menu,
  Segment,
  Sidebar,
  Container,
  Grid,
  List,
  Divider,
} from "semantic-ui-react";

class App extends React.Component {
  state = {
    visible: false,
  };
  closeSideBar = () => {
    this.setState({
      visible: false,
    });
  };

  openSideBar = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    const { visible } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Grid className="app-grid-container">
              <Grid.Row>
                <Grid.Column>
                  <Segment basic>
                    <HeaderMenu
                      sidebarToggle={
                        visible
                          ? () => this.closeSideBar()
                          : () => this.openSideBar()
                      }
                      sidebarVisible={visible}
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="app-main-content">
                <Grid.Column>
                  <Sidebar.Pushable as={Segment} className="parent-container">
                    <Sidebar
                      as={Menu}
                      animation="overlay"
                      icon="labeled"
                      inverted
                      onHide={() => this.closeSideBar()}
                      vertical
                      visible={visible}
                      width="thin"
                    >
                      <SidebarMenu sidebarToggle={this.closeSideBar} />
                    </Sidebar>

                    <Sidebar.Pusher className="main-content">
                      <ToastContainer />
                      <Alerts />
                      <Container fluid>
                        <Routes>
                          <Route
                            path="/"
                            element={<PrivateRoute element={Dashboard} />}
                          />
                          <Route
                            path="/inventory"
                            element={
                              <PrivateRoute element={InventoryDashboard} />
                            }
                          />
                          <Route
                            path="/invoices"
                            element={
                              <PrivateRoute element={InvoiceDashboard} />
                            }
                          />
                          <Route
                            path="/groups"
                            element={<PrivateRoute element={Groups} />}
                          />
                          <Route
                            path="/users"
                            element={<PrivateRoute element={Users} />}
                          />
                          <Route
                            exact
                            path="/register"
                            element={<Register />}
                          />
                          <Route exact path="/login" element={<Login />} />
                        </Routes>
                      </Container>
                      <Divider />
                      <Grid.Row>
                        <Grid.Column>
                          <Segment inverted vertical className="footer">
                            <Grid divided inverted stackable>
                              <Grid.Row>
                                <Grid.Column width={3}>
                                  <Header inverted as="h4" content="About" />
                                  <List link inverted>
                                    <List.Item as="a">Sitemap</List.Item>
                                    <List.Item as="a">Contact Us</List.Item>
                                  </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                  <Header inverted as="h4" content="Services" />
                                  <List link inverted>
                                    <List.Item as="a">FAQ</List.Item>
                                  </List>
                                </Grid.Column>
                                <Grid.Column width={7}>
                                  <Header as="h4" inverted>
                                    An Application by Brocode Solutions FZ LLC
                                  </Header>
                                  <p>
                                    Extra space for a call to action inside the
                                    footer that could help re-engage users.
                                  </p>
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
