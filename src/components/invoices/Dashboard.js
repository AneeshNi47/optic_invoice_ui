import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Invoices from "./Invoices";
import InvoiceForm from "./form";
import { loadUser, get_users } from "../../actions/auth";
import { Modal } from "semantic-ui-react";

class InvoiceDashboard extends Component {
  state = {
    addLeadForm: false,
    formOpenType: "view",
    edit_lead_data: null,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    get_users: PropTypes.func.isRequired,
  };
  onOpenForm = (data) =>
    this.setState({ addLeadForm: true, edit_lead_data: data });

  handleClose = () => this.setState({ addLeadForm: false });
  setFormType = (type) =>
    this.setState({
      formOpenType: type,
    });
  render() {
    const { addLeadForm, edit_lead_data, formOpenType } = this.state;
    return (
      <>
        <Invoices
          openForm={this.onOpenForm}
          setFormType={(type) => this.setFormType(type)}
        />

        <Modal size="large" open={addLeadForm} onClose={this.handleClose}>
          <InvoiceForm
            closeForm={this.handleClose}
            data={edit_lead_data}
            formOpenType={formOpenType}
          />
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { loadUser, get_users })(
  InvoiceDashboard
);
