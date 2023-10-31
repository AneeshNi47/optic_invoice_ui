import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListInventory from "./ListInventory";
import AddInventory from "./AddInventory";
import { loadUser, get_users } from "../../actions/auth";
import { Modal } from "semantic-ui-react";

class InventoryDashboard extends Component {
  state = {
    addInventoryForm: false,
    formOpenType: "view",
    editInventoryData: null,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    get_users: PropTypes.func.isRequired,
  };
  onOpenForm = (data) =>
    this.setState({ addInventoryForm: true, editInventoryData: data });

  handleClose = () => this.setState({ addInventoryForm: false });
  setFormType = (type) =>
    this.setState({
      formOpenType: type,
    });
  render() {
    const { addInventoryForm, editInventoryData, formOpenType } = this.state;
    return (
      <>
        <ListInventory
          openForm={this.onOpenForm}
          setFormType={(type) => this.setFormType(type)}
        />

        <Modal size="small" open={addInventoryForm} onClose={this.handleClose}>
          <AddInventory
            closeForm={this.handleClose}
            data={editInventoryData}
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
  InventoryDashboard
);
