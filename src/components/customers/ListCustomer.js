import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, deleteItem } from "../../actions/crud_operations";
import { GET_CUSTOMERS, DELETE_CUSTOMER } from "../../actions/types";
import { Icon, Table, Button, Header, Modal } from "semantic-ui-react";

class ListCustomers extends Component {
  state = {
    showDeleteModal: false,
    customerId: null,
  };
  static propTypes = {
    customers: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItems("customer", GET_CUSTOMERS);
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
    const { customers } = this.props;
    const { showDeleteModal, itemId } = this.state;
    return (
      < div className="customerlisttable">
        <Modal
          basic
          onClose={() => this.closeDeleteModal()}
          open={showDeleteModal}
          size="small"
        >
          <Header icon>
            <Icon name="archive" />
            Delete Customer
          </Header>
          <Modal.Content>
            <p>Are You sure you want to delete the Customer?</p>
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
            <Button
              color="red"
              inverted
              onClick={() => {
                this.props.deleteItem("customer", DELETE_CUSTOMER, itemId);
                this.closeDeleteModal();
              }}
            >
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
                  Customers
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
              <Table.HeaderCell textAlign="left">Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Phone</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Email</Table.HeaderCell>
              <Table.HeaderCell textAlign="left">
                Portal Access
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="left">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {customers.map((customer, index) => (
              <Table.Row key={index}>
                <Table.Cell textAlign="left">
                  <Icon
                    color={
                      customer.gender === "M"
                        ? "blue"
                        : customer.gender === "F"
                        ? "pink"
                        : "black"
                    }
                    name={
                      customer.gender === "M"
                        ? "male"
                        : customer.gender === "F"
                        ? "female"
                        : "dont"
                    }
                  ></Icon>
                  {customer.first_name} {customer.last_name}
                </Table.Cell>
                <Table.Cell textAlign="left">{customer.phone}</Table.Cell>
                <Table.Cell textAlign="left">{customer.email}</Table.Cell>
                <Table.Cell textAlign="left">
                  {customer.user ? "Yes" : "No"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button.Group>
                    <Button
                      color="blue"
                      icon
                      onClick={() => this.props.openForm(customer)}
                    >
                      <Icon name="edit" />
                    </Button>
                    <Button
                      color="red"
                      icon
                      onClick={() => this.openDeleteModal(customer.id)}
                    >
                      <Icon name="trash alternate outline" />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  customers: state.customerReducer.customers,
});

export default connect(mapStateToProps, {
  getItems,
  deleteItem,
})(ListCustomers);
