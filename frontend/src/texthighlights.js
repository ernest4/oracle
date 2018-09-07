import React, {Component} from 'react';

class Green extends Component {
    render() {
        return(
            <span style={{color: 'green'}}><b>{this.props.word}</b></span>
        );
    }
}

export {Green};