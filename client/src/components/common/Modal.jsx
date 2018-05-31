import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { addApplication } from "../../actions/postActions";
// Material Ui
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "../common/Button";

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

const BackDropStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;
const ModalStyle = styled.div`
  position: fixed;
  background: white;
  padding: 10% 5%;
  width: 80%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverletter: "",
      name: "",
      email: "",
      handle: "",
      avatar: "",
      jobType: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile && nextProps.auth.user) {
      const profile = nextProps.profile.profile;
      const user = nextProps.auth.user;

      this.setState({
        coverletter: this.state.coverletter,
        name: user.name,
        email: user.email,
        handle: profile.handle,
        avatar: profile.avatar,
        jobType: this.state.jobType
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const applicationData = {
      coverletter: this.state.coverletter,
      name: this.state.name,
      email: this.state.email,
      handle: this.state.handle,
      avatar: this.state.avatar,
      jobType: this.state.jobType
    };
    const postID = this.props.post.post._id;
    console.log(applicationData);
    this.props.addApplication(postID, applicationData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <BackDropStyle>
        <ModalStyle>
          {errors.alreadyapplied === null ? null : (
            <h3 style={{ color: "#fd381e" }}>{errors.alreadyapplied}</h3>
          )}
          {this.props.children}
          <form onSubmit={this.onSubmit}>
            <TextField
              id="jobType"
              label="Name of the position/role you are interested in."
              margin="normal"
              name="jobType"
              value={this.state.jobType}
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
            <TextField
              id="coverletter"
              label="Describe what you can offer the project."
              margin="normal"
              name="coverletter"
              multiline
              rows="10"
              value={this.state.coverletter}
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
            <div className="footer">
              <Button type="submit" value="Submit">
                Submit
              </Button>
              <Button
                style={{
                  background: "#000",
                  color: "#fff",
                  margin: "0 5%"
                }}
                onClick={this.props.onClose}
              >
                Close
              </Button>
            </div>
          </form>
        </ModalStyle>
      </BackDropStyle>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addApplication: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
  errors: state.errors
});

const styledComponent = withStyles(styles)(Modal);

export default connect(mapStateToProps, { addApplication })(
  withRouter(styledComponent)
);
