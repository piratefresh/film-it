import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const transform0100 = keyframes`
  from {border-bottom: 0px solid #7d48df;}
  to {border-bottom: 3px solid #7d48df;}
`;

const FormInput = styled.input`
  width: calc(100% - 10px);
  box-sizing: border-box;
  font-size: 0.8rem;
  border: 0;
  border-bottom: 2px solid #f0f0f0;
  background: rgba(96, 111, 123, 0.1);
  outline: none;
  padding: 4%;
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
  font-size: 0.7rem;
  font-weight: 400;
  box-sizing: border-box;
`;
const InvalidFeedback = styled.div`
  color: #fa3e3e;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.7rem;
`;

const FormInputField = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <FormInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <Small>{info}</Small>}
      {error && <InvalidFeedback>{error}</InvalidFeedback>}
    </div>
  );
};

FormInputField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

FormInputField.defaultProps = {
  type: "text"
};

export default FormInputField;
