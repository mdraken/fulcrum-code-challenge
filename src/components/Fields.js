import React from 'react';
import _ from 'lodash';
import InputRow from './InputRow';
import './styles.css';

const Fields = ({ fields, saveChanges }) => {
    return (
        <div className="fields_container">
            {fields.reverse().map((field, index) => (
                <div className="field_item" key={index}>
                    <InputRow
                        field={field}
                        editField={true}
                        saveChanges={saveChanges}
                        index={index}
                    />
                </div>

            ))}
        </div>
    );
};

export default Fields;