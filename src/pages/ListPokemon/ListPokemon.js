
import React, { Component,Fragment } from 'react'
import { MDBDataTableV5 } from 'mdbreact';
import globalVariable from '../../globalVariable';
import axios from 'axios';

import DataPokemon from './DataPokemon';

const {baseUrlAPI} = globalVariable;

export default class ListPokemon extends Component {
    state = {
        dataPokemons: [],
    };

    getListPokemon = async () => {
        const url = baseUrlAPI + "pokemon"
        const pokemon = await axios.get(url)
        this.setState({
            dataPokemons: pokemon.data.results
        })
    }

    componentDidMount() {
        this.getListPokemon()
    }
    render(){
        return(
            <Fragment>
              <div className='col-md-12 mt-5'>
              <DataPokemon data={this.state.dataPokemons} />
              </div>
            </Fragment>
        )
    }
}
