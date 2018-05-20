import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 300,
    margin: 100
  },
  resize: {
    fontSize: 50
  }
};

const FieldText = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  helperText,
  props
}) => {
  <TextField
    id="with-placeholder"
    label={label}
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={onChange}
    disabled={disabled}
    helperText={helperText}
  />;
};

FieldText.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

FieldText.defaultProps = {
  type: "text"
};

export default withStyles(styles)(FieldText);
