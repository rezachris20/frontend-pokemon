
import React, { Component,Fragment } from 'react'
import globalVariable from '../../globalVariable';
import axios from 'axios';

import DataPokemon from './DataPokemon';

const {baseUrlAPI} = globalVariable;

export default class ListPokemon extends Component {
    state = {
        dataPokemons: [],
        detailPokemon:[]
    };

    getListPokemon = async () => {
        var self = this;
        const url = baseUrlAPI + "pokemon"

        const pokemon = await axios.get(url)
        .then(function(response){
            // console.log(response)
            self.setState({dataPokemons: response.data.results})
            self.getDetail(response.data.results)
        
        })
        .catch(function(error){
            console.log(error)
        })
        
    }

    getDetail = async(pokemon) => {
        var self = this;
        let pokemonData = []
        
        pokemon.forEach(async function(data){
            let url = data.url
            let detail = await axios.get(url)
            .then(function(res){

                let id = res.data.id
                let name = res.data.name
                let images = res.data.sprites.other.home.front_default
                // console.log(images)
                self.setState({
                    detailPokemon:[
                        ...self.state.detailPokemon,
                        {id:id,name:name,image:images}
                    ]
                })
            })
         
        })
        // console.log(self.detailPokemon)
       
    }

    fetchPokemonData = async(pokemon) =>{
        let url = pokemon.url
        const detail = await axios.get(url)
        console.log(detail)
    }

    componentDidMount() {
        this.getListPokemon()
    }
    render(){
        return(
            <Fragment>
              <div className='col-md-12 mt-5'>
              <DataPokemon data={this.state.detailPokemon} />
              </div>
            </Fragment>
        )
    }
}
