import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, deleteItem } from "../../actions/crud_operations";
import { printInvoice } from "../../actions/other_operations";
import { GET_INVOICES } from "../../actions/types";
import {
  Menu,
  Icon,
  Table,
  Grid,
  Button,
  Header,
  Popup,
} from "semantic-ui-react";
import InvoiceModal from "./InvoiceItem";

class ListInvoices extends Component {
  state = {
    showItem: false,
    invoiceData: null,
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
  render() {
    const { invoices } = this.props;
    const { showItem, invoiceData } = this.state;
    return (
      <>
        <InvoiceModal
          invoice={invoiceData}
          isOpen={showItem}
          onClose={this.closeModal}
        />

        <Table singleLine color="teal" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Header as="h2" color="teal" textAlign="left">
                  <Icon name="file alternate outline" />
                  Invoices
                </Header>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="4" textAlign="right">
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
                      <Header.Subheader>{invoice.date}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {invoice.delivery_date}
                </Table.Cell>
                <Table.Cell>{invoice.customer.first_name}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Popup
                    trigger={
                      <span style={{ cursor: "pointer", color: "teal" }}>
                        {invoice.balance}
                      </span>
                    }
                    content={`Total: ${invoice.total} | Advance: ${invoice.advance} | Balance: ${invoice.balance}`}
                    position="top center"
                    inverted
                  />
                </Table.Cell>
                <Table.Cell>
                  {invoice.items.map((item, idx) => (
                    <p key={idx}>
                      <Icon
                        name={item.item_type === "Lens" ? "eye" : "square full"}
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
                      <Icon name="pencil alternate" />
                    </Button>
                    <Button
                      icon
                      color="green"
                      onClick={() =>
                        this.props.printInvoice(
                          "invoice",
                          invoice.id,
                          invoice.invoice_number
                        )
                      }
                    >
                      <Icon name="print" />
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
      </>
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
