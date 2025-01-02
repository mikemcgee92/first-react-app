'use client';

import React, { useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { postFact, updateFact } from '@/api/facts';
import PropTypes from 'prop-types';

const initialState = {
  text: '',
  name: '',
};

export default function Form({ obj = initialState, func }) {
  const { user } = useAuth();
  const [factDetails, setFactDetails] = useState(obj);

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;

    setFactDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFactDetails(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (factDetails.firebaseKey) {
      await updateFact(factDetails, 'Yes');
      func(factDetails);
    } else {
      const response = await postFact(
        {
          ...factDetails,
          userId: user.uid,
        },
        'Yes',
      );
      await updateFact({ firebaseKy: response.name }, 'Yes');
    }

    resetForm();
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      {/* Fact/text input */}
      <div>
        <label htmlFor="text">Fact</label>
        <input onChange={handleInputUpdate} type="text" name="text" id="text" className="form-control" value={factDetails.text} required />
      </div>
      {/* Name of fact author input */}
      <div>
        <label htmlFor="name">Your Name</label>
        <input onChange={handleInputUpdate} type="text" name="name" id="name" className="form-control" value={factDetails.name} required />
      </div>
      <button className="btn btn-success" type="submit">
        Submit
      </button>
    </form>
  );
}

Form.propTypes = {
  obj: PropTypes.shape.isRequired,
  func: PropTypes.func.isRequired,
};
