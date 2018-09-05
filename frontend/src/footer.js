import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

class Footer extends Component {
    render() {
        return(
            <Grid> {/*Footer*/}
                <div className="row">
                    <div className="col-sm-4">
                        <p>Developed by Ernestas Monkevicius</p>
                    </div>

                    <div className="col-sm-4">
                        {/*sapce*/}
                    </div>

                    <div className="col-sm-4">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item"><a href="#">Settings</a></li>
                            <li className="list-inline-item"><a href="#">Privacy</a></li>
                            <li className="list-inline-item"><a href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-copyright text-center blue2">
                    © 2018 Copyright: <a href="https://github.com/ernest4">Ernestas Monkevicius</a>
                </div>
            </Grid>
        );
    }
}

export default Footer;