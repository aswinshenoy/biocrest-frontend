import React from 'react';
import styled from "@emotion/styled";

const FormInput = styled.div`
    input { 
      font-size: 15px!important; 
      border: 1px solid #AF0C3E!important; 
      padding: 9px 12px; 
      margin-top: 0.15rem!important;
      background: none!important;
      &:focus {
        border: 2px solid #AF0C3E!important;
        padding: 8px 11px; 
        outline: none!important;
      }
    }
    label { 
      font-size: 12px; 
      font-weight: 600!important; 
      display: block;
      margin-bottom: 0;
      color: #333;
    }
`;

const Input = ({
   label, type, value, className, autoComplete, placeholder, onChange = () => {},
}) => {

    return <FormInput>
        <label>{label}</label>
        <input
            title={label}
            placeholder={placeholder}
            value={value}
            type={type}
            autoComplete={autoComplete}
            className={className}
            onChange={(e) => onChange(e.currentTarget.value)}
        />
    </FormInput>

};

export default Input;