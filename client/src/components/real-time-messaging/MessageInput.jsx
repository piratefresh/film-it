import React, { Component } from "react";
import Button from "../common/Button";

class MessageInput extends Component {
  render() {
    return (
      <div>
        <Button style={{ width: "50px" }}>Send</Button>
      </div>
    );
  }
}

export default MessageInput;
