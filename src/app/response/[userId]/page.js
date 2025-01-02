'use client';

import React, { useState, useEffect } from 'react';
import FactCard from '@/components/Card';
import PropTypes from 'prop-types';
import { readFacts } from '@/api/facts';

export default function ResponsePage({ params, searchParams }) {
  const [facts, setFacts] = useState([]);

  const getFacts = () => {
    readFacts(params.userId, searchParams.value).then(setFacts);
  };

  useEffect(() => {
    getFacts();
  });

  return (
    <div>
      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact} deleteFunc={getFacts} />
      ))}
    </div>
  );
}

ResponsePage.propTypes = {
  params: PropTypes.string.isRequired,
  searchParams: PropTypes.string.isRequired,
};
