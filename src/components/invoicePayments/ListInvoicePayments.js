import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../actions/crud_operations";
import { GET_INVOICE_PAYMENTS } from "../../actions/types";
import { Icon, Table, Button, Header, Modal } from "semantic-ui-react";

class ListInvoicePayments extends Component {
  state = {
    invoiceId: null,
  };
  static propTypes = {
    invoice_payments: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItems(
      `invoice-payment/?invoice_id=${this.props.invoiceId}`,
      GET_INVOICE_PAYMENTS
    );
  }
  openDeleteModal = (id) => {
    this.setState({
      showDeleteModal: true,
      customerId: id,
    });
  };
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
      customerId: null,
    });
  };

  render() {
    const { invoice_payments } = this.props;
    const { showDeleteModal, paymentId } = this.state;
    return (
      <>
        <Modal
          basic
          onClose={() => this.closeDeleteModal()}
          open={showDeleteModal}
          size="small"
        >
          <Header icon>
            <Icon name="archive" />
            Delete Payment
          </Header>
          <Modal.Content>
            <p>
              Are You sure you want to delete the Payment and Update Invoice?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="green"
              inverted
              onClick={() => this.closeDeleteModal()}
            >
              <Icon name="remove" /> No
            </Button>
            <Button color="red" inverted>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Header color="teal" textAlign="left">
                  <Icon name="users" />
                  Payments
                </Header>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="4" textAlign="right">
                <Button
                  color="teal"
                  animated="vertical"
                  onClick={() => this.props.openForm(null)}
                >
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="add" />
                  </Button.Content>
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="left">Amount</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Type</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Mode</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {invoice_payments.map((payment, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="left">{payment.amount}</Table.Cell>
                <Table.Cell textAlign="left">{payment.payment_type}</Table.Cell>
                <Table.Cell textAlign="left">{payment.payment_mode}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button.Group>
                    <Button
                      color="blue"
                      icon
                      onClick={() => this.props.openForm(payment)}
                    >
                      <Icon name="edit" />
                    </Button>
                    <Button
                      color="red"
                      icon
                      onClick={() => this.openDeleteModal(payment.id)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  invoice_payments: state.invoiceReducer.invoice_payments,
});

export default connect(mapStateToProps, {
  getItems,
})(ListInvoicePayments);
