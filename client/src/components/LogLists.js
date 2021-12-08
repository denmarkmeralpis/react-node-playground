import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export const LogLists = () => {
  const { logs, deleteLog, fetchLogs } = useContext(GlobalContext);

  useEffect(() => {
    fetchLogs();
  }, []);

  return(
    <table className="table table-responsive table-striped table-hover mt-4">
      <thead>
        <tr>
          <th className="text-center">Reference #</th>
          <th>Book</th>
          <th>Borrowed By</th>
          <th>Borrowed On</th>
          <th>Returned On</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        { logs.map(log => (
          <tr key={ log.id }>
            <td className="text-center">
              <span className="badge bg-primary">{ log.reference }</span>
            </td>
            <td>{ log.book }</td>
            <td>{ log.borrower }</td>
            <td>{ log.borrowed_at }</td>
            <td>{ log.returned_at }</td>
            <td className="text-end">
                <Link className="btn btn-warning" to={`/edit/${log.id}`}>Edit</Link>
                <Button onClick={() => deleteLog(log.id)} color="danger" className="ms-1">Delete</Button>
            </td>
          </tr>
        )) }
      </tbody>
    </table>
  )
}