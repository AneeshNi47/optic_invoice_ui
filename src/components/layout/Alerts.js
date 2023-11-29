import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) {
        toast.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) toast.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message)
        toast.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        toast.error(error.msg.non_field_errors.join());
      if (error.msg.username) toast.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.itemAdded) toast.success(message.itemAdded);
      if (message.itemUpdated) toast.success(message.itemUpdated);
      if (message.itemDeleted) toast.success(message.itemDeleted);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errorReducer,
  message: state.messageReducer,
});
export default connect(mapStateToProps)(Alerts);
