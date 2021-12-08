import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  Container
} from 'reactstrap';

export const Heading = () => {
  return(
    <Navbar color="dark" dark>
      <Container>
        <NavbarBrand style={{ float: "left" }} href="/">Book Borrower Logger</NavbarBrand>
        <Nav style={{ float: "right" }}>
          <NavItem>
            <Link to="/new" className="btn btn-primary">Add Log</Link>
          </NavItem>
          <NavItem className="ms-2">
            <Link to="/return" className="btn btn-success">Return a Book</Link>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  )
}