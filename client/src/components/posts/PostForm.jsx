import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
//Components
import RoleInputs from "./RoleInputs";
import FormLabel from "../common/FormLabel";
import FormInputField from "../common/FormInputField";
import FormTextArea from "../common/FormTextArea";
import FormCard from "../common/FormCard";
import Button from "../common/Button";
import Link from "../common/Link";

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

    const jsonTitles = JSON.stringify(this.state.roleTitles);
    const jsonDesc = JSON.stringify(this.state.roleDesc);
    console.log(jsonDesc, jsonTitles);

    const newPost = new FormData();
    newPost.append("avatar", profile.avatar);
    newPost.append("handle", profile.handle);
    newPost.append("name", user.name);
    newPost.append("title", this.state.title);
    newPost.append("city", this.state.city);
    newPost.append("state", this.state.state);
    newPost.append("company", this.state.company);
    newPost.append("desc", this.state.desc);
    newPost.append("roleTitles", jsonTitles);
    newPost.append("roleDesc", jsonDesc);
    newPost.append("start", this.state.start);
    newPost.append("end", this.state.end);
    newPost.append("jobType", this.state.jobType);
    newPost.append("headerImage", this.state.image);
    newPost.append("budget", this.state.budget);
    newPost.append("tags", this.state.tags);

    this.props.addPost(newPost, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeSeeking(titles, desc) {
    const { roleTitles, roleDesc } = this.state;

    this.setState({
      roleTitles: titles,
      roleDesc: desc
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} id="post-form">
          <FormCard>
            <Link href="/feed">
              <Button>Back to Posts</Button>
            </Link>
            <h4>Add Post</h4>
            <p>Looking for members for your next project? Post an ad here!</p>
            <FormLabel>Post Title</FormLabel>
            <FormInputField
              id="title"
              margin="normal"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
              info="A title for your post"
              required
            />
            <FormLabel>Production Company/School Name</FormLabel>
            <FormInputField
              id="company"
              margin="normal"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
              info="Name of production company/group"
              required
            />
            <h6>Project Duration</h6>
            <FormLabel>Start Date</FormLabel>
            <FormInputField
              id="start"
              margin="normal"
              name="start"
              type="date"
              value={this.state.start}
              onChange={this.onChange}
              error={errors.from}
              info="Estimated start date of project"
            />
            <FormLabel>End Date</FormLabel>
            <FormInputField
              id="end"
              margin="normal"
              name="end"
              type="date"
              disabled={this.state.disabled ? "disabled" : ""}
              value={this.state.end}
              onChange={this.onChange}
              error={errors.to}
              info="Estimated end date of project"
            />
            <h6>Location</h6>
            <FormLabel>City</FormLabel>
            <FormInputField
              id="city"
              label="City"
              margin="normal"
              name="city"
              value={this.state.city}
              onChange={this.onChange}
              error={errors.city}
              info="Which city production will take place"
              required
            />
            <FormLabel>State</FormLabel>
            <FormInputField
              id="state"
              label="State"
              margin="normal"
              name="state"
              value={this.state.state}
              onChange={this.onChange}
              error={errors.state}
              info="The state of the city"
              required
            />
            <FormLabel>Project Description</FormLabel>
            <FormTextArea
              id="desc"
              margin="normal"
              name="desc"
              multiline
              rows="10"
              value={this.state.desc}
              onChange={this.onChange}
              error={errors.desc}
              info="Description of project"
              rows="10"
              cols="50"
              required
            />
            <h6>Roles Descriptions</h6>
            <RoleInputs
              getState={this.onChangeSeeking}
              errorTitle={errors.roleTitles}
              errorDesc={errors.roleDesc}
            />
            <FormLabel>Post Header Image</FormLabel>
            <FormInputField
              id="image"
              margin="normal"
              name="image"
              type="file"
              onChange={this.fileSelectedHandler}
              error={errors.image}
              info="An header image for this project post"
            />
            <FormLabel>Budget</FormLabel>
            <FormInputField
              id="budget"
              margin="normal"
              name="budget"
              value={this.state.budget}
              onChange={this.onChange}
              error={errors.budget}
              info="Estimated budget for project"
            />
            <FormLabel>Post Tags</FormLabel>
            <FormInputField
              id="tags"
              label="Tags for post"
              margin="normal"
              name="tags"
              value={this.state.tags}
              onChange={this.onChange}
              error={errors.tags}
              info="Tags for the post, relevant for keyword search"
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

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(PostForm));
