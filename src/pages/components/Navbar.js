import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./Navbar.css"
import Login from '../../Login'
import Register from '../../Register'
import ListPokemon from "../ListPokemon/ListPokemon";


export default function Header() {
    return (
      <Router>
        <Navbar
          sticky="top"
          collapseOnSelect
          expand="lg"
          // bg="primary"
          className="cstm-navbar"
          variant="dark"
        >
          <Navbar.Brand href="#">Pokemon</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Link className="cstm-navlink" to="/list-pokemon">List Pokemon</Link>
              <Link className="cstm-navlink" to="/login">Login</Link>
              <Link className="cstm-navlink" to="/register">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/list-pokemon">
            <ListPokemon />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    );
  }

  function Home() {
    return <h2>Home</h2>;
  }
  
  function About() {
    return <h2>About</h2>;
  }
  
  function Users() {
    return <h2>Users</h2>;
  }