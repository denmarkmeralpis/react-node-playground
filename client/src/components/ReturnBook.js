import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link, useHistory } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'

export const ReturnBook = () => {
  const [reference, setReference] = useState('none');
  const { returnBook, findLogByRef, logData } = useContext(GlobalContext);
  const [log, setLog] = useState({})
  const history = useHistory();
  const [notice, setNotice] = useState('');

  const onFindLog = () => {
    returnBook(reference).then(
      response => {
        if(response.data.affectedRows > 0) {
          history.push('/')
        } else {
          setNotice(
            <div className="alert alert-danger" role="alert">
              Reference No. <b>{reference}</b> does not exists. Try again!
            </div>
          )
        }
      }
    );
  }

  return (
    <Form>
      { notice }
      <FormGroup>
        <Label>Reference No.</Label>
        <Input type="text" placeholder="Enter Reference #"
               onChange={(e) => { setReference(e.target.value) }}></Input>
      </FormGroup>
      <Button onClick={ onFindLog }>Submit</Button>
      <Link to="/" className="btn btn-danger ms-2">Cancel</Link>
    </Form>
  )
}