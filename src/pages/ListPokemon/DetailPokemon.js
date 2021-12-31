import React, { Component } from "react";
import { Alert, Button, Modal,Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";

import globalVariable from "../../globalVariable";

const { baseUrlAPI } = globalVariable;

class DetailPokemon extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      isShow: false,
      pokemon_id : props.detail.id,
      pokemon_name : props.detail.name,
      pokemon_nickname :"",
      user_id: 1,
      image_url:props.detail.image
    };

    this.handleChange = this.handleChange.bind(this)
  }

  closeModal = async () => {
    this.setState({
      isShow: false,
    });
  };

  catchPokemon = async (id) => {
    const url = baseUrlAPI + "pokemon/catch/" + id;
    var self = this;

    const pokemon = await axios
      .get(url)
      .then(function (response) {
        if (response.data.meta.status == "failed") {
          swal("Failed!", "You failed to catch!", "error");
        } else {
          self.setState({
            isShow: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange(event){
    this.setState({pokemon_nickname: event.target.value})
  }

  registerPokemon = async () => {
    var self = this;
    const url = baseUrlAPI + "pokemon/register"

    let data ={
      pokemon_id:this.state.pokemon_id,
      pokemon_name:this.state.pokemon_name,
      nick_name:this.state.pokemon_nickname,
      user_id:this.state.user_id,
      image_url:this.state.image_url,
    }
    console.log(data)
    await axios.post(url,data)
    .then(function(res){
      console.log(res)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  render() {
    const detailPokemon = this.props.detail;
    const additionalPokemon = this.props.additional;
    if (additionalPokemon.length == 0) return <div></div>;
    
    return (
      <div>
        <Modal show={this.state.isShow}>
          <Modal.Header>
            <Modal.Title>Success catch the pokemon</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nickname</Form.Label>
                <Form.Control type="text" placeholder="Set your pokemon nickname." value={this.state.pokemon_nickname} onChange={this.handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.registerPokemon}>
              Register
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
          <div>
            <img src={detailPokemon.image} />
          </div>
          <div>
            <div className="column">
              <div>Name : {detailPokemon.name}</div>
              <div>
                Move:
                <ul>
                  {additionalPokemon.moves.map((v, m) => {
                    return <li key={m}>{v.move.name}</li>;
                  })}
                </ul>
                Types:
                <ul>
                  {additionalPokemon.types.map((v, m) => {
                    return <li key={m}>{v.type.name}</li>;
                  })}
                </ul>
              </div>
              <div>
                <div className="row">
                  <div>
                    <Button
                      variant="info"
                      size="sm"
                      title="Success Rate 50%. Try now!"
                      onClick={() => {
                        this.catchPokemon(additionalPokemon.id);
                      }}
                    >
                      Catch Me
                    </Button>
                  </div>
                  <div>
                    <Alert variant="danger">Failed to catching</Alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailPokemon;
