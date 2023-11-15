import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../../actions/crud_operations";
import { ADD_ITEM } from "../../actions/types";
import {
  Form,
  Grid,
  Modal,
  Button,
  Select,
  Statistic,
} from "semantic-ui-react";

export class AddInvoicePayment extends Component {
  state = {
    invoice_data: null,
    invoice_number: "",
    amount: "",
    invoice: "",
    payment_type: "General",
    payment_mode: "Cash",
  };

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { data } = this.props;
    if (data !== null) {
      this.setState({
        invoice_data: data,
        invoice_number: data.invoice_number,
        invoice: data.id,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePaymentTypeChange = (e, { value }) => {
    this.setState({ payment_type: value });
  };
  handlePaymentModeChange = (e, { value }) => {
    this.setState({ payment_mode: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { invoice_number, amount, invoice, payment_type, payment_mode } =
      this.state;
    const invoice_payment_item = {
      invoice_number,
      amount,
      invoice,
      payment_type,
      payment_mode,
    };
    console.log(invoice_payment_item);
    this.props.addItem("invoice-payment", ADD_ITEM, invoice_payment_item);
    this.setState({
      invoice_number: "",
      amount: "",
      invoice: "",
      payment_type: "",
      payment_mode: "",
    });
    this.props.closeForm();
  };

  render() {
    const { amount, payment_type, payment_mode, invoice_data } = this.state;
    const payment_mode_options = [
      { key: "Cash", value: "Cash", text: "Cash" },
      { key: "Card", value: "Card", text: "Card" },
      { key: "Online", value: "Online", text: "Online" },
      { key: "Others", value: "Others", text: "Others" },
    ];
    const payment_type_options = [
      { key: "General", value: "General", text: "General" },
      { key: "Return", value: "Return", text: "Return" },
      { key: "Others", value: "Others", text: "Others" },
    ];
    return (
      <>
        <Modal.Header>Make Payment</Modal.Header>
        <Modal.Content>
          <Form>
            {" "}
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.Input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={this.onChange}
                    placeholder="Amount"
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2}>
                <Grid.Column fluid>
                  <Select
                    placeholder="Payment Mode"
                    name="payment_mode"
                    value={payment_mode}
                    onChange={this.handlePaymentModeChange}
                    options={payment_mode_options}
                  />
                </Grid.Column>
                <Grid.Column fluid>
                  <Select
                    placeholder="Payment Type"
                    name="payment_type"
                    value={payment_type}
                    onChange={this.handlePaymentTypeChange}
                    options={payment_type_options}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Statistic size="mini">
                    <Statistic.Label>Current Balance</Statistic.Label>
                    <Statistic.Value>
                      {invoice_data ? invoice_data.balance : 0}
                    </Statistic.Value>
                  </Statistic>
                  <Statistic
                    color={
                      invoice_data && invoice_data.balance - amount < 0
                        ? "red"
                        : "black"
                    }
                    size="mini"
                  >
                    <Statistic.Label>New Balance</Statistic.Label>
                    <Statistic.Value>
                      {invoice_data ? invoice_data.balance - amount : 0}
                    </Statistic.Value>
                  </Statistic>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            disabled={
              invoice_data && invoice_data.balance - amount < 0 ? true : false
            }
            className="submit"
            onClick={this.onSubmit}
          >
            {"Add"}
          </Button>
        </Modal.Actions>
      </>
    );
  }
}

export default connect(null, { addItem })(AddInvoicePayment);
