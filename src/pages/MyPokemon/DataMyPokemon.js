import React, { Component } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

import globalVariable from "../../globalVariable";
import axios from "axios";
import swal from "sweetalert";

const { baseUrlAPI } = globalVariable;

export default class DataMyPokemon extends Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      isShow: false,
      pokemon_nickname: "",
      pokemon_id: 0,
      myPokemons: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getListPokemon = async () => {
    var self = this;
    const url = baseUrlAPI + "pokemon/list/"+this.props.userID;

    const pokemon = await axios
      .get(url)
      .then(function (response) {
        self.setState({ myPokemons: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getListPokemon();
  }

  handleChange(event) {
    this.setState({ pokemon_nickname: event.target.value });
  }
  closeModal = async () => {
    this.setState({
      isShow: false,
    });
  };

  releasePokemon = async (id) => {
    swal({
      title: "Are you sure?",
      text: "pokemon will be released, this process maybe fail!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.submitReleasePokemon(id);
      }
    });
  };

  submitReleasePokemon = async (id) => {
    var self = this;
    const url = baseUrlAPI + "pokemon/release/"+id;
    await axios
      .delete(url)
      .then(function (res) {
        swal("Release Success", {
          icon: "success",
        });
        self.getListPokemon();
      })
      .catch(function (err) {
        swal("Release Failed", {
          icon: "error",
        });
      });
  };

  renamePokemon = async (id, nick_name) => {
    this.setState({
      isShow: true,
      pokemon_nickname: nick_name,
      pokemon_id: id,
    });
  };

  submitRename = async () => {
    var self = this;
    const url = baseUrlAPI + "pokemon/rename/" + this.state.pokemon_id;

    let data = {
      nick_name: this.state.pokemon_nickname,
    };

    await axios
      .post(url, data)
      .then(function (res) {
        self.setState({ isShow: false });
        self.getListPokemon();
      })
      .catch(function (err) {
        self.setState({ isShow: false });
      });
  };
  render() {
    const dataPokemon = this.state.myPokemons;
    
    return (
      <div>
        <Modal show={this.state.isShow}>
          <Modal.Header>
            <Modal.Title>Rename your pokemon Nickname</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Set your pokemon nickname."
                  value={this.state.pokemon_nickname}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.submitRename}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Real Name</th>
              <th>Nickname</th>
              <th className="th-image">Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                ((dataPokemon === null) || (dataPokemon.length == 0)) ? [] :
            dataPokemon.map((list) => {
              return (
                <tr key={list.id}>
                  <td>{list.name}</td>
                  <td>{list.nick_name}</td>
                  <td>
                    <img className="my-image" src={list.image_url} />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        this.releasePokemon(list.id);
                      }}
                    >
                      Release
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        this.renamePokemon(list.id, list.nick_name);
                      }}
                    >
                      Rename
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
