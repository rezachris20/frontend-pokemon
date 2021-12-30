import React, { Component } from 'react'
import { Table,Button  } from 'react-bootstrap';
import { Redirect } from 'react-router';

class DataPokemon extends Component {
    state = {
        isDetail : false
    }

    detailPokemon(params) {
       this.setState({
           isDetail : true
       })
    }
    render(){
        console.log(this.state.isDetail)
        const dataPokemon = this.props.data
        if(this.state.isDetail) return <div>sa</div>
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