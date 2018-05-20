import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";

const Select = styled.select`
  border: none;
  border-bottom: 3px solid #7d48df;
  outline: none;

  :focus {
    border-color: #fff transparent transparent transparent;
  }
`;

const SelectList = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <Select name={name} value={value} onChange={onChange}>
        {selectOptions}
      </Select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectList;
