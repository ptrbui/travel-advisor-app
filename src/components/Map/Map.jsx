import React, { useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'; // Import GoogleMapReact
import { Typography, Paper, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
import mapStyles from './mapStyles';

export default function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked, showHeatMap }) {
    const mapRef = useRef();
    const heatmapRef = useRef(null);
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        console.log('Updating heatmap');
        if (showHeatMap && window.google && window.google.maps.visualization) {
            if (!heatmapRef.current) {
                heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
                    data: places.map(place => new window.google.maps.LatLng(parseFloat(place.latitude), parseFloat(place.longitude))),
                    map: mapRef.current.getMap(),
                    radius: 20
                });
            } else {
                heatmapRef.current.setData(places.map(place => new window.google.maps.LatLng(parseFloat(place.latitude), parseFloat(place.longitude))));
            }
        } else {
            if (heatmapRef.current) {
                heatmapRef.current.setMap(null);
            }
        }
    }, [places, showHeatMap]);

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDa9HXRx_BTI7kuIUEYuWHFczMkno4EHCY' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => setChildClicked(child)}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
            >
                {!showHeatMap && places?.map((place, i) => (
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}>
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize='large' />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>{place.name}</Typography>
                                    <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://t3.ftcdn.net/jpg/02/21/40/16/240_F_221401603_6urJw6Di9KjlgcPgLfkdVLHtc5Q21aCx.jpg'} alt={place.name} />
                                    <Rating size='small' value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    )
}
