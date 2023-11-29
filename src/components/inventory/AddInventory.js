import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addItem,
  updateItem,
  getItems,
  searchItems,
  get_organization,
} from "../../actions/crud_operations";
import { ADD_ITEM, UPDATE_ITEM } from "../../actions/types";
import { Form, Grid, Modal, Button, Select } from "semantic-ui-react";

export class AddInventory extends Component {
  state = {
    isMobile: window.innerWidth <= 600,
    store_sku: "",
    name: "",
    description: "",
    qty: 0,
    sale_value: 0,
    cost_value: 0,
    brand: "",
    is_active: true,
    item_type: "Lens",
  };

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
  };
  componentDidMount() {
    const { data } = this.props;
    if (data !== null) {
      this.setState({
        store_sku: data.store_sku,
        name: data.name,
        description: data.description,
        qty: data.qty,
        sale_value: data.sale_value,
        cost_value: data.cost_value,
        brand: data.brand,
        item_type: data.item_type,
      });
    }
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 600 });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelectChange = (e, { value }) => {
    this.setState({ item_type: value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      store_sku,
      name,
      description,
      qty,
      sale_value,
      cost_value,
      brand,
      is_active,
      item_type,
    } = this.state;
    const { data } = this.props;
    const inventory_item = {
      store_sku,
      name,
      description,
      qty,
      sale_value,
      cost_value,
      brand,
      is_active,
      item_type,
    };
    if (data) {
      this.props.updateItem("inventory", UPDATE_ITEM, data.id, inventory_item);
    } else {
      this.props.addItem("inventory", ADD_ITEM, inventory_item);
    }

    this.setState({
      store_sku: "",
      name: "",
      description: "",
      qty: 0,
      sale_value: 0,
      cost_value: 0,
      brand: "",
      is_active: true,
      item_type: "",
    });
    this.props.closeForm();
  };

  render() {
    const {
      name,
      store_sku,
      description,
      qty,
      sale_value,
      cost_value,
      brand,
      item_type,
    } = this.state;
    const itemTypeOptions = [
      { key: "Lens", value: "Lens", text: "Lens" },
      { key: "Frames", value: "Frames", text: "Frames" },
      { key: "Others", value: "Others", text: "Others" },
    ];
    return (
      <>
        <Modal.Content
          style={this.state.isMobile ? { width: "100%", margin: "0" } : {}}
        >
          <Form>
            <Grid padded stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    name="store_sku"
                    value={store_sku}
                    onChange={this.onChange}
                    placeholder="Store SKU"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    name="qty"
                    value={qty}
                    onChange={this.onChange}
                    placeholder="Quantity"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    placeholder="Name"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.TextArea
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    placeholder="Description"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    label="Sale Price"
                    name="sale_value"
                    step=".1"
                    value={sale_value}
                    onChange={this.onChange}
                    placeholder="Sale Value"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    label="Cost Price"
                    type="number"
                    name="cost_value"
                    step=".1"
                    value={cost_value}
                    onChange={this.onChange}
                    placeholder="Cost Value"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    name="brand"
                    value={brand}
                    onChange={this.onChange}
                    placeholder="Brand"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Select
                    placeholder="Select your Item Type"
                    name="item_type"
                    value={item_type}
                    onChange={this.handleSelectChange}
                    options={itemTypeOptions}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Button
                    positive
                    className={`submit ${
                      this.state.isMobile ? "mobile-submit" : ""
                    }`}
                    onClick={this.onSubmit}
                  >
                    {this.props.data ? "Update" : "Add"}
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.authReducer.organization,
  inventory: state.inventoryReducer.inventory,
});

export default connect(mapStateToProps, {
  addItem,
  updateItem,
  getItems,
  searchItems,
  get_organization,
})(AddInventory);
