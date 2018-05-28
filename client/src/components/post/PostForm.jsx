import React, { Component } from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
// Material Ui
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import FormCard from "../common/FormCard";
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

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      city: "",
      state: "",
      desc: "",
      seeking: "",
      budget: "",
      tags: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
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
    newPost.append("name", user.name);
    newPost.append("title", this.state.title);
    newPost.append("city", this.state.city);
    newPost.append("state", this.state.state);
    newPost.append("company", this.state.company);
    newPost.append("desc", this.state.desc);
    newPost.append("seeking", this.state.seeking);
    newPost.append("image", this.state.image);
    newPost.append("budget", this.state.budget);
    newPost.append("tags", this.state.tags);

    this.props.addPost(newPost);

    this.setState({
      title: "",
      company: "",
      city: "",
      state: "",
      desc: "",
      seeking: "",
      budget: "",
      tags: ""
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <FormCard>
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
            <TextField
              id="seeking"
              label="Describe what you seeking for the project"
              margin="normal"
              name="seeking"
              multiline
              rows="10"
              value={this.state.seeking}
              onChange={this.onChange}
              fullWidth={true}
              helperText={errors.seeking}
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

export default connect(mapStateToProps, { addPost })(styledComponent);
