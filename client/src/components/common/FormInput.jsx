import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    color: "#000"
  },
  underline: {
    "&:after": {
      borderBottom: "3px solid #7d48df",
      backgroundColor: "#7d48df"
    }
  },
  formControl: {
    minWidth: "100%"
  }
};

const FormInput = () => {
  const { errors } = this.state;
  <TextField
    FormHelperTextProps={{
      classes: {
        root: classes.label
      }
    }}
    InputProps={{
      classes: {
        underline: classes.underline
      }
    }}
  />;
};

export default withStyles(styles)(FormInput);
