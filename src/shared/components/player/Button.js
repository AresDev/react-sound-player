import React, { Component } from 'react';

export class Button extends Component {
    render() {
        return (
            <div>
                  { this.props.children } 
            </div>
        );
    }
}

export default Button;
