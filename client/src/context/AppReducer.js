// import { useReducer } from "react";

export default (state, action) => {
  switch(action.type) {
    case 'FETCH_LOGS':
      state.logs = action.payload

      return {
        logs: state.logs
      }

    case 'UPDATE_LOGDATA':
      state.log = action.payload

      return {
        logs: state.logs,
        log: state.log
      }

    default:
      return state
  }
}