import React, { Component } from 'react';
import {Grid, Row, Col, Image, Button, Panel} from 'react-bootstrap';
import logo from './images/logo.svg';
import myoracle from './images/myoracle.png'
import './App.css';
import {PanelResult, YesButton, NoButton} from './results.js';
import {PanelBlack, PanelGreen, PanelBlue, PanelRed, PanelCat} from './panels.js';
import Footer from './footer.js';
import ContentEditable from 'react-contenteditable';
import scrollToComponent from 'react-scroll-to-component';
import {Green} from './texthighlights.js';



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

  componentDidMount() {
    //pass
  }


  handleInput = evt => {
    //return; //DISABLE SYNTAX HIHLIGHTING

    let knownWords = ["you", "me"];
    let knownWordsRegExpStr = ""
    knownWords.forEach((word, index) => {
      if (index == knownWords.length-1) {
        knownWordsRegExpStr += `${word}`;
      } else {
        knownWordsRegExpStr += `${word}|`;
      }
    });
    //console.log(`words regex: ${knownWordsRegExpStr}`); //DEBUGGING
    let knownWordsRegExpFinder = new RegExp(`\\b(${knownWordsRegExpStr})(?=[^\\w])`,"g");
    let knownWordsRegExpValidator = new RegExp(`\\b(${knownWordsRegExpStr})`,"g");


    let offsetCursor = false;
    let finalString = '';
    console.log(`handleInput:: incoming string: ${evt.target.value}`); //DEBUGGING

    //console.log(`:___${evt.nativeEvent.data}___:`); //DEBUGGING
    /*if (evt.nativeEvent.data !== " ") {
      return;
    }*/

    let userInput = document.getElementById("userInput");
    let range = document.createRange();
    //let lastNode = userInput.childNodes.length;

    let SPAN = 1;
    let TEXT = 3;
    console.log(`handleInput:: child nodes: `, userInput.childNodes); //DEBUGGING

    userInput.childNodes.forEach((node, index) => {
      if (node.nodeType === TEXT) {
        console.log(`Processing text: :__${node.textContent}__:`); //DEBUGGING
        finalString += processText(node.textContent);
      } else if (node.nodeType === SPAN) {
        console.log(`Processing keyword: :__${node.textContent}__:`); //DEBUGGING
        //console.log("Processing keyword: ",node); //DEBUGGING

        //finalString += validateSPAN(node);
        //finalString += node.outerHTML;

        //finalString += processText(node.textContent);
        finalString += validateSPAN(node.textContent);
        //finalString += processText(node.outerHTML);
      }
    });

    this.setState({ inputtext: finalString }, () => {
      /*if (offsetCursor) {
        setCaretPosition();
      }*/
      setCaretPosition();
    });

    function processText(text) {
      //REGEXP WAY
      let parsed = text.replace(knownWordsRegExpFinder,'<span style="color: green;"><b>$1</b></span><text></text>');
      //parsed = parsed.replace(unknownWordsRegExp,'<span style="color: red;"><b>$1</b></span>');
      //parsed = parsed.replace(learnWordsRegExp,'<span style="color: blue;"><b>$1</b></span>');
      return parsed;
    }

    function validateSPAN(text) {
      let parsed = text.replace(knownWordsRegExpValidator,'<span style="color: green;"><b>$1</b></span><text></text>');
      //parsed = parsed.replace(unknownWordsRegExp,'<span style="color: red;"><b>$1</b></span>');
      //parsed = parsed.replace(learnWordsRegExp,'<span style="color: blue;"><b>$1</b></span>');
      return parsed;
    }

    function setCaretPosition() {
      let userInput = document.getElementById("userInput");
      let range = document.createRange();
      let sel = window.getSelection();
      let lastNode = userInput.childNodes.length-1;
  
      // TESTING
      console.log("setCaretPosition:: ",userInput.childNodes,
                  "Child Nodes Lenght: ",userInput.childNodes.length,
                  "Last Node: ", lastNode);
  
      //range.setStart(userInput.childNodes[lastNode-1], 1);
      range.setStart(userInput.childNodes[lastNode], userInput.childNodes[lastNode].textContent.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
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
                                  onClick={() => { if (this.state.firstInput === true) {
                                    this.setState({ firstInput: false, inputtext: '' });
                                  }}}
                                  className="UserContent"
                                  ref={(ContentEditable) => {this.UserContent = ContentEditable;}}

                                  id="userInput"
                                  />
            </Col>
            <Col sm={1}>
            <Button
                bsStyle="primary"
                disabled={this.state.isLoading}
                onClick={!this.state.isLoading ? () => {
                  scrollToComponent(this.UserContent);
                  return this.submitUserQuery(this.state.inputtext)
                } : null} //Only allow clicking once done with first request
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
