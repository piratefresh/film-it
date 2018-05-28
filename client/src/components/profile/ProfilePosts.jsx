import React, { Component } from "react";

class ProfilePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: ""
    };
  }
  componentDidMount() {
    const { username } = this.props;
    fetch(`api/posts/${username}`)
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) this.setState({ posts: data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { posts } = this.state;
    const postItems = posts.map(post => <div key={post.id}>{post.user}</div>);
    return <div ref="myRef" />;
  }
}

export default ProfilePosts;
