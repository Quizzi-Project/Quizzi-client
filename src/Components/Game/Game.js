import React, {Component} from 'react';
import GameButtons from '../GameButtons';

class Game extends Component{

    constructor(props){
        super(props);

        this.state = {
            score: 0
        }
    }

    // functinos

    render(){
        return(
            <div>
                <GameButtons/>
            </div>            
        )
    }
}

export default Game;