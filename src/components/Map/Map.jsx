import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper,Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import  Rating  from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from './mapStyles';

export default function Map({setCoordinates, setBounds,coordinates, places, setchildClicked,weatherData}) {

    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    // console.log(weatherData);





    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
                onChange={(e) => {
                    // console.log(e);
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw:e.marginBounds.sw});

                }}
                onChildClick={(child)=>setchildClicked(child)}

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
                                    <LocationOnOutlinedIcon color="primary" fontSize='large' />
                                ):(
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant='subtitle2' gutterBottom>{place.name}</Typography>
                                        <img className={classes.pointer} src={place.photo ? place.photo.images.large.url:'https://t3.ftcdn.net/jpg/02/21/40/16/240_F_221401603_6urJw6Di9KjlgcPgLfkdVLHtc5Q21aCx.jpg'} alt={place.name} />
                                        <Rating size='small' value={Number(place.rating) }readOnly />


                                    </Paper>
                                )
                            }

                        </div>
                    ))
                }

                {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img
                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                            height={100}
                            alt=""
                        />
                    </div>
                ))}

            </GoogleMapReact>

        </div>
    )
}