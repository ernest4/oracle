import React, { Component } from 'react';
import {Grid, Row, Col, Image, Button, Panel} from 'react-bootstrap';
import logo from './images/logo.svg';
import myoracle from './images/myoracle.png'
import './App.css';
import {PanelResult, YesButton, NoButton} from './results.js';
import {PanelBlack, PanelGreen, PanelBlue, PanelRed, PanelCat} from './panels.js';
import Footer from './footer.js';
import ContentEditable from 'react-contenteditable';



class App extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.submitUserQuery.bind(this);

    this.state = {gotResult: false,
                  inputtext: "Let's chat!",
                  responsetext: '',
                  isLoading: false,
                  firstInput: true };
  }

  handleInput = evt => {
    console.log(evt.target.value);

    let wordList = evt.target.value.split(" ");
    console.log(wordList);
    //let finalString = "";
    for (let i = 0; i < wordList.length; i++){
      //coloring text
      if (wordList[i] === "you") {
        wordList[i] = `<span style="color: green;"><b>${wordList[i]}</b></span>`;
      }
      console.log(`index: ${i} word: ${wordList[i]}`)

      //finalString += wordList[i];
    }

    //this.setState({ inputtext: evt.target.value});
    //this.setState({ inputtext: finalString});
    this.setState({ inputtext: wordList.join(' ')});
  };

  
  submitUserQuery(text = "") {
    this.setState({ isLoading: true });

    fetch(`/query/response?text=${text}`, {
        method: "GET",
        dataType: "JSON",
        mode: 'cors',
    })
    .then( response => response.json() )
    .then((data) => {
      console.log(data); //TESTING...
      console.log(data.text); //TESTING...
      this.setState({ isLoading: false, gotResult: true, responsetext: data.text });
    })
    .catch((error) => {
        console.log(error, "THERE WAS AN ERROR");
    });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={myoracle} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Oracle!</h1>
        </header>

        <br />

        {/*Helping info*/}
        <Grid>
          <Row>
            <div className="col-sm-6">
                <PanelBlack />
            </div>
            <div className="col-sm-6">
                <PanelGreen />
            </div>
          </Row>

          <Row>
            <div className="col-sm-6">
                <PanelBlue />
            </div>
            <div className="col-sm-6">
                <PanelRed />
            </div>
          </Row>
        </Grid>

        <br/>

        <Grid>
          <Row>
            <Col sm={4}>
              <p><b>Come let's chat! Tell me about your day,
                or let's have a conversation about what interests you.
                With time, I can learn!
              </b></p>
            </Col>

            <Col sm={4}>
              <Image src={myoracle} style={{ maxHeight: '100%', maxWidth: '100%'}} rounded />
            </Col>

            <Col sm={4}>
              <PanelCat />
            </Col>
          </Row>

          <br/>

          <Row> {/*User input*/}
            <Col sm={3}>
              {/*space*/}
            </Col>
            <Col sm={5}>
              <ContentEditable html={this.state.inputtext} //innerHTML of the editable div
                                  disabled={false} //use true to disable editting
                                  onChange={this.handleInput} //handle innerHTML change
                                  onClick={() => { if (this.state.firstInput == true) {
                                    this.setState({ firstInput: false, inputtext: '' });
                                  }}}
                                  />
            </Col>
            <Col sm={1}>
            <Button
                bsStyle="primary"
                disabled={this.state.isLoading}
                onClick={!this.state.isLoading ? () => this.submitUserQuery(this.state.inputtext) : null} //Only allow clicking once done with first request
              >
              {this.state.isLoading ? 'Thinking...' : 'Say'}
            </Button>
            </Col>
            <Col sm={3}>
              {/*space*/}
            </Col>
          </Row>

          <br/>

          <Row> {/*Oracle output*/}
            <Col sm={3}>
              {/*space*/}
            </Col>

            <Col sm={5}>
              {this.state.responsetext ? <PanelResult text={this.state.responsetext}/> : null}            
            </Col>
            

            <Col sm={4}>
              <Row>
                <Col xs={6} sm={6}>
                  {this.state.responsetext ? <p>Am I making sense?</p> : null}
                </Col>

                <Col xs={3} sm={3}>
                  {this.state.responsetext ? <YesButton /> : null} 
                </Col>

                <Col xs={3} sm={3}>
                  {this.state.responsetext ? <NoButton /> : null}
                </Col>
              </Row>
            </Col>

          </Row>
        </Grid>

        <br/>

        <Footer />
      </div>
    );
  }
}

export default App;
