import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, deleteItem } from "../../actions/crud_operations";
import { printInvoice } from "../../actions/other_operations";
import { GET_INVOICES } from "../../actions/types";
import { Menu, Icon, Table, Grid, Button, Header } from "semantic-ui-react";

class Invoices extends Component {
  static propTypes = {
    invoices: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    printInvoice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItems("invoice", GET_INVOICES);
  }

  render() {
    const { invoices } = this.props;
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Header as="h2">Invoices</Header>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="5" textAlign="right">
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
            <Table.HeaderCell textAlign="center">
              Invoice Number
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Delivery Date
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Total</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Advance</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Balance</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Items</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {invoices.map((invoice, index) => (
            <Table.Row key={index}>
              <Table.Cell textAlign="center">
                <Header as="h4">
                  <Header.Content>
                    {invoice.invoice_number}{" "}
                    <Header.Subheader>{invoice.date}</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell textAlign="center">
                {invoice.delivery_date}
              </Table.Cell>
              <Table.Cell textAlign="center">{invoice.total}</Table.Cell>
              <Table.Cell textAlign="center">{invoice.advance}</Table.Cell>
              <Table.Cell textAlign="center">{invoice.balance}</Table.Cell>
              <Table.Cell textAlign="center">
                {invoice.items.map((item) => (
                  <p>{item.SKU}</p>
                ))}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Grid columns={3} divided>
                  <Grid.Row>
                    <Grid.Column>
                      <Button color="blue" icon>
                        <Icon name="edit" />
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        color="green"
                        icon
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
                    </Grid.Column>
                    <Grid.Column>
                      <Button color="red" icon>
                        <Icon name="trash alternate outline" />
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
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
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
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
})(Invoices);
