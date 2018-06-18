import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
// Material Ui
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import FormCard from "../common/FormCard";
import Button from "../common/Button";
import Link from "../common/Link";
//Components
import RoleInputs from "./RoleInputs";

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

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      city: "",
      state: "",
      desc: "",
      roleDesc: [],
      roleTitles: [],
      budget: "",
      tags: "",
      start: "",
      end: "",
      jobType: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeSeeking = this.onChangeSeeking.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  fileSelectedHandler = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    const newPost = new FormData();
    newPost.append("avatar", profile.avatar);
    newPost.append("handle", profile.handle);
    newPost.append("name", user.name);
    newPost.append("title", this.state.title);
    newPost.append("city", this.state.city);
    newPost.append("state", this.state.state);
    newPost.append("company", this.state.company);
    newPost.append("desc", this.state.desc);
    newPost.append("roleTitles", this.state.roleTitles);
    newPost.append("roleDesc", this.state.roleDesc);
    newPost.append("start", this.state.start);
    newPost.append("end", this.state.end);
    newPost.append("jobType", this.state.jobType);
    newPost.append("image", this.state.image);
    newPost.append("budget", this.state.budget);
    newPost.append("tags", this.state.tags);

    this.props.addPost(newPost, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeSeeking(titles, desc) {
    const { roleTitles, roleDesc } = this.state;
    console.log(titles, desc);
    this.setState({
      roleTitles: titles,
      roleDesc: desc
    });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <FormCard>
            <Link href="/feed">
              <Button>Back to Posts</Button>
            </Link>
            <h4>Add Post</h4>
            <p>Looking for members for your next project? Post an ad here!</p>
            <TextField
              id="title"
              label="Post/Project title"
              margin="normal"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              fullWidth={true}
              helperText={errors.title}
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
              required
            />
            <TextField
              id="company"
              label="Production Company/School Name"
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
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="department-helper">Department</InputLabel>
              <Select
                id="jobType"
                name="jobType"
                value={this.state.jobTybe}
                onChange={this.onChange}
                inputProps={{
                  name: "jobType",
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
                  Script & VTR Department
                </MenuItem>
                <MenuItem value={"Sound Department"}>Sound Department</MenuItem>
                <MenuItem value={"Stunts & FX Department"}>
                  Stunts & FX Department
                </MenuItem>
              </Select>
              <FormHelperText>What kind of job is this</FormHelperText>
            </FormControl>
            <TextField
              id="start"
              label="start"
              margin="normal"
              name="start"
              type="date"
              value={this.state.start}
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
              id="end"
              label="end"
              margin="normal"
              name="end"
              type="date"
              disabled={this.state.disabled ? "disabled" : ""}
              value={this.state.end}
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
              id="city"
              label="City"
              margin="normal"
              name="city"
              value={this.state.city}
              onChange={this.onChange}
              fullWidth={true}
              helperText={errors.city}
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
              required
            />
            <TextField
              id="state"
              label="State"
              margin="normal"
              name="state"
              value={this.state.state}
              onChange={this.onChange}
              fullWidth={true}
              helperText={errors.state}
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
              required
            />
            <TextField
              id="desc"
              label="Describe the project"
              margin="normal"
              name="desc"
              multiline
              rows="10"
              value={this.state.desc}
              onChange={this.onChange}
              fullWidth={true}
              helperText={errors.desc}
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
              required
            />
            <RoleInputs getState={this.onChangeSeeking} />
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
            />
            <TextField
              id="budget"
              label="Budget"
              margin="normal"
              name="budget"
              value={this.state.budget}
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
              id="tags"
              label="Tags for post"
              margin="normal"
              name="tags"
              value={this.state.tags}
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
          </FormCard>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

const styledComponent = withStyles(styles)(PostForm);

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(styledComponent));
