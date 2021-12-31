import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Axios from "axios";
import globalVariable from "./globalVariable";

const { baseUrlAPI } = globalVariable;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [name,setName] = useState("");

  const login = async () => {
    const url = baseUrlAPI + "login";
    let data = {
      username: username,
      password: password,
    };
    await Axios.post(url, data)
      .then(function (resp) {
        localStorage.setItem("id", JSON.stringify(resp.data.data.id));
        handleClick();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const registerUser = async () => {
    const url = baseUrlAPI + "register";
    let data = {
      nama: name,
      username: username,
      password: password,
    };
    await Axios.post(url, data)
      .then(function (resp) {
        localStorage.setItem("id", JSON.stringify(resp.data.data.id));
        handleClick();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleClick = () => {
    window.location.reload();
  };

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function validateFormRegister() {
    return username.length > 0 && password.length > 0 && name.length > 0;
  }

  if (!register) {
    return (
      <div>
        <div className="Login">
          <Form>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              size="sm"
              type="button"
              onClick={login}
              disabled={!validateForm()}
            >
              Login
            </Button>
            <Button size="sm" onClick={(e) => setRegister(true)}>
              Register
            </Button>
          </Form>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="Login">
          <Form>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              size="sm"
              type="button"
              onClick={registerUser}
              disabled={!validateFormRegister()}
            >
              Register
            </Button>
            <Button size="sm" onClick={(e) => setRegister(false)}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
