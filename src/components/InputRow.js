import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './styles.css';
import { fieldNameSchema, valueSchema } from '../utils/schema';

const InputRow = ({ field, addToFields, editField = false, saveChanges, index, form, setForm, fields }) => {
    const [active, setActive] = useState(editField ? field.costType : '');
    const [value, setValue] = useState(editField ? field.value : 0);
    const [fieldName, setFieldName] = useState(editField ? field.fieldName : '');
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        if (!_.isEmpty(fieldName) && !_.isEmpty(value)) {
            const { error: fieldNameError } = fieldNameSchema.validate(fieldName);
            const { error: valueError } = valueSchema.validate(value);

            if (!_.isEmpty(fieldNameError)) {
                setInputError(fieldNameError.message);
            } else if (!_.isEmpty(valueError)) {
                setInputError(valueError.message);
            } else {
                setInputError('');
            }
        }
    }, [fieldName, value, active]);

    const reset = () => {
        setFieldName('');
        setValue(0);
        setActive('');
    }


    return (
        <>
            <div className="input_row">
                <div className="inputs">
                    <label>Name of field</label>
                    <input type="text" className="text_input" value={fieldName} onChange={(event) => setFieldName(event.target.value)} />
                </div>
                <div className="inputs">
                    <label>Value</label>
                    <input type="number" className="number_input" value={value} onChange={(event) => setValue(event.target.value)} />
                </div>
                <div className="radio_row">
                    <div>
                        <label>Material</label>
                        <input type="radio" className="radio_input" checked={active === 'Material'} onChange={() => setActive('Material')} />
                    </div>
                    <div>
                        <label>Labor</label>
                        <input type="radio" className="radio_input" checked={active === 'Labor'} onChange={() => setActive('Labor')} />
                    </div>
                </div>
            </div>
            <div className="error_message">
                {_.isEmpty(inputError) ? undefined : (
                    <h3>{inputError}</h3>
                )}
            </div>
            {editField ? (
                <>
                    {!(field.fieldName !== fieldName || field.value !== value || field.costType !== active) ? undefined : (
                        <button
                            type="button"
                            className="add_field"
                            style={inputError ? {} : {marginTop: "1rem"}}
                            onClick={() => saveChanges(index, { fieldName, value, costType: active })}
                        >
                            Save Changes
                        </button>
                    )}
                </>
            ) : (
                <div className="button_row" style={inputError ? {} : {marginTop: "1rem"}}>
                    <button
                        type="button"
                        className="add_field"
                        disabled={(!_.isEmpty(inputError) || (_.isEmpty(active) || _.isEmpty(fieldName) || _.isEmpty(value)))}
                        onClick={() => {
                            addToFields({ fieldName, value, costType: active });
                            reset();
                        }}
                    >
                        Add to Estimate
                    </button>
                    <button
                        type="button"
                        className="save_form"
                        disabled={(_.isEqual(form, fields) || fields.length === 0)}
                        onClick={() => {
                            localStorage.setItem('form', JSON.stringify(fields));
                            setForm(fields);
                        }}
                    >
                        {_.isEqual(form, fields) ? "Form Saved!" : "Save Estimate Form"}
                    </button>
                </div>

            )

            }
        </>

    );
};

export default InputRow;