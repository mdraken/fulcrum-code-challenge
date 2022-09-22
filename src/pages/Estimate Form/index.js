import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './styles.css';
import Fields from '../../components/Fields';
import InputRow from '../../components/InputRow';

const EstimateForm = () => {
    const [materialCosts, setMaterialCosts] = useState(0);
    const [laborCosts, setLaborCosts] = useState(0);
    const [fields, setFields] = useState([]);
    const [form, setForm] = useState('');

    useEffect(() => {
        if (!_.isEmpty(fields)) {
            const material = _.sumBy(fields, (field) => {
                if (field.costType === 'Material') {
                    return parseInt(field.value, 10);
                }
            });
            const labor = _.sumBy(fields, (field) => {
                if (field.costType === 'Labor') {
                    return parseInt(field.value, 10);
                }
            });
            setMaterialCosts(material ? material : 0);
            setLaborCosts(labor ? labor : 0);
        }
    }, [fields])

    const addToFields = (field) => {
        setFields([...fields, field]);
    }


    const saveChanges = (index, field) => {
        let newFields = [...fields];
        newFields[index] = field;
        setFields(newFields);
    };

    return (

        <div className="form_container">
            <div className="form_header">
                <h2>All Inclusive Costs:  {laborCosts + materialCosts}</h2>
                <h2>Material Costs: {materialCosts}</h2>
                <h2>Labor Costs: {laborCosts}</h2>
            </div>
            <div className="column_heads">
                <h3>Name of field</h3>
                <h3>Value</h3>
                <h3>Cost Type</h3>
            </div>
            <div className="form">
                <InputRow addToFields={addToFields} form={form} setForm={setForm} fields={fields} />
                <h3 className="fields_header">Current Fields</h3>
                <div className="entered_fields">
                    {!_.isEmpty(fields) ? (
                        <Fields fields={fields} saveChanges={saveChanges} />
                    ) : undefined}
                </div>
            </div>
        </div>
    );
};

export default EstimateForm;