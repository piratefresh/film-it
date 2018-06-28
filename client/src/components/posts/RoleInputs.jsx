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
      inputCount: 1,
      roleTitles: [],
      roleDesc: []
    };

    this.addInput = this.addInput.bind(this);
    this.addMoreInputs = this.addMoreInputs.bind(this);
    this.removeInputs = this.removeInputs.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.roleTitles && newProps.roleDesc) {
      this.setState({
        inputCount: newProps.roleTitles.length,
        roleTitles: newProps.roleTitles,
        roleDesc: newProps.roleDesc
      });
    }
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

    if (name === "roleTitles") {
      roleTitles[i] = value;
    } else {
      roleDesc[i] = value;
    }

    this.setState({
      roleTitles,
      roleDesc
    });
    this.props.getState(roleTitles, roleDesc);
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
          error={this.props.errorTitle}
          info="Title of the role you are seeking"
        />
        <FormLabel htmlFor="Role Description" style={{ marginTop: "5%" }}>
          Role Description
        </FormLabel>
        <FormTextArea
          key={index}
          name="roleDesc"
          value={this.state.roleDesc[index]}
          onChange={this.onChange(index)}
          rows="10"
          cols="50"
          error={this.props.errorDesc}
          info="Description for the role you are seeking"
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
        <Button onClick={this.addMoreInputs} style={{ marginBottom: "5%" }}>
          Add Role Description
        </Button>
        <Button onClick={this.removeInputs}>Remove Role Description </Button>
      </div>
    );
  }
}
