import React, { useState } from 'react';
import './styles.css';
import EstimateForm from '../Estimate Form';


const Home = () => {
    const [newForm, setNewForm] = useState(false);

    return (
        <div className="home">
            {newForm ? (
                <EstimateForm />
            ) : (
                <div className="start_new">
                    <h1>
                        Start a new estimate by clicking this button below
                    </h1>
                    <button className="button" onClick={() => setNewForm(!newForm)}>Create Estimate</button>
                </div>
            )}
        </div>
    );
};

export default Home;