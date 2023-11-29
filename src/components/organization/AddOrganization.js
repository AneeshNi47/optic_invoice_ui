import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../../actions/crud_operations";
import { ADD_ITEM, UPDATE_ITEM } from "../../actions/types";
import { Form, Modal, Button } from "semantic-ui-react";

class AddOrganization extends Component {
  state = {
    organization: {
      name: "",
      address_first_line: "",
      email: "",
      secondary_email: "",
      primary_phone_mobile: "",
      other_contact_numbers: "",
      phone_landline: "",
      logo: null,
      translation_required: false,
      country: "",
      city: "",
      post_box_number: "",
      services: "",
      is_active: true,
    },
    staff: {
      first_name: "",
      last_name: "",
      designation: "",
      phone: "",
      email: "",
      staff_superuser: false,
      user: {
        username: "",
        password: "",
      },
    },
  };
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
  };

  handleChange = (e, { name, value }) => {
    if (e.target.type === "file") {
      // For file inputs, use the file itself instead of `value`
      const file = e.target.files[0];
      this.setState((prevState) => ({
        ...prevState,
        organization: {
          ...prevState.organization,
          [name.split(".")[1]]: file,
        },
      }));
    } else {
      const keys = name.split(".");
      if (keys.length === 1) {
        this.setState({ [name]: value });
      } else if (keys.length === 2) {
        const [section, key] = keys;
        this.setState((prevState) => ({
          [section]: {
            ...prevState[section],
            [key]: value,
          },
        }));
      } else if (keys.length === 3) {
        const [section, subSection, key] = keys;
        this.setState((prevState) => ({
          [section]: {
            ...prevState[section],
            [subSection]: {
              ...prevState[section][subSection],
              [key]: value,
            },
          },
        }));
      }
    }
  };

  handleSubmit = () => {
    const { organization, staff } = this.state;

    const { data } = this.props;
    this.setState((prevState) => ({
      staff: {
        ...prevState.staff,
        user: {
          ...prevState.staff.user,
          password: "securepassword0123",
        },
      },
    }));
    const organization_item = {
      organization,
      staff,
    };
    console.log(organization_item);
    if (data) {
      this.props.updateItem(
        "create_organization",
        UPDATE_ITEM,
        data.id,
        organization_item
      );
    } else {
      this.props.addItem("create_organization", ADD_ITEM, organization_item);
    }

    this.setState({
      organization: {
        name: "",
        address_first_line: "",
        email: "",
        secondary_email: "",
        primary_phone_mobile: "",
        other_contact_numbers: "",
        phone_landline: "",
        logo: null,
        translation_required: false,
        country: "",
        city: "",
        post_box_number: "",
        services: "",
        is_active: true,
      },
      staff: {
        first_name: "",
        last_name: "",
        designation: "",
        phone: "",
        email: "",
        staff_superuser: true,
        user: {
          username: "",
          password: "",
        },
      },
    });
    this.props.closeForm();
  };

  render() {
    const { organization, staff } = this.state;

    return (
      <Modal.Content>
        <Form onSubmit={this.handleSubmit}>
          <h2>Add Organization</h2>
          <Form.Group widths="equal">
            <Form.Input
              label="Organization Name"
              name="organization.name"
              value={organization.name}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Address"
              name="organization.address_first_line"
              value={organization.address_first_line}
              onChange={this.handleChange}
            />
          </Form.Group>
          {/* Additional Organization Fields */}
          <Form.Group widths="equal">
            <Form.Input
              label="Email"
              name="organization.email"
              value={organization.email}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Secondary Email"
              name="organization.secondary_email"
              value={organization.secondary_email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Primary Phone/Mobile"
              name="organization.primary_phone_mobile"
              value={organization.primary_phone_mobile}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Other Contact Numbers"
              name="organization.other_contact_numbers"
              value={organization.other_contact_numbers}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Landline Phone"
              name="organization.phone_landline"
              value={organization.phone_landline}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Country"
              name="organization.country"
              value={organization.country}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="City"
              name="organization.city"
              value={organization.city}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Post Box Number"
              name="organization.post_box_number"
              value={organization.post_box_number}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.TextArea
              label="Services"
              name="organization.services"
              value={organization.services}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              type="file"
              label="Organization Logo"
              name="organization.logo"
              onChange={this.handleChange}
            />
          </Form.Group>

          <h2>Staff Details</h2>
          <Form.Group widths="equal">
            <Form.Input
              label="First Name"
              name="staff.first_name"
              value={staff.first_name}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Last Name"
              name="staff.last_name"
              value={staff.last_name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Designation"
              name="staff.designation"
              value={staff.designation}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Email"
              name="staff.email"
              value={staff.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Phone"
              name="staff.phone"
              value={staff.phone}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Username"
              name="staff.user.username"
              value={staff.user.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Input control={Button}>Submit</Form.Input>
        </Form>
      </Modal.Content>
    );
  }
}

export default connect(null, { addItem })(AddOrganization);
