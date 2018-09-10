import React, {Component} from 'react';
import {Panel, Button, Grid, Row, Tabs, Tab, Carousel, Well} from 'react-bootstrap';

class PanelBlack extends Component {
    render() {
        return (
            <Panel id="collapsible-panel-example-2">
                <Panel.Heading>
                <Panel.Title toggle>
                    <b>Black words I'll try to understand</b>
                </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                <Panel.Body>
                    Tell me....Do you know...The...and...or...
                </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

class PanelGreen extends Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                <Panel.Title toggle>
                    <b><span style={{ color: "green"}}>Green</span> words I know</b>
                </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                <Panel.Body>
                    How are <b><span style={{ color: "green"}}>you</span></b>?...Hey
                    <b><span style={{ color: "green"}}> Oracle</span></b>, how's
                    <b><span style={{ color: "green"}}> your</span></b> day today?
                </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

class PanelBlue extends Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                <Panel.Title toggle>
                    <b><span style={{ color: "blue"}}>Blue</span> words I might learn</b>
                </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                <Panel.Body>
                    Tell me about <b><span style={{ color: "blue"}}>planes</span></b>. Do you
                    know anything about <b><span style={{ color: "blue"}}>elephants</span></b>?
                    What's the <b><span style={{ color: "blue"}}>distance</span></b> between New York and London?
                </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

class PanelRed extends Component {
    render() {
        return (
            <Panel>
                <Panel.Heading>
                <Panel.Title toggle>
                    <b><span style={{ color: "red"}}>Red</span> words I don't recognise (yet)</b>
                </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                <Panel.Body>
                    <b><span style={{ color: "red"}}>wooooooah</span></b> this 
                    is <b><span style={{ color: "red"}}>sooooo</span></b> cool!
                    I'm just talking nonsense <b><span style={{ color: "red"}}>yuewrnruhui43jsk</span></b> :)
                </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

class PanelCat extends Component {
    render() {
        return(
            <Panel>
                <Panel.Heading>
                <Panel.Title toggle>
                    I'm pretty good at recognising <b><span style={{ color: "orange"}}>cats</span></b> too,
                    just upload a cat picture <b><span style={{ color: "blue"}}>here</span></b>.
                </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                <Panel.Body>
                    <p style={{color: "red"}}>*COMMING SOON*</p>
                    <Button
                    bsStyle="warning"
                    disabled={true}
                    onClick={null} //Only allow clicking once done with first request
                    >Upload</Button>
                </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

class PanelAutosuggest extends Component {
    render() {
        return(
            <Panel>
                <Panel.Heading>
                <Panel.Title toggle>
                    <b>AutoSuggest -</b> 
                    <b><span style={{ color: "green"}}> Syntax </span></b>
                    <b><span style={{ color: "red"}}>Highlighting</span></b>
                </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                <Panel.Body>
                    <p style={{color: "red"}}>*BETA*</p>

                    <Tabs defaultActiveKey={1} id="uncontrolled-tab">
                        <Tab eventKey={1} title="Black">
                            <br/><b>Black</b> words Oracle will try to handle: <br/><br/>
                            <Well bsSize="large">about....does...the...and...or...</Well>
                        </Tab>
                        <Tab eventKey={2} title="Green">
                            <br/><b><span style={{ color: "green"}}>Green</span></b> words Oracle knows: <br/><br/>
                            <Well bsSize="large">
                                How are <b><span style={{ color: "green"}}>you</span></b>?...Hey
                                <b><span style={{ color: "green"}}> Oracle</span></b>, how's
                                <b><span style={{ color: "green"}}> your</span></b> day today?
                            </Well>
                        </Tab>
                        <Tab eventKey={3} title="Blue">
                            <p style={{color: "red"}}>*COMMING SOON*</p>
                            <b><span style={{ color: "blue"}}>Blue</span></b> words Oracle might learn: <br/><br/>
                            <Well bsSize="large">
                                Tell me about <b><span style={{ color: "blue"}}>planes</span></b>. Do you
                                know anything about <b><span style={{ color: "blue"}}>elephants</span></b>?
                                What's the <b><span style={{ color: "blue"}}>distance</span></b> between New York and London?
                            </Well>
                        </Tab>
                        <Tab eventKey={4} title="Red">
                            <p style={{color: "red"}}>*COMMING SOON*</p>
                            <b><span style={{ color: "red"}}>Red</span></b> words Oracle doesn't recognise (yet): <br/><br/>
                            <Well bsSize="large">
                                <b><span style={{ color: "red"}}>wooooooah</span></b> this 
                                is <b><span style={{ color: "red"}}>sooooo</span></b> cool!
                                I'm just talking nonsense <b><span style={{ color: "red"}}>yuewrnruhui43jsk</span></b> :)
                            </Well>
                        </Tab>
                        <Tab eventKey={5} title="Color Blind?">
                            <br/>Black words Oracle will try to handle: <br/><br/>
                            <Well bsSize="small">about....does...the...and...or...</Well>

                            <b>Bold</b> words Oracle knows: <br/><br/>
                            <Well bsSize="small">Hey <b>Oracle</b> how are <b>you</b>?</Well>
                            
                            <p style={{color: "red"}}>*COMMING SOON*</p>
                            <i>Italicized</i> words Oracle might learn: <br/><br/>
                            <Well bsSize="small">Do you know anything about <i>elephants</i>?</Well>

                            <p style={{color: "red"}}>*COMMING SOON*</p>
                            <u>Underlined</u> words Oracle doesn't recognise (yet): <br/><br/>
                            <Well bsSize="small"><u>sooooo</u> cool! I'm just talking nonsense <u>yuewrnruhui43jsk</u> :)</Well>
                        </Tab>
                    </Tabs>

                    <br/>

                    <Button
                    bsStyle="warning"
                    disabled={false}
                    onClick={this.props.onClick}
                    >{this.props.enableAutoSuggest ? "Disable" : "Enable"}</Button>
                </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}

class AutoSuggestSection extends Component {
    render() {
        return(
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
        );
    }
}

export {PanelBlack, PanelGreen, PanelBlue, PanelRed, PanelCat, PanelAutosuggest, AutoSuggestSection};