
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Typography, Paper, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import  Rating  from '@material-ui/lab/Rating';
import useStyles from './styles';
import mapStyles from './mapStyles';

export default function Map({ setCoordinates, setBounds,coordinates, places, setChildClicked }) {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyDa9HXRx_BTI7kuIUEYuWHFczMkno4EHCY'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
                onChange={(e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw:e.marginBounds.sw});
                }}
                onChildClick={ (child) => setChildClicked(child) }
            >
                {
                    places?.map((place,i)=>(
                        <div
                            className={classes.markerContainer}
                            lat = {Number(place.latitude)}
                            lng = {Number(place.longitude)}
                            key = {i}>
                            {
                                !isDesktop?(
                                    < LocationOnOutlinedIcon color="primary" fontSize='large' />
                                ):(
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant='subtitle2' gutterBottom>{place.name}</Typography>
                                        <img className={classes.pointer} src={place.photo ? place.photo.images.large.url:'https://t3.ftcdn.net/jpg/02/21/40/16/240_F_221401603_6urJw6Di9KjlgcPgLfkdVLHtc5Q21aCx.jpg'} alt={place.name} />
                                        <Rating size='small' value={Number(place.rating)}readOnly />
                                    </Paper>
                                )
                            }
                        </div>
                    ))
                }
            </GoogleMapReact>
        </div>
    )
}