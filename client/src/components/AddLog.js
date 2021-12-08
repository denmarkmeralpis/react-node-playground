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

export const AddLog = () => {
  const secureRandom = require('secure-random')
  const data = secureRandom.randomUint8Array(3)
  const referenceRandomizer = data.join('')

  const [book, setBook] = useState('');
  const [borrower, setBorrower] = useState('');

  const { createLog } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = () => {
    const newLog = {
      id: referenceRandomizer,
      book: book,
      reference: referenceRandomizer,
      borrower: borrower
    }

    createLog(newLog);

    history.push('/');
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Book</Label>
        <Input type="text" placeholder="Enter Book Title"
               value={book}
               onChange={(e) => { setBook(e.target.value) }}></Input>
      </FormGroup>
      <FormGroup>
        <Label>Borrower</Label>
        <Input type="text" placeholder="Enter Borrower Name"
               value={borrower}
               onChange={(e) => { setBorrower(e.target.value) }}></Input>
      </FormGroup>

      <Button type="submit">Submit</Button>
      <Link to="/" className="btn btn-danger ms-2">Cancel</Link>
    </Form>
  )
}