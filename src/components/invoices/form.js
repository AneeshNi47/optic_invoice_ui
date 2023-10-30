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
  Dropdown,
  Table,
  Form,
  Search,
  Grid,
  Image,
  Modal,
  Button,
  Header,
} from "semantic-ui-react";

export class InvoiceForm extends Component {
  state = {
    searchValue: "",
    loading: false,
    date: "",
    is_taxable: true,
    delivery_date: "",
    remarks: "",
    advance: 0.0,
    discount: 0.0,
    customer_options: this.props.customer_search_results,
    customer: {
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
  }

  onSearchChange = (e, data) => {
    this.setState({
      searchValue: data.value,
    });
    if (data.value.length > 3) {
      this.props.searchItems("search_customer", data.value, SEARCH_CUSTOMERS);
    }
  };

  selectCustomerFromSearch = (e, data) => {
    console.log(data.result.value);
    const result_customer = data.result.value;
    this.setState({
      customer: {
        phone: result_customer.phone,
        email: result_customer.email,
        first_name: result_customer.first_name,
        last_name: result_customer.last_name,
        theme_mode: "S",
        gender: result_customer.gender,
      },
    });
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
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
    console.log(this.state);
    this.props.closeForm();
  };

  render() {
    const {
      customer,
      loading,
      searchValue,
      customer_options,
      date,
      is_taxable,
      delivery_date,
      remarks,
      advance,
      discount,
      items,
      selectedItem,
      prescription,
      prescription_name,
    } = this.state;
    const { organization } = this.props;
    const itemOptions = [
      { key: "item1", text: "Item 1", value: "Item 1" },
      { key: "item2", text: "Item 2", value: "Item 2" },
      // add other item options here...
    ];
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

              <Grid.Row columns={1} textAlign="right">
                <Search
                  loading={loading}
                  placeholder="Search..."
                  onResultSelect={this.selectCustomerFromSearch}
                  onSearchChange={this.onSearchChange}
                  results={customer_options}
                  value={searchValue}
                />
              </Grid.Row>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.phone"
                    value={customer.phone}
                    onChange={this.onChange}
                    placeholder="Phone"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.email"
                    value={customer.email}
                    onChange={this.onChange}
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
                    onChange={this.onChange}
                    placeholder="First Name"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="text"
                    fluid
                    name="customer.last_name"
                    value={customer.last_name}
                    onChange={this.onChange}
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
                        <Table.Row key={item}>
                          <Table.Cell>{item}</Table.Cell>
                          <Table.Cell>
                            <Button
                              color="red"
                              icon="trash"
                              onClick={() => this.handleRemoveItem(item)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>

                    <Table.Footer fullWidth>
                      <Table.Row>
                        <Table.HeaderCell>
                          <Dropdown
                            fluid
                            selection
                            options={itemOptions}
                            value={selectedItem}
                            onChange={this.handleItemChange}
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <Button
                            color="green"
                            icon="add"
                            content="Add Item"
                            onClick={this.handleAddItem}
                          />
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
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

              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <Form.Input
                    type="number"
                    fluid
                    name="discount"
                    value={discount}
                    onChange={this.onChange}
                    placeholder="Discount"
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    fluid
                    name="advance"
                    value={advance}
                    onChange={this.onChange}
                    placeholder="Advance"
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
  item_search_result: state.inventoryReducer.item_search_results,
  prescription: state.prescriptionReducer.prescriptions,
});

export default connect(mapStateToProps, {
  addItem,
  updateItem,
  getItems,
  searchItems,
  get_organization,
})(InvoiceForm);
