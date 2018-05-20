import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import GoogleSvg from "../../img/svg/btn_google_dark_normal_ios.svg";
import "../../validation.css";

const FormCard = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  padding: 20px;
  margin: 60px 0;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
  grid-gap: 20px;
  background: #fff;
  width: 250px;
  margin: 5% auto;
`;
const FormGroup = styled.div`
  padding: 10px 0px;
  position: relative;
`;
const Link = styled.a`
  text-decoration: none;
`;
const Button = styled.button`
  padding: 5px;
  background: #7d48df;
  color: #fff;
  border: none;

  a {
    color: #fff;
    text-decoration: none;
  }
  :active {
    background: #6339b2;
  }
`;

const GoogleSignIn = styled.button`
  display: flex;
  justify-content: space-around;
  width: 260px;
  border: none;
  text-align: center;
  vertical-align: center;
  box-shadow: 0 2px 4px 0 rgba(0.25);
  font-size: 16px;
  line-height: 48px;
  border-radius: 1px;
  transition: background-color 0.218s border-color 0.218s box-shadow 0.218s;
  font-family: Roboto, arial, sans-serif;
  cursor: pointer;
  background-color: #4285f4;
  color: rgba(0, 0, 0, 0.54);
  position: relative;

  :hover {
    box-shadow: "0 0 3px 3px rgba(66,133,244,.3)";
    transition: "background-color .218s, border-color .218s, box-shadow .218s";
  }
`;
const GoogleIcon = styled.img`
  display: flex;
  justify-content: flex-start;
  display: block;
  margin-top: 1px;
  margin-left: 1px;
  float: left;
  border-radius: 1px;
  white-space: nowrap;
  position: relative;
`;
const GoogleBtnText = styled.span`
  display: flex;
  justify-content: center;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 16px;
  line-height: 48px;
  font-family: Roboto, arial, sans-serif;
  cursor: pointer;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <MuiThemeProvider>
        <FormCard>
          <h1>Register</h1>
          <Link href="/auth/google">
            <GoogleSignIn>
              <GoogleIcon src={GoogleSvg} alt="Google Button" />
              <GoogleBtnText>Sign in with Google</GoogleBtnText>
            </GoogleSignIn>
          </Link>
          <p>Or Sign up with an account</p>
          <form onSubmit={this.onSubmit}>
            <FormGroup>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorText={errors ? errors.name : ""}
                id="name"
                name="name"
                type="name"
                value={this.state.name}
                onChange={this.onChange}
                floatingLabelText="Name"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorText={errors ? errors.email : ""}
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                floatingLabelText="Email"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorText={errors ? errors.password : ""}
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                floatingLabelText="Password"
              />
            </FormGroup>
            <FormGroup>
              <TextField
                underlineStyle={{
                  borderBottom: "3px solid #7d48df"
                }}
                floatingLabelFocusStyle={{
                  color: "#7d48df"
                }}
                errorText={errors ? errors.password2 : ""}
                id="password2"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                floatingLabelText="Confirm Password"
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </form>
        </FormCard>
      </MuiThemeProvider>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
