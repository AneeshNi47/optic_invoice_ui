import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../actions/crud_operations"; // Assuming you have this action
import { GET_ORGANIZATIONS } from "../../actions/types";
import { Icon, Table, Radio, Button, Header } from "semantic-ui-react";

class ListOrganizations extends Component {
  static propTypes = {
    organizations: PropTypes.array.isRequired,
    getOrganizations: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getItems("list_organization", GET_ORGANIZATIONS); // Assuming you have this action
  }

  toggleOrganizationStatus = (organization) => {};
  render() {
    const { organizations } = this.props;
    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <Header as="h2">Organizations</Header>
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
            <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Primary Phone
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Staff Count</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Superstaff First Name
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Subscription Status
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Latest Payment
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Active</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {organizations.map((organization, index) => (
            <Table.Row key={index}>
              <Table.Cell textAlign="center">{organization.name}</Table.Cell>
              <Table.Cell textAlign="center">{organization.email}</Table.Cell>
              <Table.Cell textAlign="center">
                {organization.primary_phone_mobile}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {organization.staff_count}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {organization.superstaff_first_name}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {organization.subscription_status
                  ? organization.subscription_status.status
                  : ""}
              </Table.Cell>
              <Table.Cell textAlign="center">
                {organization.subscription_status
                  ? organization.subscription_status.latest_payment
                    ? `${organization.subscription_status.latest_payment.amount} on ${organization.subscription_status.latest_payment.created_on}`
                    : ""
                  : ""}
              </Table.Cell>
              <Table.Cell>
                <Radio
                  toggle
                  checked={organization.is_active}
                  onChange={this.toggleOrganizationStatus}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  organizations: state.organizationReducer.organizations, // Assuming you have this in your state
});

export default connect(mapStateToProps, {
  getItems,
})(ListOrganizations);
