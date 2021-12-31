import React, {useState,useEffect} from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./Navbar.css"
import Login from '../../Login'
import Register from '../../Register'
import ListPokemon from "../ListPokemon/ListPokemon";
import MyPokemon from "../MyPokemon/MyPokemon";


export default function Header() {
  const [id, setId] = useState(() => {
    const saved = localStorage.getItem("id")
    const initialValue = JSON.parse(saved)
    return initialValue || ""
  })

  const logout = () => {
    localStorage.removeItem("id")
    window.location.reload()
  }
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
              {(id != "") ? <Link className="cstm-navlink" to="/my-pokemon">My Pokemon</Link> :[]}
              {(id != "") 
              ? <Link className="cstm-navlink" onClick={logout}>Logout</Link> 
              :<Link className="cstm-navlink" to="/login">Login</Link>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/list-pokemon">
            <ListPokemon />
          </Route>
          <Route path="/my-pokemon">
            {id != "" ? <MyPokemon /> : <Redirect to="/login" /> }
          </Route>
          <Route path="/login">
            {id == "" ? <Login /> : <Redirect to="/my-pokemon" /> }
          </Route>
        </Switch>
      </Router>
    );
  }
