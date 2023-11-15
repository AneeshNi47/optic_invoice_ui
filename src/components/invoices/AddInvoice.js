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
  Input,
  Segment,
  Placeholder,
  Statistic,
  Radio,
  Form,
  Search,
  Grid,
  Modal,
  Button,
  Header,
  Icon,
} from "semantic-ui-react";

export class AddInvoice extends Component {
  state = {
    selectedCustomer: false,
    editCustomer: true,
    isPercentage: false,
    discount_percentage: 0.0,
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
      left_sphere: null,
      right_sphere: null,
      left_cylinder: null,
      right_cylinder: null,
      left_axis: null,
      right_axis: null,
      left_prism: null,
      right_prism: null,
      left_add: null,
      right_add: null,
      left_ipd: null,
      right_ipd: null,
      pupillary_distance: null,
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
    const today = new Date();
    this.setState({ date: today.toISOString().substr(0, 10) });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
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
      selectedCustomer: true,
      editCustomer: false,
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

  recalculateTotal = () => {
    const { items, discount, discount_percentage, isPercentage, advance } =
      this.state;
    const itemsTotal = items.reduce(
      (total, item) => total + parseFloat(item.sale_value),
      0
    );
    let discountAmount = parseFloat(discount) || 0;
    let totalWithDiscount = itemsTotal;

    if (isPercentage) {
      // Calculate discount based on percentage
      discountAmount = (discount_percentage / 100) * itemsTotal;
      totalWithDiscount = itemsTotal - discountAmount;
    } else {
      // Discount is a flat value
      totalWithDiscount = itemsTotal - discountAmount;
    }

    // Subtract any advance payments
    totalWithDiscount -= parseFloat(advance) || 0;

    this.setState({ total_value: totalWithDiscount.toFixed(2) });
  };

  toggleDiscountType = () => {
    const itemsTotal = this.state.items.reduce(
      (total, item) => total + parseFloat(item.sale_value),
      0
    );
    this.setState(
      (prevState) => ({
        isPercentage: !prevState.isPercentage,
      }),
      () => {
        if (this.state.isPercentage) {
          // Convert flat discount to percentage
          const discountPercentage = (this.state.discount / itemsTotal) * 100;
          this.setState({
            discount_percentage: discountPercentage.toFixed(2),
          });
        } else {
          // Convert percentage discount to flat value
          const discountValue =
            (this.state.discount_percentage / 100) * itemsTotal;
          this.setState({
            discount: discountValue.toFixed(2),
          });
        }
        this.recalculateTotal();
      }
    );
  };

  onDiscountChange = (e) => {
    const { name, value } = e.target;
    let discountValue = value;

    if (name === "discount") {
      this.setState({ discount: discountValue });
    } else if (name === "discount_percentage") {
      this.setState({ discount_percentage: discountValue });
    }
    this.recalculateTotal();
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
        [`${side}_${field}`]: parseFloat(value),
      },
    }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      customer,
      prescription,
      items,
      remarks,
      delivery_date,
      date,
      advance,
      discount,
    } = this.state;
    var modified_customer = customer;
    if (modified_customer.id === null) {
      delete modified_customer.id;
    }
    var invoice = {
      customer: modified_customer,
      prescription: prescription,
      delivery_date: delivery_date,
      date: date,
      remarks: remarks,
      advance: advance,
      discount: discount,
      items: items.map((item) => item.id),
    };
    this.props.addItem("invoice/create", ADD_INVOICE, invoice);
    this.props.closeForm();
  };

  render() {
    const {
      customer,
      editCustomer,
      loading,
      searchValue,
      customer_options,
      items_options,
      date,
      is_taxable,
      delivery_date,
      remarks,
      isPercentage,
      advance,
      discount,
      discount_percentage,
      total_value,
      items,
      prescription,
      searchItemValue,
      prescription_name,
      selectedCustomer,
      editModal,
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
    const genderOptions = [
      { key: "M", value: "M", text: "Male" },
      { key: "F", value: "F", text: "Female" },
      { key: "O", value: "O", text: "Other" },
      { key: "N", value: "N", text: "Prefer not to say" },
    ];
    return (
      <>
        <Modal
          dimmer={"blurring"}
          open={editModal}
          onClose={() => this.setState({ editModal: false })}
        >
          <Modal.Header>Edit Existing User?</Modal.Header>
          <Modal.Content>
            You Are about to edit an existing user, do you want to continue?
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClick={() => this.setState({ editModal: false })}
            >
              No
            </Button>
            <Button
              positive
              onClick={() =>
                this.setState({ editCustomer: true, editModal: false })
              }
            >
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal.Content>
          <Form>
            <Grid padded>
              <Grid.Row columns={1}>
                <Grid.Column textAlign="center">
                  {organization ? (
                    <Header as="h2" color="blue">
                      {organization.name}
                    </Header>
                  ) : (
                    <Placeholder>
                      <Placeholder.Image />
                    </Placeholder>
                  )}
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column>
                  <Segment.Group horizontal>
                    <Segment>
                      <Search
                        loading={loading}
                        placeholder="Search..."
                        onResultSelect={this.selectCustomerFromSearch}
                        onSearchChange={this.onSearchChange}
                        results={customer_options}
                        value={searchValue}
                      />
                    </Segment>
                    <Segment>
                      {/* Conditional Display for Selected Customer */}
                      {selectedCustomer ? (
                        <Grid.Row>
                          <Grid.Column>
                            <Button.Group>
                              <Button
                                color="blue"
                                animated="vertical"
                                onClick={() =>
                                  this.setState({ editModal: true })
                                }
                              >
                                <Button.Content hidden>Edit</Button.Content>
                                <Button.Content visible>
                                  <Icon name="edit" />
                                </Button.Content>
                              </Button>
                              <Button.Or />
                              <Button
                                color="red"
                                animated="vertical"
                                onClick={() =>
                                  this.setState({
                                    selectedCustomer: false,
                                    editCustomer: true,
                                    customer: {
                                      id: null,
                                      phone: "",
                                      email: "",
                                      first_name: "",
                                      last_name: "",
                                      theme_mode: "S",
                                      gender: "",
                                    },
                                  })
                                }
                              >
                                <Button.Content hidden>Delete</Button.Content>
                                <Button.Content visible>
                                  <Icon name="trash" />
                                </Button.Content>
                              </Button>
                            </Button.Group>
                          </Grid.Column>
                        </Grid.Row>
                      ) : null}
                    </Segment>
                  </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Form.Input
                      type="date"
                      fluid
                      icon="calendar"
                      iconPosition="left"
                      name="date"
                      label="Date"
                      value={date}
                      onChange={this.onChange}
                      placeholder="Date"
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* Customer Details Input - Gender, Phone, Email */}
              <Grid.Row columns={3} textAlign="left">
                <Grid.Column>
                  <Form.Select
                    label="Gender"
                    clearable
                    disabled={!editCustomer}
                    icon="dropdown"
                    placeholder="Gender"
                    name="customer.gender"
                    value={customer.gender}
                    onChange={this.handleNestedChange}
                    fluid
                    options={genderOptions}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    disabled={!editCustomer}
                    label="Phone"
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
                    disabled={!editCustomer}
                    label="Email"
                    name="customer.email"
                    value={customer.email}
                    onChange={this.handleNestedChange}
                    placeholder="Email"
                  />
                </Grid.Column>
              </Grid.Row>

              {/* First Name and Last Name Inputs */}
              <Grid.Row columns={2} textAlign="left">
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    disabled={!editCustomer}
                    label="First Name"
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
                    disabled={!editCustomer}
                    label="Last Name"
                    name="customer.last_name"
                    value={customer.last_name}
                    onChange={this.handleNestedChange}
                    placeholder="Last Name"
                  />
                </Grid.Column>
              </Grid.Row>

              {/* Prescription Table */}
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Table celled structured>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell rowSpan="2" textAlign="center">
                          Eye
                        </Table.HeaderCell>
                        {prescriptionFields.map((field) => (
                          <Table.HeaderCell key={field} textAlign="center">
                            {prescription_name[field]}
                          </Table.HeaderCell>
                        ))}
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {["left", "right"].map((side) => (
                        <Table.Row key={side}>
                          <Table.Cell textAlign="center">
                            {prescription_name[side]}
                          </Table.Cell>
                          {prescriptionFields.map((field) => (
                            <Table.Cell key={field}>
                              <Input
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

              {/* Item Search */}
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

              {/* Items Table */}
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Table celled textAlign="center">
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

              {/* Discount and Advance Inputs */}
              <Grid.Row columns={4} textAlign="right">
                <Grid.Column>
                  {/* Discount Radio Button */}
                  <Radio
                    toggle
                    label={this.state.isPercentage ? "00" : "%"}
                    checked={this.state.isPercentage}
                    onChange={this.toggleDiscountType}
                  />
                </Grid.Column>
                <Grid.Column>
                  {/* Discount Input */}
                  {this.state.isPercentage ? (
                    <Form.Input
                      label="Discount Percentage"
                      type="number"
                      fluid
                      name="discount_percentage"
                      value={discount_percentage}
                      onChange={this.onDiscountChange}
                      placeholder="Discount Percentage"
                      disabled={!isPercentage}
                    />
                  ) : (
                    <Form.Input
                      label="Discount Value"
                      type="number"
                      fluid
                      name="discount"
                      value={discount}
                      onChange={this.onDiscountChange}
                      placeholder="Discount Value"
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  {/* Advance Payment Input */}
                  <Form.Input
                    label="Advance"
                    type="number"
                    fluid
                    name="advance"
                    value={advance}
                    onChange={this.onAdvanceChange}
                    placeholder="Advance"
                  />
                </Grid.Column>
              </Grid.Row>

              {/* Total Value Display */}
              <Grid.Row columns={2} textAlign="right">
                <Grid.Column />
                <Grid.Column>
                  <Statistic size="mini">
                    <Statistic.Value>
                      AED {"   "}
                      {total_value}
                    </Statistic.Value>
                    <Statistic.Label>Total Value</Statistic.Label>
                  </Statistic>
                  <Icon
                    color="green"
                    name="refresh"
                    onClick={this.recalculateTotal}
                  />
                </Grid.Column>
              </Grid.Row>

              {/* Remarks and Delivery Date */}
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Segment>
                    <Form.TextArea
                      name="remarks"
                      value={remarks}
                      onChange={this.onChange}
                      placeholder="Remarks"
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Form.Input
                      type="date"
                      fluid
                      label="Delivery Date"
                      name="delivery_date"
                      value={delivery_date}
                      onChange={this.onChange}
                      placeholder="Delivery Date"
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* Taxable Checkbox */}
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Segment>
                    <Form.Checkbox
                      toggle
                      label="Is Taxable?"
                      name="is_taxable"
                      checked={is_taxable}
                      onChange={this.onChange}
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              {/* Submit Button */}
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Button
                    color="green"
                    fluid
                    size="large"
                    onClick={this.onSubmit}
                  >
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
