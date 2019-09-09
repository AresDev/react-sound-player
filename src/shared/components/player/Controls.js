import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward, faPlay } from '@fortawesome/free-solid-svg-icons'

// import Button from './Button';


export class Controls extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>    
                        <button onClick={ this.props.backwardClicked }>
                            <FontAwesomeIcon icon={faBackward} />
                        </button>
                    </li>
                    <li>
                    <button onClick={ this.props.playPauseClicked }>
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    </li>
                    <li>
                    <button onClick={ this.props.forwardClicked }>
                            <FontAwesomeIcon icon={faForward} />
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Controls;
