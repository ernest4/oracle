import React, { Component } from 'react';
import {Grid, Row, Col, Image, Button, Panel} from 'react-bootstrap';
import logo from './images/logo.svg';
import myoracle from './images/myoracle.png'
import './App.css';
import {PanelResult, YesButton, NoButton} from './results.js';
import {PanelBlack, PanelGreen, PanelBlue, PanelRed, PanelCat, PanelAutosuggest, AutoSuggestSection} from './panels.js';
import Footer from './footer.js';
import ContentEditable from 'react-contenteditable';
import scrollToComponent from 'react-scroll-to-component';
import {Green} from './texthighlights.js';



class App extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.submitUserQuery.bind(this);

    this.state = {gotResult: false,
                  rawInputText: "Let's chat!", //for front end with formating e.g. <span>...
                  inputText: "", //for sending to back end, pure text, no HTML elementes.
                  responsetext: '',
                  isLoading: false,
                  firstInput: true,
                  enableAutoSuggest: false};
  }

  componentDidMount() {
    //pass
  }


  handleInput = evt => {
    //return; //DISABLE SYNTAX HIHLIGHTING

    let knownWords = ["you", "i", "alive"];
    let knownWordsRegExpStr = ""
    knownWords.forEach((word, index) => {
      if (index == knownWords.length-1) {
        knownWordsRegExpStr += `${word}`;
      } else {
        knownWordsRegExpStr += `${word}|`;
      }
    });
    //console.log(`words regex: ${knownWordsRegExpStr}`); //DEBUGGING
    let knownWordsRegExpFinder = new RegExp(`\\b(${knownWordsRegExpStr})(?=[^\\w])`,"gi");
    let knownWordsRegExpValidator = new RegExp(`\\b(${knownWordsRegExpStr})`,"gi");


    let offsetCursor = false;
    let finalRawString = ''; //for front end with formating e.g. <span>...
    let finalInputTextString = ''; //for sending to back end, pure text, no HTML elementes.
    //console.log(`handleInput:: incoming string: ${evt.target.value}`); //DEBUGGING

    //console.log(`:___${evt.nativeEvent.data}___:`); //DEBUGGING
    /*if (evt.nativeEvent.data !== " ") {
      return;
    }*/

    let userInput = document.getElementById("userInput");
    let range = document.createRange();
    //let lastNode = userInput.childNodes.length;

    let SPAN = 1; //or FONT
    let TEXT = 3;
    console.log(`handleInput:: child nodes: `, userInput.childNodes); //DEBUGGING

    userInput.childNodes.forEach((node, index) => {
      let text = node.textContent;
      if (node.nodeType === TEXT) {
        console.log(`Processing text: :__${text}__:`); //DEBUGGING
        finalRawString += processText(text);
        finalInputTextString += text;
      } else if (node.nodeType === SPAN) {
        console.log(`Processing keyword: :__${text}__:`); //DEBUGGING
        //console.log("Processing keyword: ",node); //DEBUGGING

        //finalString += validateSPAN(node);
        //finalString += node.outerHTML;

        //finalString += processText(node.textContent);
        finalRawString += validateSPAN(text);
        finalInputTextString += text;
        //finalString += processText(node.outerHTML);
      }
    });

    this.setState({ rawInputText: finalRawString, inputText: finalInputTextString }, () => {
      console.log(`FOR BACKE END: ${this.state.inputText}`); //DEBUGGING
      setCaretPosition();
    });

    function processText(text) {
      //REGEXP WAY
      let parsed = text.replace(knownWordsRegExpFinder,'<span style="color: green;"><b>$1</b></span><text></text>');
      //parsed = parsed.replace(unknownWordsRegExp,'<span style="color: red;"><b>$1</b></span><text></text>');
      //parsed = parsed.replace(learnWordsRegExp,'<span style="color: blue;"><b>$1</b></span><text></text>');
      return parsed;
    }

    function validateSPAN(text) {
      let parsed = text.replace(knownWordsRegExpValidator,'<span style="color: green;"><b>$1</b></span><text></text>');
      //parsed = parsed.replace(unknownWordsRegExp,'<span style="color: red;"><b>$1</b></span><text></text>');
      //parsed = parsed.replace(learnWordsRegExp,'<span style="color: blue;"><b>$1</b></span><text></text>');
      return parsed;
    }

    function setCaretPosition() {
      let userInput = document.getElementById("userInput");
      let range = document.createRange();
      let sel = window.getSelection();
      let lastNode = userInput.childNodes.length-1;

      let caretLastPos = sel.getRangeAt(0).endOffset;
  
      // TESTING
      console.log("setCaretPosition:: ",userInput.childNodes,
                  "Child Nodes Number: ",userInput.childNodes.length,
                  "Last Node: ", lastNode,
                  "Caret Last Position: ", caretLastPos,
                  "Sel Range Count: ", sel.rangeCount);
  
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
            <Col sm={12}>
              <PanelAutosuggest onClick={() => { this.setState({ enableAutoSuggest: !this.state.enableAutoSuggest })}}
                                  enableAutoSuggest={this.state.enableAutoSuggest}
                                  />
            </Col>
          </Row>
        </Grid>
        {this.state.enableAutoSuggest ? <AutoSuggestSection /> : null} 

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
              <ContentEditable html={this.state.rawInputText} //innerHTML of the editable div
                                  disabled={false} //use true to disable editting
                                  //onChange={this.handleInput} //handle innerHTML change

                                  onChange={() => {setTimeout(this.handleInput, 3000)}} //delay to improve performance

                                  onClick={() => { if (this.state.firstInput === true) {
                                    this.setState({ firstInput: false, rawInputText: '' });
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
                    return this.submitUserQuery(this.state.inputText);
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
