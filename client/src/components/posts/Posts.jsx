import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/postActions";
// Components
import PostFeed from "./PostFeed";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
// Styled Components
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import Link from "../common/Link";
import styled from "styled-components";

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
const SearchBar = styled.input`
  padding: 3% 2%;
  border: none;
  width: 400px;
  :focus {
    outline: none;
  }
`;

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.getPosts();
  }

  onSubmit(e) {
    e.preventDefault();
    const keyword = this.state.query;
    console.log(keyword);
    this.props.getPostsBySearch(keyword);
  }

  onChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
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
        <TopBar onChange={this.onChange} query={this.state.query} />
        <form onSubmit={this.onSubmit}>
          <Search>
            <Icon type="button" className="fa fa-search fa-2x" />
            <SearchBar
              id="query"
              name="query"
              value={this.state.query}
              onChange={this.onChange}
              placeholder="Keyword (eg. city, state, name, tags)"
            />
          </Search>
        </form>
        <Link href="/add-post">
          <Button style={{ marginTop: "2%" }}>Add Post</Button>
        </Link>
        {postContent}
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  getPostsBySearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, getPostsBySearch }
)(Posts);
