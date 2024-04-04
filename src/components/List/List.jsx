import React,{useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

export default function List({ places, childClicked, isLoading, type, setType, rating, setRating }) {
    const classes = useStyles();
    const [elRefs,setElRefs] = useState([]);

    useEffect(()=>{
        const refs = Array(places?.length).fill().map((_,i)=>elRefs[i] || createRef());
        setElRefs(refs);
    },[places])

    return (
        <div className={classes.container}>
            <Typography variant='h5' style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                About
            </Typography>

            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <Typography variant='body1' style={{ fontFamily: 'Courier', color: 'gray', fontWeight: 'bold' }}>
                    Here's a neat little app that you can use to look at restaurants, hotels, and attractions nearby.
                    If you don't want to use your current location, just use the search box in the top right corner to explore wherever you'd like!
                    I built this using
                    <a href="https://reactjs.org/" style={{ color: '#FF69B4', textDecoration: 'none' }}> React.js</a>,
                    <a href="https://nodejs.org/" style={{ color: '#FF69B4', textDecoration: 'none' }}> Node.js</a>,
                    <a href="https://cloud.google.com/" style={{ color: '#FF69B4', textDecoration: 'none' }}> Google Cloud Platform</a> (Maps + Places APIs), and
                    <a href="https://material-ui.com/" style={{ color: '#FF69B4', textDecoration: 'none' }}> Material-UI</a>.
                    Enjoy :)
                </Typography>
            </div>

            <Typography variant='h5' style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Restaurants, Hotels & Attractions
            </Typography>

            {isLoading?(
                <div className={classes.loading}>
                    <CircularProgress size="5rem" /></div>
            ):(
                <>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Type</InputLabel>
                        <Select value={type} onChange={(e)=>{setType(e.target.value)}}>
                            <MenuItem value="restaurants">Restaurants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractions</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>

                    <Grid  container spacing={3} className={classes.list}>
                        {places?.map((place,i)=>(
                            <Grid ref={elRefs[i]} item key={i} xs={12}>
                                <PlaceDetails place={place}
                                              selected = {Number(childClicked) === i}
                                              refProp = {elRefs[i]}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </div>
    )
}