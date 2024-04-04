import React,{useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase,Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

function Header({setCoordinates}) {
    const classes = useStyles();
    const [autocomplete,setAutocomplete] = useState(null);
    const onLoad = (autoC)=> setAutocomplete(autoC);
    const onPlaceChanged = () =>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        console.log(autocomplete);
        setCoordinates({lat,lng})
    };

    return(
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.bigText}>
                    TRAVEL ADVISOR APP
                    <span style={{ fontStyle: 'normal', marginLeft: '12px' }}>{'\u{1F30D}'}</span>
                    <Typography className={classes.smallText}>
                        Created by Peter Bui
                    </Typography>
                </Typography>

                <Box display='flex'>
                    <Typography variant='h6' className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder='Search...' classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Header;