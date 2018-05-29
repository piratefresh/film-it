import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
// Redux
import { connect } from "react-redux";
import { editPost, getPost } from "../../actions/postActions";
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
import Spinner from "../common/Spinner";

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

class EditPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      city: "",
      state: "",
      desc: "",
      seekingDesc: [],
      seekingRole: [],
      budget: "",
      tags: "",
      start: "",
      end: "",
      jobType: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.post.post) {
      const post = nextProps.post.post;
      // Bring skills array back to CSV
      let tagsCSV;
      if (post.tags) {
        tagsCSV = post.tags.join(",");
      }
      // if profile field dosen't exist, make empty string
      post.company = !isEmpty(post.company) ? post.company : "";
      post.desc = !isEmpty(post.desc) ? post.desc : "";
      post.state = !isEmpty(post.state) ? post.state : "";
      post.city = !isEmpty(post.city) ? post.city : "";
      post.budget = !isEmpty(post.budget) ? post.budget : "";
      post.seekingDesc = !isEmpty(post.seekingDesc) ? post.seekingDesc : "";
      post.seekingRole = !isEmpty(post.seekingRole) ? post.seekingRole : "";
      post.start = !isEmpty(post.start) ? post.start : "";
      post.end = !isEmpty(post.end) ? post.end : "";
      post.jobType = !isEmpty(post.jobType) ? post.jobType : "";
      post.title = !isEmpty(post.title) ? post.title : "";
      // Set component fields state
      this.setState({
        title: post.title,
        desc: post.desc,
        city: post.city,
        state: post.state,
        company: post.company,
        seekingDesc: post.seekingDesc,
        seekingRole: post.seekingRole,
        tags: tagsCSV,
        budget: post.budget,
        start: post.start,
        end: post.end,
        jobType: post.jobType
      });
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

    const editPost = new FormData();
    editPost.append("avatar", profile.avatar);
    editPost.append("name", user.name);
    editPost.append("title", this.state.title);
    editPost.append("city", this.state.city);
    editPost.append("state", this.state.state);
    editPost.append("company", this.state.company);
    editPost.append("desc", this.state.desc);
    editPost.append("seekingDesc", this.state.seekingDesc);
    editPost.append("seekingRole", this.state.seekingRole);
    editPost.append("start", this.state.start);
    editPost.append("end", this.state.end);
    editPost.append("jobType", this.state.jobType);
    editPost.append("budget", this.state.budget);
    editPost.append("tags", this.state.tags);

    this.props.editPost(editPost, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeRole = i => e => {
    let seekingRole = [...this.state.seekingRole];
    seekingRole[i] = e.target.value;
    this.setState({
      seekingRole
    });
  };
  changeDesc = i => e => {
    let seekingDesc = [...this.state.seekingDesc];
    seekingDesc[i] = e.target.value;
    this.setState({
      seekingDesc
    });
  };

  handleDeleteRole = i => e => {
    e.preventDefault();
    let seekingRole = [
      ...this.state.seekingRole.slice(0, i),
      ...this.state.seekingRole.slice(i + 1)
    ];
    this.setState({
      seekingRole
    });
  };

  handleDeleteDesc = i => e => {
    e.preventDefault();
    let seekingDesc = [
      ...this.state.seekingDesc.slice(0, i),
      ...this.state.seekingDesc.slice(i + 1)
    ];
    this.setState({
      seekingDesc
    });
  };

  addInput = e => {
    e.preventDefault();
    let seekingRole = this.state.seekingRole.concat([""]);
    let seekingDesc = this.state.seekingDesc.concat([""]);
    this.setState({
      seekingRole,
      seekingDesc
    });
  };

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    const { post, loading } = this.props.post;

    /*    let seekingContent;
    if ((post && post.length > 0) || loading) {
      seekingContent = <Spinner />;
    } else {
      console.log(post);
      seekingContent = (
        <div>
          {post.seekingRole.map((role, index) => (
            <span key={index}>
              <TextField
                id="seekingRole"
                label="Title of Role"
                margin="normal"
                name="seekingRole"
                onChange={this.changeRole(index)}
                value={role}
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
            </span>
          ))}
          {post.seekingDesc.map((desc, index) => (
            <span key={index}>
              <TextField
                id="seekingDesc"
                label="Describe the role"
                margin="normal"
                name="seekingDesc"
                type="text"
                multiline
                rows="10"
                onChange={this.changeDesc(index)}
                value={desc}
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
              />
            </span>
          ))}
          <Button onClick={this.addInput}>Add Role Description</Button>
        </div>
      );
    } */
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <FormCard>
            <Link href="/feed">
              <Button>Back to Posts</Button>
            </Link>
            <h4>Edit Post</h4>
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
                <MenuItem value={this.state.jobType}>
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
            {/* seekingContent */}
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

EditPostForm.propTypes = {
  editPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile,
  errors: state.errors
});

const styledComponent = withStyles(styles)(EditPostForm);

export default connect(mapStateToProps, { editPost, getPost })(
  withRouter(styledComponent)
);
