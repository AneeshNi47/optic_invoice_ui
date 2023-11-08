import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListOrganization from "./ListOrganization";
import AddOrganization from "./AddOrganization";
import { loadUser, get_users } from "../../actions/auth";
import { Modal } from "semantic-ui-react";

class OrganizationDashboard extends Component {
  state = {
    addOrganizationForm: false,
    formOpenType: "view",
    editOrganizationData: null,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    get_users: PropTypes.func.isRequired,
  };
  onOpenForm = (data) =>
    this.setState({ addOrganizationForm: true, editOrganizationData: data });

  handleClose = () => this.setState({ addOrganizationForm: false });
  setFormType = (type) =>
    this.setState({
      formOpenType: type,
    });
  render() {
    const { addOrganizationForm, editOrganizationData, formOpenType } =
      this.state;
    return (
      <>
        <ListOrganization
          openForm={this.onOpenForm}
          setFormType={(type) => this.setFormType(type)}
        />

        <Modal
          size="small"
          open={addOrganizationForm}
          onClose={this.handleClose}
        >
          <AddOrganization
            closeForm={this.handleClose}
            data={editOrganizationData}
            formOpenType={formOpenType}
          />
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

export default connect(mapStateToProps, { loadUser, get_users })(
  OrganizationDashboard
);
