import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    color: "#000"
  },
  underline: {
    "&:after": {
      borderBottom: "3px solid #7d48df"
    }
  }
};

function ClassesNesting(props) {
  const { classes } = props;

  return (
    <TextField
      id="handle"
      label="Handle"
      margin="normal"
      FormHelperTextProps={{
        classes: {
          root: classes.label,
          focused: classes.focused
        }
      }}
      InputProps={{
        classes: {
          underline: classes.underline
        }
      }}
    />
  );
}

ClassesNesting.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ClassesNesting);
