import React, { Component } from "react";
import { Table, Button, Card } from "react-bootstrap";
import DetailPokemon from "./DetailPokemon";
import globalVariable from "../../globalVariable";
import axios from "axios";
import "./ListPokemon.css";

const { baseUrlAPI } = globalVariable;

class DataPokemon extends Component {
  state = {
    isDetail: false,
    detailData: [],
    moveAndType: [],
  };

  detailPokemon(id, name, image) {
    this.setState({
      isDetail: true,
      detailData: {
        id: id,
        name: name,
        image: image,
      },
    });

    this.getDetailPokemon(name);
  }

  handleBack() {
    this.setState({
      isDetail: !this.state.isDetail,
    });
  }

  getDetailPokemon = async (name) => {
    const url = baseUrlAPI + "pokemon/" + name;
    const detail = await axios.get(url);
    this.setState({
      moveAndType: detail.data,
    });
  };
  render() {
    const dataPokemon = this.props.data;
    if (this.state.isDetail)
      return (
        <div>
          <Button onClick={() => this.handleBack()} variant="primary" size="sm">
            Back
          </Button>
          <DetailPokemon
            detail={this.state.detailData}
            additional={this.state.moveAndType}
          />
        </div>
      );

    return (
      <div className="row">
        {dataPokemon.map((list) => {
          return (
            <Card 
              className="my-card" 
              key={list.name} 
              style={{ width: "18rem",margin: "1rem" }}
              onClick={() =>
                this.detailPokemon(list.id, list.name, list.image)
              }
            >
              <Card.Img variant="top" src={list.image} />
              <Card.Body>
                <Card.Title className="card-title">{list.name}</Card.Title>
              </Card.Body>
            </Card>
          );
        })}
        {/* <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="th-name">Name</th>
              <th className="th-image">Image</th>
            </tr>
          </thead>
          <tbody>
            {dataPokemon.map((list) => {
              return (
                <tr key={list.name}>
                  <td
                    onClick={() =>
                      this.detailPokemon(list.id, list.name, list.image)
                    }
                  >
                    {list.name}
                  </td>
                  <td>
                    <img
                      onClick={() =>
                        this.detailPokemon(list.id, list.name, list.image)
                      }
                      className="my-image"
                      src={list.image}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table> */}
      </div>
    );
  }
}

export default DataPokemon;
