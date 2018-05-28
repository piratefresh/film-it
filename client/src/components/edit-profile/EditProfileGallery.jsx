import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  addGalleryPicture,
  getCurrentProfile
} from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
// Styled Components
import Button from "../common/Button";
import FormCard from "../common/FormCard";
//Import Material-UI input field
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

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
const ProfileGalleryPreview = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 100px);
  grid-template-rows: 100px 100px 100px;
  grid-auto-flow: column;
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

class EditProfileGallery extends Component {
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
      image: e.target.files[0]
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.image);

    this.props.addGalleryPicture(data, this.props.history);
  }

  onDeleteClick(id) {
    this.props.deleteGalleryPicture(id);
  }

  render() {
    const { classes } = this.props;
    return (
      <FormCard>
        <Wrapper>
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <h2>Add Picture to Gallery</h2>
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

EditProfileGallery.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

const styledComponent = withStyles(styles)(EditProfileGallery);

export default connect(mapStateToProps, {
  addGalleryPicture,
  getCurrentProfile
})(withRouter(styledComponent));

/* export default withStyles(styles)connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
 */
