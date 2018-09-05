import React, {Component} from 'react';
import {Panel, Button} from 'react-bootstrap';

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

export {PanelBlack, PanelGreen, PanelBlue, PanelRed, PanelCat};