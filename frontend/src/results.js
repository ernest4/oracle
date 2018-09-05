import React, {Component} from 'react';
import {Panel, Button} from 'react-bootstrap';

class PanelResult extends Component {
    render() {
        return (
            <hover title="Answer">
                <Panel bsStyle="success">
                    <Panel.Heading>
                    <Panel.Title componentClass="h3">Oracle:</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{this.props.text}</Panel.Body>
                </Panel>
            </hover>
        );
    }
}

class YesButton extends Component {
    render() {
        return (
            <Button
                bsStyle="success"
                disabled={false}
                onClick={null} //Only allow clicking once done with first request
                >Yes</Button>
        );
    }
}

class NoButton extends Component {
    render() {
        return (
            <Button
                bsStyle="danger"
                disabled={false}
                onClick={null} //Only allow clicking once done with first request
                >No</Button>
        );
    }
}

export {PanelResult, YesButton, NoButton};