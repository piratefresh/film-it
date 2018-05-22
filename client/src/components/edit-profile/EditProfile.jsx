import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
// Styled Components
import Button from "../common/Button";
import Link from "../common/Link";
//Import Material-UI input field
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
const SmallSpan = styled.span`
  font-size: 0.6rem;
`;
const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      website: "",
      state: "",
      city: "",
      company: "",
      bio: "",
      role: "",
      skills: "",
      twitter: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");
      // if profile field dosen't exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.state = !isEmpty(profile.state) ? profile.state : "";
      profile.city = !isEmpty(profile.city) ? profile.city : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.skills = !isEmpty(profile.skills) ? profile.skills : "";
      profile.role = !isEmpty(profile.role) ? profile.role : "";
      profile.social = !isEmpty(profile.social) ? profile.social : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        city: profile.city,
        state: profile.state,
        company: profile.company,
        bio: profile.bio,
        role: profile.role,
        skills: profile.skills,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("handle", this.state.handle);
    data.append("website", this.state.website);
    data.append("city", this.state.city);
    data.append("state", this.state.state);
    data.append("company", this.state.company);
    data.append("bio", this.state.bio);
    data.append("role", this.state.role);
    data.append("skills", this.state.skills);
    data.append("twitter", this.state.twitter);
    data.append("facebook", this.state.facebook);
    data.append("instagram", this.state.instagram);
    data.append("linkedin", this.state.linkedin);
    data.append("youtube", this.state.youtube);

    this.props.createProfile(data, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  fileSelectedHandler = e => {
    this.setState({
      avatar: e.target.files[0]
    });
    console.log(this.state.avatar);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { classes } = this.props;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <SocialWrapper>
          <TextField
            id="facebook"
            label="Facebook URL"
            margin="normal"
            name="facebook"
            value={this.state.facebook}
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
            id="instagram"
            label="Instagram URL"
            margin="normal"
            name="instagram"
            value={this.state.instagram}
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
            id="linkedin"
            label="Linkedin URL"
            margin="normal"
            name="linkedin"
            value={this.state.linkedin}
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
            id="twitter"
            label="Twitter URL"
            margin="normal"
            name="twitter"
            value={this.state.twitter}
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
        </SocialWrapper>
      );
    }
    return (
      <FormCard>
        <Wrapper>
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <h2>Edit Profile</h2>
            <p>* = is required fields</p>
            <FormGroup>
              <TextField
                id="handle"
                label="Handle"
                margin="normal"
                name="handle"
                value={this.state.handle}
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
                required
              />
              <SmallText>A unique handle for your profile URL.</SmallText>
              <Link href="profile-picture">
                <Button type="button">Change profile picture</Button>
              </Link>
              <TextField
                id="city"
                label="City"
                margin="normal"
                name="city"
                value={this.state.city}
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
                required
              />
              <SmallText>
                Which city you reside in. full city name (eg. Philadelphia not
                Philly).
              </SmallText>
              <TextField
                id="state"
                label="State"
                margin="normal"
                name="state"
                value={this.state.state}
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
                required
              />
              <SmallText>
                Which state you reside in. Abbreviate state names (Eg. PA)
              </SmallText>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="department-helper">Department</InputLabel>
                <Select
                  id="role"
                  name="role"
                  value={this.state.role}
                  onChange={this.onChange}
                  inputProps={{
                    name: "role",
                    id: "department-simple"
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Art Department"}>Art Department</MenuItem>
                  <MenuItem value={"Camera Department"}>
                    Camera Department
                  </MenuItem>
                  <MenuItem value={"Lighting & Grip Department"}>
                    Lighting & Grip Department
                  </MenuItem>
                  <MenuItem value={"Makeup & Wardrobe Department"}>
                    Makeup & Wardrobe Department
                  </MenuItem>
                  <MenuItem value={"Production Department"}>
                    Production Department
                  </MenuItem>
                  <MenuItem value={"Script & VTR Department"}>
                    Lighting & Grip Department
                  </MenuItem>
                  <MenuItem value={"Sound Department"}>
                    Sound Department
                  </MenuItem>
                  <MenuItem value={"Stunts & FX Department"}>
                    Stunts & FX Department
                  </MenuItem>
                </Select>
                <FormHelperText>Select your prefered department</FormHelperText>
              </FormControl>
              <TextField
                id="company"
                label="School/Company"
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
              <SmallText>Where you currently work/study</SmallText>
              <TextField
                id="skills"
                label="Skills"
                margin="normal"
                name="skills"
                value={this.state.skills}
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
                required
              />
              <SmallText>
                Please use comma separated values (eg.
                Editing,Lightning,Camera,Adobe)
              </SmallText>
              <TextField
                id="website"
                label="Website URL"
                margin="normal"
                name="website"
                value={this.state.website}
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
              <SmallText>URL to your personal/company website</SmallText>
              <TextField
                id="bio"
                label="Bio"
                margin="normal"
                multiline={true}
                rows={10}
                name="bio"
                value={this.state.bio}
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
              <SmallText>Tell us a little about yourself</SmallText>
            </FormGroup>
            <div className="social-toggle">
              <Button
                onClick={e => {
                  e.preventDefault();
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
              >
                Add Social Network Links
              </Button>
              <SmallSpan>Optional</SmallSpan>
            </div>;
            {socialInputs}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

const styledComponent = withStyles(styles)(CreateProfile);

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(styledComponent)
);

/* export default withStyles(styles)connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
 */
