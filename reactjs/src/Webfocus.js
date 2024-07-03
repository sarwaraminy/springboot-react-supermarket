import React, { useState, useEffect } from 'react';

const Webfocus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // URL to fetch data from
    const url = 'http://afgpc82:8080/ibi_apps/WFServlet.ibfs?IBIF_ex=FRAPI_GetTable_FRPACBNC&ACCT=1022310001';
    
    // Fetch data from the URL
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Account Data</h1>
      {data && data.sort_keys.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h2>Account: {item.ACCT}</h2>
          <p>Sector: {item.SECTOR}</p>
          <h3>Verbs</h3>
          {item.verbs.map((verb, verbIndex) => (
            <div key={verbIndex} style={{ paddingLeft: '20px' }}>
              <p>Index: {verb.INDX}</p>
              <p>Policy: {verb.POLICY}</p>
              <p>Min Var: {verb.MINVAR !== null ? verb.MINVAR : 'N/A'}</p>
              <p>Max Var: {verb.MAXVAR !== null ? verb.MAXVAR : 'N/A'}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Webfocus;
