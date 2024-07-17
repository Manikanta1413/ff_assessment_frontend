import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const DataTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const symbol = useSelector(state => state.symbol);

  useEffect(() => {
    try{
      const fetchData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/data/${symbol}`);
        console.log("Response: ", response);
        dispatch({ type: 'SET_DATA', data: response.data });
      };
  
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    } catch (ex){
      throw new Error(`<h2>Unable to Connect- Backend..!<h2>`)
    }

  }, [symbol, dispatch]);

  return (
    <div>
      <h2>{symbol.charAt(0).toUpperCase() + symbol.slice(1)} Data</h2>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.price}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
