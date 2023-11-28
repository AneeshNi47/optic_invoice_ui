import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, deleteItem } from "../../actions/crud_operations";
import { printInvoice } from "../../actions/other_operations";
import { GET_INVOICES } from "../../actions/types";
import { Menu, Icon, Table, Button, Header, Popup } from "semantic-ui-react";
import InvoiceModal from "./InvoiceItem";

class ListInvoices extends Component {
  state = {
    showItem: false,
    invoiceData: null,
    activeIndex: -1,
  };
  static propTypes = {
    invoices: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    printInvoice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItems("invoice", GET_INVOICES);
  }
  closeModal = () => this.setState({ showItem: false });

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };
  formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  render() {
    const { invoices } = this.props;
    const { showItem, invoiceData, activeIndex } = this.state;
    return (
      <div className="invoicelisttable">
        <InvoiceModal
          invoice={invoiceData}
          isOpen={showItem}
          onClose={this.closeModal}
          activeIndex={activeIndex}
          handleClick={this.handleClick}
          formatDate={this.formatDate}
        />

        <Table singleLine color="teal" striped>
          <Table.Header span={6}></Table.Header>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Header as="h2" color="teal" textAlign="left">
                  <Icon name="file alternate outline" />
                  Invoices
                </Header>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="1">
                <Icon name="checkmark" color="green" />: Paid
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="1">
                <Icon name="checkmark" color="red" />: Taxable
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="1" textAlign="right">
                <Button
                  color="orange"
                  animated="vertical"
                  onClick={() => this.props.openForm(null)}
                >
                  <Button.Content hidden>Add</Button.Content>
                  <Button.Content visible>
                    <Icon name="add circle" />
                  </Button.Content>
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell textAlign="center">
                Invoice Number
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Delivery Date
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Customer</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Balance</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Items</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {invoices.map((invoice, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="center">
                  <Header as="h4" color="blue">
                    <Header.Content>
                      {invoice.invoice_number}
                      {invoice.status === "Paid" ? (
                        <Icon name="checkmark" color="green" />
                      ) : (
                        ""
                      )}{" "}
                      {invoice.is_taxable ? (
                        <Icon name="checkmark" color="red" />
                      ) : (
                        ""
                      )}{" "}
                      <Header.Subheader>{invoice.date}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {invoice.delivery_date}
                </Table.Cell>
                <Table.Cell textAlign="center">{invoice.customer.first_name}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Popup
                    trigger={
                      <span style={{ cursor: "pointer", color: "teal" }}>
                        {invoice.balance}
                      </span>
                    }
                    content={`Total: ${invoice.total} | Advance: ${
                      invoice.advance
                    } Payments: ${
                      invoice.invoice_payment
                        ? invoice.invoice_payment.reduce(
                            (total, currentPayment) => {
                              return total + parseFloat(currentPayment.amount);
                            },
                            0
                          )
                        : 0
                    }| Balance: ${invoice.balance}`}
                    position="top center"
                    inverted
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {invoice.items.map((item, idx) => (
                    <p key={idx}>
                      <Icon
                        name={
                          item.item_type === "Lens" ? "eye" : "square outline"
                        }
                      />
                      {item.name}
                    </p>
                  ))}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button.Group>
                    <Button
                      icon
                      color="blue"
                      onClick={() =>
                        this.setState({
                          invoiceData: invoice,
                          showItem: true,
                        })
                      }
                    >
                      <Icon name="eye" />
                    </Button>
                    <Button
                      icon
                      color="pink"
                      onClick={() =>
                        this.props.printInvoice(
                          "invoice/customer-pdf",
                          invoice.id,
                          invoice.invoice_number
                        )
                      }
                    >
                      <Icon name="file text outline" />
                    </Button>
                    <Button
                      icon
                      color="green"
                      onClick={() =>
                        this.props.printInvoice(
                          "invoice/pdf",
                          invoice.id,
                          invoice.invoice_number
                        )
                      }
                    >
                      <Icon name="print" />
                    </Button>
                    <Button
                      icon
                      color="yellow"
                      onClick={() => this.props.onOpenPaymentForm(invoice)}
                    >
                      <Icon name="dollar" />
                    </Button>
                    <Button icon color="red">
                      <Icon name="trash alternate" />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="18">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  {[1, 2, 3, 4].map((page) => (
                    <Menu.Item as="a" key={page}>
                      {page}
                    </Menu.Item>
                  ))}
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  invoices: state.invoiceReducer.invoices,
});

export default connect(mapStateToProps, {
  getItems,
  deleteItem,
  printInvoice,
})(ListInvoices);
