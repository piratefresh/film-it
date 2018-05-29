import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import Link from "../common/Link";
import styled from "styled-components";

const JobTypes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 2%;
  li {
    padding: 10px;
    list-style: none;
    background: #fff;
    cursor: pointer;
  }
`;
const Search = styled.div`
  justify-content: center;

  outline: none;
  display: flex;
  align-items: center;
`;
const Icon = styled.i`
  padding: 2.2% 2%;
  background: #7d48df;
  height: 100%;
  color: #fff;
`;
const SearchBarWrapper = styled.div`
  border-bottom: 2px solid #7d48df;
`;
const SearchBar = styled.input`
  padding: 3% 2%;
  border: none;
  width: 400px;
  :focus {
    outline: none;
  }
`;

class Posts extends Component {
  state = {
    keywords: "",
    city: "",
    state: "",
    jobType: ""
  };
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div>
        <JobTypes>
          <li>
            <a>Acting</a>
          </li>
          <li>
            <a>Production</a>
          </li>
          <li>
            <a>Pre-Production</a>
          </li>
          <li>
            <a>Camera/Lightning</a>
          </li>
          <li>
            <a>Sound</a>
          </li>
          <li>
            <a>VFX/Stunt</a>
          </li>
        </JobTypes>
        <Search>
          <Icon type="button" className="fa fa-search fa-2x" />
          <SearchBar placeholder="Keyword (eg. city, state, name, tags)" />
        </Search>
        <Link href="/add-post">
          <Button>Add Post</Button>
        </Link>
        {postContent}
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
