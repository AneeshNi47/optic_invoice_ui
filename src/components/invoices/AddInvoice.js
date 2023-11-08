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
import {
  ADD_INVOICE,
  LIST_ITEMS,
  SEARCH_CUSTOMERS,
  SEARCH_INVENTORY,
} from "../../actions/types";
import {
  Table,
  Form,
  Search,
  Grid,
  Image,
  Modal,
  Button,
  Header,
} from "semantic-ui-react";

export class AddInvoice extends Component {
  state = {
    discount_type: "percentage",
    discount_percentage: 0,
    searchValue: "",
    searchItemValue: "",
    loading: false,
    date: "",
    is_taxable: true,
    delivery_date: "",
    remarks: "",
    advance: 0.0,
    discount: 0.0,
    total_value: 0.0,
    customer_options: this.props.customer_search_results,
    items_options: this.props.item_search_results,
    customer: {
      id: null,
      phone: "",
      email: "",
      first_name: "",
      last_name: "",
      theme_mode: "S",
      gender: "",
    },
    prescription: {
      left_sphere: "",
      right_sphere: "",
      left_cylinder: "",
      right_cylinder: "",
      left_axis: "",
      right_axis: "",
      left_prism: "",
      right_prism: "",
      left_add: "",
      right_add: "",
      left_ipd: "",
      right_ipd: "",
      pupillary_distance: "",
    },
    prescription_name: {
      sphere: "SPH",
      cylinder: "CYL",
      axis: "AXIS",
      prism: "PRISM",
      add: "ADD",
      ipd: "IPD",
      left: "L",
      right: "R",
    },
    organization: {},
    total: null,
    selectedItem: {},
    items: [],
  };

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { data, organization } = this.props;
    if (data !== null) {
      this.setState(data);
    }
    if (organization === null) {
      this.props.get_organization();
    }
    this.props.getItems("inventory", LIST_ITEMS);
  }

  toggle_discount_type = (e) => {};
  handleAddItem = () => {
    const { selectedItem, items } = this.state;
    if (selectedItem && !items.includes(selectedItem)) {
      this.setState({
        items: [...items, selectedItem],
        selectedItem: "",
      });
    }
  };

  handleItemChange = (e, { value }) => {
    this.setState({ selectedItem: value });
  };

  handleRemoveItem = (itemToRemove) => {
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item !== itemToRemove),
    }));
  };

  componentDidUpdate(prevProps) {
    // Compare the current props with the previous props
    if (
      this.props.customer_search_results !== prevProps.customer_search_results
    ) {
      this.setState({
        customer_options: this.props.customer_search_results,
      });
    }
    if (this.props.item_search_results !== prevProps.item_search_results) {
      this.setState({
        items_options: this.props.item_search_results,
      });
    }
  }

  onSearchChange = (e, data) => {
    this.setState({
      searchValue: data.value,
    });
    if (data.value.length > 3) {
      this.props.searchItems(
        "search_customer",
        "phone",
        data.value,
        SEARCH_CUSTOMERS
      );
    }
  };

  onSearchItemChange = (e, data) => {
    this.setState({
      searchItemValue: data.value,
    });
    if (data.value.length > 3) {
      this.props.searchItems(
        "search_inventory",
        "type",
        data.value,
        SEARCH_INVENTORY
      );
    }
  };

  selectCustomerFromSearch = (e, data) => {
    const result_customer = data.result.value;
    this.setState({
      customer: {
        id: result_customer.id,
        phone: result_customer.phone,
        email: result_customer.email,
        first_name: result_customer.first_name,
        last_name: result_customer.last_name,
        theme_mode: "S",
        gender: result_customer.gender,
      },
    });
  };

  selectItemFromSearch = (e, data) => {
    const result_item = data.result.value;
    if (result_item && !this.state.items.includes(result_item)) {
      var new_items = [...this.state.items, result_item];
      this.setState({
        items: new_items,
        total_value:
          new_items.reduce(
            (total, item) => total + parseFloat(item.sale_value),
            0
          ) -
          this.state.advance -
          this.state.discount,
      });
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  recalculateTotal = () => {
    const { items, discount, advance } = this.state;
    const itemsTotal = items.reduce(
      (total, item) => total + parseFloat(item.sale_value),
      0
    );
    const discountAmount = parseFloat(discount) || 0; // handle the case where discount is empty or not a number
    const totalWithDiscount = itemsTotal - discountAmount - advance;

    this.setState({ total_value: totalWithDiscount });
  };

  onDiscountChange = (e) => {
    const newDiscount = e.target.value;

    // Set the new discount
    this.setState({ discount: newDiscount }, () => {
      // Recalculate the total price after the state has been updated
      this.recalculateTotal();
    });
  };
  onAdvanceChange = (e) => {
    const newAdvance = e.target.value;

    // Set the new discount
    this.setState({ advance: newAdvance }, () => {
      // Recalculate the total price after the state has been updated
      this.recalculateTotal();
    });
  };

  handleNestedChange = (e, { name, value }) => {
    const keys = name.split(".");
    if (keys.length === 1) {
      this.setState({ [name]: value });
    } else {
      const [section, key] = keys;
      this.setState((prevState) => ({
        [section]: {
          ...prevState[section],
          [key]: value,
        },
      }));
    }
  };

  handlePrescriptionChange = (side, field, value) => {
    this.setState((prevState) => ({
      prescription: {
        ...prevState.prescription,
        [`${side}_${field}`]: value,
      },
    }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    const invoice = this.state;
    console.log(invoice);
    this.props.closeForm();
  };

  render() {
    const {
      customer,
      loading,
      searchValue,
      customer_options,
      items_options,
      date,
      is_taxable,
      delivery_date,
      remarks,
      advance,
      discount,
      discount_percentage,
      total_value,
      items,
      prescription,
      searchItemValue,
      prescription_name,
    } = this.state;
    const { organization } = this.props;
    const prescriptionFields = [
      "sphere",
      "cylinder",
      "axis",
      "prism",
      "add",
      "ipd",
    ];
    return (
      <>
        <Modal.Content>
          <Form>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column textAlign="center">
                  {organization ? (
                    <Header size="huge">{organization.name}</Header>
                  ) : (
                    <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
                  )}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Search
                    loading={loading}
                    placeholder="Search..."
                    onResultSelect={this.selectCustomerFromSearch}
                    onSearchChange={this.onSearchChange}
                    results={customer_options}
                    value={searchValue}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.phone"
                    value={customer.phone}
                    onChange={this.handleNestedChange}
                    placeholder="Phone"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.email"
                    value={customer.email}
                    onChange={this.handleNestedChange}
                    placeholder="Email"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.first_name"
                    value={customer.first_name}
                    onChange={this.handleNestedChange}
                    placeholder="First Name"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.last_name"
                    value={customer.last_name}
                    onChange={this.handleNestedChange}
                    placeholder="Last Name"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell />
                        {prescriptionFields.map((field) => (
                          <Table.HeaderCell key={field}>
                            {prescription_name[field]}
                          </Table.HeaderCell>
                        ))}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {["left", "right"].map((side) => (
                        <Table.Row key={side}>
                          <Table.Cell>{prescription_name[side]}</Table.Cell>
                          {prescriptionFields.map((field) => (
                            <Table.Cell key={field}>
                              <Form.Input
                                fluid
                                type="number"
                                step=".01"
                                name={`${side}_${field}`}
                                value={prescription[`${side}_${field}`]}
                                onChange={(e, { value }) =>
                                  this.handlePrescriptionChange(
                                    side,
                                    field,
                                    value
                                  )
                                }
                              />
                            </Table.Cell>
                          ))}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <Form.Input
                    type="date"
                    fluid
                    name="date"
                    value={date}
                    onChange={this.onChange}
                    placeholder="Date"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="date"
                    fluid
                    name="delivery_date"
                    value={delivery_date}
                    onChange={this.onChange}
                    placeholder="Delivery Date"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Search
                    loading={loading}
                    placeholder="Search Items"
                    onResultSelect={this.selectItemFromSearch}
                    onSearchChange={this.onSearchItemChange}
                    results={items_options}
                    value={searchItemValue}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Item</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {items.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.description}</Table.Cell>
                          <Table.Cell>{item.sale_value}</Table.Cell>
                          <Table.Cell>
                            <Button
                              color="red"
                              icon="trash"
                              onClick={() => this.handleRemoveItem(item)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                      <Table.Row>
                        <Table.Cell colSpan={2} textAlign="right">
                          Total
                        </Table.Cell>
                        <Table.Cell colSpan={2}>
                          {items.reduce(
                            (total, item) =>
                              total + parseFloat(item.sale_value),
                            0
                          )}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={4} textAlign="center">
                <Grid.Column></Grid.Column>
                <Grid.Column></Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    fluid
                    name="discount"
                    value={discount}
                    onChange={this.onDiscountChange}
                    placeholder="Discount"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    fluid
                    name="discount_percentage"
                    value={discount_percentage}
                    onChange={this.onDiscountChange}
                    placeholder="Discount"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column></Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    fluid
                    name="advance"
                    value={advance}
                    onChange={this.onAdvanceChange}
                    placeholder="Advance"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column></Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    fluid
                    disabled
                    label="Grand Total"
                    name="total_value"
                    value={total_value}
                    placeholder="0.0"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.TextArea
                    name="remarks"
                    value={remarks}
                    onChange={this.onChange}
                    placeholder="Remarks"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.Checkbox
                    label="Is Taxable?"
                    name="is_taxable"
                    checked={is_taxable}
                    onChange={this.onChange}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1}>
                <Grid.Column>
                  <Button className="submit" onClick={this.onSubmit}>
                    Submit
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
  customers: state.customerReducer.customers,
  customer_search_results: state.customerReducer.customer_search_results,
  item_search_results: state.inventoryReducer.item_search_results,
  prescription: state.prescriptionReducer.prescriptions,
});

export default connect(mapStateToProps, {
  addItem,
  updateItem,
  getItems,
  searchItems,
  get_organization,
})(AddInvoice);
