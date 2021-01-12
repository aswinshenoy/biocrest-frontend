import React from 'react';
import styled from "@emotion/styled";

const FormRadio = styled.div`
    label {
       font-weight: 600;
       color: #333;
       margin-bottom: 0;
    }
    td {
      display: flex;
      align-items: center;
      input {
        margin-right: 8px;
      }
      label {
        font-weight: 400;
        color: #111;
      }
    }
  
`;

const Checkbox = ({
    label, name, className, options = [], value = [], onChange = () => {},
}) => {

    const processValue = (v) => {
        if(value?.length > 0 && value.includes(v)){
            return value.filter((c) => c !== v)
        }
        if(value.length === 0) {
            return [v,];
        }
        if(value?.length > 0) {
            return [...value, v];
        }
    };

    return <FormRadio className={className}>
        <label>{label}</label>
        <div className="row bg-light p-1 mx-0">
            {options?.length > 0 ?
                options.map((o) =>
                    <div className="col-md-6 col-lg-4 p-2">
                        <td>
                            <input
                                id={`${o.name}_${o.value}`}
                                type="checkbox"
                                name={name}
                                value={o.value}
                                checked={value && value.length > 0 && value.includes(o.value)}
                                onChange={() => onChange(processValue(o.value))}
                            />
                            <label htmlFor={`${o.name}_${o.value}`}>{o.label}</label>
                        </td>
                    </div>
                ) : null}
        </div>
    </FormRadio>

};

export default Checkbox;