import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

//Import Material-UI input field
import {
  withStyles,
  MuiThemeProvider as ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextFields from "@material-ui/core/TextField";
import TextField from "material-ui/TextField";
import SelectList from "../common/SelectList";

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
const Button = styled.button`
  padding: 5px;
  background: #e2eef0;
  color: #000;
  border: none;
`;
const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    "&$cssFocused": {
      color: "#7d48df"
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#7d48df"
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: "#7d48df"
  }
});

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      website: "",
      location: "",
      phone: "",
      company: "",
      bio: "",
      role: "",
      skills: "",
      twiter: "",
      facebook: "",
      youtube: "",
      linkedin: "",
      instagram: "",
      age: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      phone: this.state.phone,
      company: this.state.company,
      bio: this.state.bio,
      role: this.state.role,
      skills: this.state.skills,
      twiter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { classes } = this.props;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <SocialWrapper>
          <TextField
            underlineStyle={{
              borderBottom: "3px solid #7d48df"
            }}
            floatingLabelFocusStyle={{
              color: "#7d48df"
            }}
            errorText={errors.facebook}
            name="facebook"
            type="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            floatingLabelText="Facebook Profile URL"
          />
          <TextField
            underlineStyle={{
              borderBottom: "3px solid #7d48df"
            }}
            floatingLabelFocusStyle={{
              color: "#7d48df"
            }}
            name="twitter"
            type="twitter"
            errorText={errors.twitter}
            value={this.state.twitter}
            onChange={this.onChange}
            floatingLabelText="Twitter Profile URL"
          />
          <TextField
            underlineStyle={{
              borderBottom: "3px solid #7d48df"
            }}
            floatingLabelFocusStyle={{
              color: "#7d48df"
            }}
            name="linkedin"
            type="linkedin"
            errorText={errors.linkedin}
            value={this.state.linkedin}
            onChange={this.onChange}
            floatingLabelText="Linkedin Profile URL"
          />
          <TextField
            underlineStyle={{
              borderBottom: "3px solid #7d48df"
            }}
            floatingLabelFocusStyle={{
              color: "#7d48df"
            }}
            name="instagram"
            type="instagram"
            errorText={errors.instagram}
            value={this.state.instagram}
            onChange={this.onChange}
            floatingLabelText="Instagram Profile URL"
          />
        </SocialWrapper>
      );
    }
    // Select options for department
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <MuiThemeProvider>
        <FormCard>
          <Wrapper>
            <form onSubmit={this.onSubmit}>
              <h2>Create Profile</h2>
              <p>Fill this out to make your profile</p>
              <p>* = is required fields</p>
              <FormGroup>
                <TextFields
                  id="handle"
                  label="handle"
                  /* className={classes.textField} */
                  value={this.state.handle}
                  onChange={this.onChange}
                  margin="normal"
                  classes={{
                    underline: classes.cssUnderline
                  }}
                />
                <TextField
                  underlineStyle={{
                    borderBottom: "3px solid #7d48df"
                  }}
                  floatingLabelFocusStyle={{
                    color: "#7d48df"
                  }}
                  errorStyle={{
                    boxShadow: "none"
                  }}
                  id="handle"
                  name="handle"
                  type="text"
                  errorText={errors.handle}
                  /* info="A unique handle for your profile URL." */
                  value={this.state.handle}
                  onChange={this.onChange}
                  floatingLabelText="Handle"
                  required
                />
                <SmallText>A unique handler for your profile URL</SmallText>
              </FormGroup>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorStyle={{
                  boxShadow: "none"
                }}
                id="phone"
                name="phone"
                type="tel"
                errorText={errors.phone}
                value={this.state.phone}
                onChange={this.onChange}
                floatingLabelText="Phone Number"
              />
              <SmallText>Your phone number</SmallText>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorStyle={{
                  boxShadow: "none"
                }}
                id="location"
                name="location"
                type="text"
                errorText={errors.location}
                value={this.state.location}
                onChange={this.onChange}
                floatingLabelText="Location"
                required
              />
              <SmallText>Where you currently reside</SmallText>
              <SelectList
                placeholder="Which Department"
                name="role"
                value={this.state.role}
                onChange={this.onChange}
                options={options}
                error={errors.role}
              />
              <SmallText>Which Department you prefer to work in</SmallText>
              <FormGroup>
                <TextField
                  underlineStyle={{
                    borderBottom: "3px solid #7d48df"
                  }}
                  floatingLabelFocusStyle={{
                    color: "#7d48df"
                  }}
                  errorStyle={{
                    boxShadow: "none"
                  }}
                  id="company"
                  name="company"
                  type="text"
                  errorText={errors.company}
                  value={this.state.company}
                  onChange={this.onChange}
                  floatingLabelText="Company/School"
                />
                <SmallText>Where you currently work/study</SmallText>
              </FormGroup>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorStyle={{
                  boxShadow: "none"
                }}
                id="skills"
                name="skills"
                type="text"
                errorText={errors.skills}
                value={this.state.skills}
                onChange={this.onChange}
                floatingLabelText="Skills"
              />
              <SmallText>
                Please use comma separated values (eg.
                Editing,Lightning,Camera,Adobe)
              </SmallText>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorStyle={{
                  boxShadow: "none"
                }}
                id="Website"
                name="Website"
                type="text"
                errorText={errors.Website}
                value={this.state.Website}
                onChange={this.onChange}
                floatingLabelText="Website URL"
              />
              <SmallText>URL to your personal/company website</SmallText>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorStyle={{
                  boxShadow: "none"
                }}
                id="reel"
                name="reel"
                type="text"
                errorText={errors.reel}
                value={this.state.reel}
                onChange={this.onChange}
                floatingLabelText="Reel URL"
              />
              <SmallText>Link to your Video reel</SmallText>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorStyle={{
                  boxShadow: "none"
                }}
                id="bio"
                name="bio"
                type="text"
                errorText={errors.bio}
                value={this.state.bio}
                onChange={this.onChange}
                floatingLabelText="Bio"
                multiLine={true}
                rows={10}
              />
              <SmallText>Tell us a little about yourself</SmallText>
              <div className="social-toggle">
                <Button
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                >
                  Add Social Network Links
                </Button>
                <SmallSpan>Optional</SmallSpan>
              </div>
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
      </MuiThemeProvider>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
