import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import { GlobalContext } from '../context/GlobalState';
import { Link, useHistory } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'

export const EditLog = (props) => {
  const [log, setSelectedLog] = useState({
    id: '',
    book: '',
    borrower: ''
  });
  const { updateLog } = useContext(GlobalContext);
  const history = useHistory();
  const currentLogId = props.match.params.id;

  useEffect(() => {
    Axios.get('http://localhost:3001/api/logs/' + currentLogId).then(
      (resp) => setSelectedLog(resp.data[0])
    )
  }, []);

  const onSubmit = () => {
    updateLog(log);

    history.push('/');
  }

  const onChange = (e) => {
    setSelectedLog({ ...log, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Book</Label>
        <Input type="text" name="book" defaultValue={log.book}
          onChange={onChange} placeholder="Edit Book Title"></Input>
      </FormGroup>
      <FormGroup>
        <Label>Borrower</Label>
        <Input type="text" name="borrower" defaultValue={log.borrower}
          onChange={onChange} placeholder="Edit Borrower's Name"></Input>
      </FormGroup>
      <Button type="submit">Update</Button>
      <Link to="/" className="btn btn-danger ms-2">Cancel</Link>
    </Form>
  )
}