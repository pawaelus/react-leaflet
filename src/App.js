import React from 'react';
import './App.css';
import Map from './components/Map';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {markerPosition: { lat: 51.8419, lng: 21.0315 }}
    }

    moveMarker = () => {
        const { lat, lng } = this.state.markerPosition;
        this.setState({
            markerPosition: {
                lat: lat + Math.floor(Math.random() * 10),
                lng: lng + Math.floor(Math.random() * 10),
            }
        });
    };



    render() {
        const { markerPosition } = this.state;

        return(
            <div>
            <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Button  color="inherit"  aria-haspopup="true" onClick={this.moveMarker}>
                    moveCircleMarker
                </Button>

            </Toolbar>
        </AppBar>


        <Map markerPosition={markerPosition} />,

        {/*<button  onClick={this.moveMarker}>p_button</button>*/}
            </div>
        )


    }
}


export default App;
