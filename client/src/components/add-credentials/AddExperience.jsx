import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Redux
import { addExperience } from "../../actions/profileActions";
//Styled Components
import styled from "styled-components";
import StyledLink from "../common/Link";
import Button from "../common/Button";
// Material Ui
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

const Container = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const AddExperienceContainer = styled.div`
  padding: 5% 5%;
  background: #fff;
  margin-top: 5%;
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
`;

const styles = {
  root: {
    color: "#7d48df",
    "&$checked": {
      color: "#7d48df"
    }
  },
  checked: {
    color: "#7d48df"
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

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      city: "",
      state: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      city: this.state.city,
      state: this.state.state,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <Container>
        <AddExperienceContainer>
          <h4>Add Experience</h4>
          <p>Add any experience you feel is worth showing</p>
          <StyledLink href="/dashboard">Go Back</StyledLink>
          <form onSubmit={this.onSubmit}>
            <TextField
              id="company"
              label="Company"
              margin="normal"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              fullWidth={true}
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
            />
            <TextField
              id="title"
              label="Job title"
              margin="normal"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              fullWidth={true}
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
            />
            <TextField
              id="from"
              label="From"
              margin="normal"
              name="from"
              type="date"
              value={this.state.from}
              onChange={this.onChange}
              fullWidth={true}
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
              InputLabelProps={{
                shrink: true
              }}
            />
            <h6>To Date</h6>
            <TextField
              id="to"
              label="To"
              margin="normal"
              name="to"
              type="date"
              disabled={this.state.disabled ? "disabled" : ""}
              value={this.state.to}
              onChange={this.onChange}
              fullWidth={true}
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
              InputLabelProps={{
                shrink: true
              }}
            />
            <div>
              <Checkbox
                checked={this.state.current}
                onChange={this.onCheck}
                id="current"
                name="current"
                value="current"
                classes={{
                  root: classes.root,
                  checked: classes.checked
                }}
              />
              <label htmlFor="current" className="">
                Current Job
              </label>
            </div>
            <TextField
              id="description"
              label="Job description"
              margin="normal"
              multiline={true}
              rows={10}
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              fullWidth={true}
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
            />
            <Button type="submit" value="Submit">
              Submit{" "}
            </Button>
          </form>
        </AddExperienceContainer>{" "}
      </Container>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const styledComponent = withStyles(styles)(AddExperience);

export default connect(mapStateToProps, { addExperience })(
  withRouter(styledComponent)
);
