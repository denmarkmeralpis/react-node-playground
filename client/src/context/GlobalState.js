import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer';
import Axios from 'axios';

// Initial
const initialState = {
  logs: [],
  log: {}
}

// Create
export const GlobalContext = createContext(initialState);

// Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Delete
  const deleteLog = (id) => {
    Axios.delete(
      'http://localhost:3001/api/logs/' + id
    ).then((e) => fetchLogs());
  }

  // Create
  const createLog = (log) => {
    Axios.post(
      'http://localhost:3001/api/logs',log
    ).then((e) => fetchLogs());
  }

  // Update
  const updateLog = (log) => {
    Axios.patch(
      'http://localhost:3001/api/logs/' + log.id,
      log
    ).then((e) => fetchLogs());
  }

  // Return Book
  const returnBook = (id) => {
    const promise = Axios.patch('http://localhost:3001/api/logs/' + id + '/return')
    return promise
  };

  // Fetch
  const fetchLogs = () => {
    Axios.get('http://localhost:3001/api/logs').then(
      (resp) => dispatch({
        type: 'FETCH_LOGS',
        payload: resp.data
      })
    )
  }

  return (
    <GlobalContext.Provider value={{
      logs: state.logs,
      logData: state.log,
      deleteLog,
      createLog,
      updateLog,
      fetchLogs,
      returnBook
    }}>
      { children }
    </GlobalContext.Provider>
  )
}