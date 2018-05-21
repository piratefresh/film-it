import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { addProfilePicture } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
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
const Button = styled.button`
  padding: 5px;
  background: #e2eef0;
  color: #000;
  border: none;
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
      image: null,
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  fileSelectedHandler = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.image);

    this.props.addProfilePicture(data, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <FormCard>
        <Wrapper>
          <form onSubmit={this.onSubmit} enctype="multipart/form-data">
            <h2>Create Profile</h2>
            <p>Fill this out to make your profile</p>
            <p>* = is required fields</p>
            <FormGroup>
              <TextField
                id="image"
                label="Profile Picture"
                margin="normal"
                name="image"
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
              <SmallText>A unique handle for your profile URL.</SmallText>
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

export default connect(mapStateToProps, { addProfilePicture })(
  withRouter(styledComponent)
);

/* export default withStyles(styles)connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
 */
