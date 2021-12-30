import React, { Component } from 'react'
import { Table,Button  } from 'react-bootstrap';
import DetailPokemon from './DetailPokemon';
import globalVariable from '../../globalVariable';
import axios from 'axios';

const {baseUrlAPI} = globalVariable;

class DataPokemon extends Component {
    state = {
        isDetail : false
    }

    detailPokemon(params) {
       this.setState({
           isDetail : true
       })
       this.getDetailPokemon(params)
    }

    handleBack(){
        this.setState({
            isDetail : !this.state.isDetail
        })
    }

    getDetailPokemon = async (name) => {
        const url = baseUrlAPI + "pokemon/"+name
        const detail = await axios.g
    }
    render(){
        const dataPokemon = this.props.data
        if(this.state.isDetail) return (
            <div>
                <DetailPokemon />
                <Button onClick={() => this.handleBack()} variant="primary" size="sm">Back</Button>
            </div>
        )
        
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataPokemon.map((list) => {
                            return(
                                <tr key={list.name}>
                                    <td>{list.name}</td>
                                    <td>
                                        <Button onClick={() => this.detailPokemon(list.name)} variant="primary" size="sm">Detail</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table >
            </div>
        )
    }
}

export default DataPokemon