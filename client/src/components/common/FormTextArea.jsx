import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const transform0100 = keyframes`
  from {
    border-bottom: 0px solid #7d48df;
  }

  to {
    border-bottom: 3px solid #7d48df;
  }
`;

const FormTextAreaField = styled.textarea`
  width: calc(100% - 10px);
  box-sizing: border-box;
  font-size: 0.8rem;
  border: 0;
  border-bottom: 2px solid #f0f0f0;
  background: rgba(96, 111, 123, 0.1);
  outline: none;
  margin-bottom: 10%;
  margin-top: 3%;
  padding: 2%;
  :focus {
    border-bottom: 3px solid #7d48df;
    animation: ${transform0100} 100ms ease-in-out;
  }
  :invalid {
    border: 2px solid #fa3e3e;
  }
`;
const Small = styled.div`
  color: #6c757d !important;
  margin-top: 0.25rem;
  font-size: 80%;
  font-weight: 400;
  box-sizing: border-box;
`;
const InvalidFeedback = styled.div`
  color: #fa3e3e;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
`;

const FormTextArea = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  rows,
  cols,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <FormTextAreaField
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <Small>{info}</Small>}
      {error && <InvalidFeedback>{error}</InvalidFeedback>}
    </div>
  );
};

FormTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  row: PropTypes.string,
  column: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

FormTextArea.defaultProps = {
  type: "text"
};

export default FormTextArea;
