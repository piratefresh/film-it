import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  addProfilePicture,
  getCurrentProfile
} from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
// Styled Components
import Button from "../common/Button";
//Import Material-UI input field
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const FormCard = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  padding: 20px;
  margin: 60px 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  grid-gap: 20px;
  background: #fff;
  width: 270px;
  margin: 5% auto;
`;
const FormGroup = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;
const SmallText = styled.p`
  font-size: 0.6rem;
`;

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

class AddProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  fileSelectedHandler = e => {
    this.setState({
      avatar: e.target.files[0]
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("avatar", this.state.avatar);

    this.props.addProfilePicture(data, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <FormCard>
        <Wrapper>
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <h2>Create Profile</h2>
            <p>Fill this out to make your profile</p>
            <p>* = is required fields</p>
            <FormGroup>
              <TextField
                id="avatar"
                label="Profile Picture"
                margin="normal"
                name="avatar"
                type="file"
                onChange={this.fileSelectedHandler}
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
                required
              />
              <SmallText>Change Your Profile Picture.</SmallText>
            </FormGroup>
            <Button
              type="submit"
              value="Submit"
              style={{
                background: "#7d48df",
                margin: "3% auto",
                width: "100%",
                color: "#fff"
              }}
            >
              Submit
            </Button>
          </form>
        </Wrapper>
      </FormCard>
    );
  }
}

AddProfilePic.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const styledComponent = withStyles(styles)(AddProfilePic);

export default connect(mapStateToProps, {
  addProfilePicture,
  getCurrentProfile
})(withRouter(styledComponent));

/* export default withStyles(styles)connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
 */
