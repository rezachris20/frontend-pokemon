import React,{Component, Fragment} from "react";
import globalVariable from '../../globalVariable';
import axios from 'axios';

import DataMyPokemon from './DataMyPokemon';

const {baseUrlAPI} = globalVariable;

export default class MyPokemon extends Component {

    render(){
        return(
            <Fragment>
                <div className="col-md-12 mt-5">
                    <DataMyPokemon />
                </div>
            </Fragment>
        )
    }
}