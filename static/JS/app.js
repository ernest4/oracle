class App extends React.Component {
    constructor(props) {
        super(props); //initializes 'this' keyword

        this.state = {
            message: "my friend (from state)!"
        };

        //bind 'this' keyword to updateMessage() in order to allow updateMessage()
        //to have access to 'this' keyword within its method body.
        this.updateMessage = this.updateMessage.bind(this);
    }

    updateMessage() {
        this.setState({
            message: "my friend (from changed state)!"
        });
    }

    render() {
        return (
            <div>
                <h1>Hello {this.state.message}</h1>
                <button onClick={this.updateMessage}>Click Me!</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App message="my friend"/>,
    document.getElementById("root")
);