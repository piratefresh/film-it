import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
// Components
import Button from "../common/Button";
import FormLabel from "../common/FormLabel";
import FormInputField from "../common/FormInputField";
import FormTextArea from "../common/FormTextArea";

export default class RoleInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCount: 0,
      roleTitles: [],
      roleDesc: []
    };

    this.addInput = this.addInput.bind(this);
    this.addMoreInputs = this.addMoreInputs.bind(this);
    this.removeInputs = this.removeInputs.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  addMoreInputs(e) {
    e.preventDefault();
    var inputCount = this.state.inputCount;
    this.setState({ inputCount: inputCount + 1 });
  }

  removeInputs(e) {
    e.preventDefault();
    var inputCount = this.state.inputCount;
    this.setState({ inputCount: inputCount - 1 });
  }

  onChange = i => e => {
    let { name, value } = e.target;
    let roleTitles = [...this.state.roleTitles];
    let roleDesc = [...this.state.roleDesc];

    console.log(i);
    console.log(roleTitles, roleDesc);

    if (name === "roleTitles") {
      roleTitles[i] = value;
    } else {
      roleDesc[i] = value;
    }

    this.setState({
      roleTitles,
      roleDesc
    });
    this.props.getState(this.state.roleTitles, this.state.roleDesc);
  };

  addInput(index) {
    return (
      <div>
        <FormLabel htmlFor="Role Title">Role Title</FormLabel>
        <FormInputField
          key={index}
          type="text"
          name="roleTitles"
          value={this.state.roleTitles[index]}
          onChange={this.onChange(index)}
        />
        <FormLabel htmlFor="Role Description">Role Description</FormLabel>
        <FormTextArea
          key={index}
          name="roleDesc"
          value={this.state.roleDesc[index]}
          onChange={this.onChange(index)}
          rows="10"
          cols="50"
        />
      </div>
    );
  }

  inputs() {
    var rows = [];
    var inputCount = this.state.inputCount;
    for (var i = 0; i < inputCount; i++) {
      rows.push(this.addInput(i));
    }
    return rows;
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.inputs()}
        <Button onClick={this.addMoreInputs}>Add Role Description</Button>
        <Button onClick={this.removeInputs}>Remove Role Description </Button>
      </div>
    );
  }
}
