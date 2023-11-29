import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListInvoices from "./ListInvoices";
import AddInvoice from "./AddInvoice";
import { AddInvoicePayment } from "../invoicePayments/AddInvoicePayment";
import ListInvoicePayments from "../invoicePayments/ListInvoicePayments";
import { loadUser, get_users } from "../../actions/auth";
import { addItem } from "../../actions/crud_operations";
import { Modal } from "semantic-ui-react";

class InvoiceDashboard extends Component {
  state = {
    addInvoiceForm: false,
    addPaymentForm: false,
    listPaymentsModal: false,
    formOpenType: "view",
    invoice_data: null,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    get_users: PropTypes.func.isRequired,
    addItem: PropTypes.func.isRequired,
  };
  onOpenForm = (data) =>
    this.setState({ addInvoiceForm: true, invoice_data: data });
  onOpenPaymentList = (data) =>
    this.setState({ listPaymentsModal: true, invoice_data: data });
  onOpenPaymentForm = (data) =>
    this.setState({ addPaymentForm: true, invoice_data: data });

  handleClose = () => this.setState({ addInvoiceForm: false });
  handlePaymentListClose = () => this.setState({ listPaymentsModal: false });
  handlePaymentFormClose = () => this.setState({ addPaymentForm: false });

  setFormType = (type) =>
    this.setState({
      formOpenType: type,
    });
  render() {
    const {
      addInvoiceForm,
      addPaymentForm,
      invoice_data,
      formOpenType,
      listPaymentsModal,
    } = this.state;
    return (
      <>
        <ListInvoices
          openForm={this.onOpenForm}
          openPaymentList={this.openPaymentList}
          onOpenPaymentForm={(data) => this.onOpenPaymentForm(data)}
          setFormType={(type) => this.setFormType(type)}
        />

        <Modal
          size="fullscreen"
          open={addInvoiceForm}
          onClose={this.handleClose}
        >
          <AddInvoice
            closeForm={this.handleClose}
            data={invoice_data}
            formOpenType={formOpenType}
          />
        </Modal>
        <Modal
          size="small"
          open={addPaymentForm}
          onClose={this.handlePaymentFormClose}
        >
          <AddInvoicePayment
            closeForm={this.handlePaymentFormClose}
            data={invoice_data}
            formOpenType={formOpenType}
            addItem={this.props.addItem}
          />
        </Modal>
        <Modal
          size="large"
          open={listPaymentsModal}
          onClose={this.handlePaymentListClose}
        >
          <ListInvoicePayments
            closeForm={this.handleClose}
            data={invoice_data}
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

export default connect(mapStateToProps, { loadUser, get_users, addItem })(
  InvoiceDashboard
);
