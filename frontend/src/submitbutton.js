import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


class SubmitButton extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleClick = this.handleClick.bind(this);
  
      this.state = {
        isLoading: false
      };
    }
  
    handleClick(text = "") {
      this.setState({ isLoading: true });
  
      fetch(`/query/autocomp?text=${text}`, {
          method: "GET",
          dataType: "JSON",
          mode: 'cors',
      })
      .then( response => response.json() )
      .then((data) => {
        console.log(data); //TESTING...
        console.log(data.a); //TESTING...
        console.log(data.d[2]); //TESTING...
        this.setState({ isLoading: false });
      })
      .catch((error) => {
          console.log(error, "THERE WAS AN ERROR");
      });
    }

    componentDidMount(){
        // For initial data fetch if needed...
        //this.handleClick();
    }
  
    render() {
      const { isLoading } = this.state;
  
      return (
        <Button
          bsStyle="primary"
          disabled={isLoading}
          onClick={!isLoading ? () => this.handleClick(this.state.text) : null} //Only allow clicking once done with first request
        >
          {isLoading ? 'Thinking...' : 'Say'}
        </Button>
      );
    }
  }
  
  export default SubmitButton;