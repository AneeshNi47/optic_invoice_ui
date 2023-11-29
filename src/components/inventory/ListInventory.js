import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, deleteItem } from "../../actions/crud_operations";
import { GET_ITEMS, DELETE_ITEM } from "../../actions/types";
import { Icon, Table, Grid, Button, Header, Modal } from "semantic-ui-react";

class ListInventory extends Component {
  state = {
    showDeleteModal: false,
    itemId: null,
  };
  static propTypes = {
    inventory: PropTypes.array.isRequired,
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItems("inventory", GET_ITEMS);
  }
  openDeleteModal = (id) => {
    this.setState({
      showDeleteModal: true,
      itemId: id,
    });
  };
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
      itemId: null,
    });
  };

  render() {
    const { items } = this.props;
    const { showDeleteModal, itemId } = this.state;
    return (
      <div className="inventorylisttable">
        <Modal
          basic
          onClose={() => this.closeDeleteModal()}
          open={showDeleteModal}
          size="small"
        >
          <Header icon>
            <Icon name="archive" />
            Delete Item
          </Header>
          <Modal.Content>
            <p>Are You sure you want to delete the Item?</p>
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
                this.props.deleteItem("inventory", DELETE_ITEM, itemId);
                this.closeDeleteModal();
              }}
            >
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Table sortable className="non-stacking-table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Header as="h2">Inventory</Header>
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
              <Table.HeaderCell textAlign="center">SKU</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Sale Value</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Cost Value</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {items.map((item, index) => (
              <Table.Row key={index} color="red">
                <Table.Cell textAlign="center">{item.SKU}</Table.Cell>
                <Table.Cell textAlign="center">{item.name}</Table.Cell>
                <Table.Cell textAlign="center">{item.qty}</Table.Cell>
                <Table.Cell textAlign="center">{item.sale_value}</Table.Cell>
                <Table.Cell textAlign="center">{item.cost_value}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Grid columns={2} divided>
                    <Grid.Row>
                      <Grid.Column>
                        <Button
                          color="blue"
                          icon
                          onClick={() => this.props.openForm(item)}
                        >
                          <Icon name="edit" />
                        </Button>
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          color="red"
                          icon
                          onClick={() => this.openDeleteModal(item.id)}
                        >
                          <Icon name="trash alternate outline" />
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
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
  items: state.inventoryReducer.items,
});

export default connect(mapStateToProps, {
  getItems,
  deleteItem,
})(ListInventory);
