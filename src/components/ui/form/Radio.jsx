import React from 'react';
import styled from "@emotion/styled";

const FormRadio = styled.div`
    label {
        font-weight: 600;
    }
    td {
      display: flex;
      align-items: center;
      input {
        margin-right: 8px;
      }
    }
  
`;

const Radio = ({
    label, name, className, options = [], value, onChange = () => {},
}) => {

    return <FormRadio>
        <label>{label}</label>
        <div className="row bg-light p-1 mx-0">
            {options?.length > 0 ?
                options.map((o) =>
                    <div className="col-md-6 col-lg-4 p-2">
                        <td>
                            <input
                                type="radio"
                                name={name}
                                value={o.value}
                                checked={o.value===value}
                                onSelect={() => onChange(o.value)}
                            />
                            {o.label}
                        </td>
                    </div>
                ) : null}
        </div>
    </FormRadio>

};

export default Radio;