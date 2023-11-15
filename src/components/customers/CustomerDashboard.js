import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListCustomer from "./ListCustomer";
import { loadUser, get_users } from "../../actions/auth";

class CustomerDashboard extends Component {
  state = {
    addCustomerForm: false,
    formOpenType: "view",
    editCustomerData: null,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    get_users: PropTypes.func.isRequired,
  };
  onOpenForm = (data) =>
    this.setState({ addCustomerForm: true, editCustomerData: data });

  handleClose = () => this.setState({ addCustomerForm: false });
  setFormType = (type) =>
    this.setState({
      formOpenType: type,
    });
  render() {
    return (
      <>
        <ListCustomer
          openForm={this.onOpenForm}
          setFormType={(type) => this.setFormType(type)}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { loadUser, get_users })(
  CustomerDashboard
);
