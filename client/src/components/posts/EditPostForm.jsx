import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import moment from "moment";
// Redux
import { connect } from "react-redux";
import { editPost, getPostByPostId } from "../../actions/postActions";
//Components
import RoleInputs from "./RoleInputs";
import FormLabel from "../common/FormLabel";
import FormInputField from "../common/FormInputField";
import FormTextArea from "../common/FormTextArea";
import FormCard from "../common/FormCard";
import Button from "../common/Button";
import Link from "../common/Link";

class EditPostForm extends Component {
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getPostByPostId(this.props.match.params.id);
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
      // Make sure seeked roles are loaded
      let oldRoleTitles;
      let oldRoleDesc;
      if (post.seeking) {
        if (post.seeking.titles && post.seeking.desc) {
          oldRoleTitles = post.seeking.titles;
          oldRoleDesc = post.seeking.desc;

          // Date
          const startDate = moment(post.start).format("YYYY-MM-DD");
          const endDate = moment(post.end).format("YYYY-MM-DD");
          console.log(startDate, endDate);

          // if profile field dosen't exist, make empty string
          post.company = !isEmpty(post.company) ? post.company : "";
          post.desc = !isEmpty(post.desc) ? post.desc : "";
          post.state = !isEmpty(post.state) ? post.state : "";
          post.city = !isEmpty(post.city) ? post.city : "";
          post.budget = !isEmpty(post.budget) ? post.budget : "";
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
            roleDesc: [...oldRoleDesc],
            roleTitles: [...oldRoleTitles],
            tags: tagsCSV,
            budget: post.budget,
            start: startDate,
            end: endDate,
            jobType: post.jobType
          });
        }
      }
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

    const editPost = new FormData();
    editPost.append("avatar", profile.avatar);
    editPost.append("handle", profile.handle);
    editPost.append("name", user.name);
    editPost.append("title", this.state.title);
    editPost.append("city", this.state.city);
    editPost.append("state", this.state.state);
    editPost.append("company", this.state.company);
    editPost.append("desc", this.state.desc);
    editPost.append("roleTitles", jsonTitles);
    editPost.append("roleDesc", jsonDesc);
    editPost.append("start", this.state.start);
    editPost.append("end", this.state.end);
    editPost.append("jobType", this.state.jobType);
    editPost.append("headerImage", this.state.headerImage);
    editPost.append("budget", this.state.budget);
    editPost.append("tags", this.state.tags);

    this.props.editPost(editPost, this.props.history);
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
    const { post, loading } = this.props.post;

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
              {...this.state}
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

export default connect(
  mapStateToProps,
  { editPost, getPostByPostId }
)(withRouter(EditPostForm));
