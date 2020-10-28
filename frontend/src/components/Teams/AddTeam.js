import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
    },
    table: {
        margin: 'auto',
        maxWidth: '50%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    submit: {
        margin: 'auto',
    }
}));


export default function AddTeam () {
    const classes = useStyles();
    const location = useLocation();
    let i=0;
    const [data, setData] = useState({
        team_name: null,
        coach_name: null,
        captain_name: null,
        total_matches_played: null,
        total_matches_won: null,
        points: null,
        tour_name: "",
    });
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json',
            },
            url: 'http://localhost:5000/api/get-data/'
        }).then(response => {
            let tours_local = [];
            // eslint-disable-next-line array-callback-return
            response.data.tournaments.map(row => {
                tours_local.push(row.tour_name)
            });
            setTours(tours_local);
        })
    }, [location]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submitHandler = (e) => {
        axios({
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json',
            },
            data: data,
            url: 'http://localhost:5000/api/add-team/'
        }).then(response => {
            return (
                    window.alert(response.data.message)
            )
        }).catch(error => {
            return (
                window.alert(error.message)
            )
        })
    }

    return (
        <div className={classes.root}>
            <h1>Add the team data in a convenient way!</h1>
            <div className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Parameters</TableCell>
                            <TableCell align="right">Values</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={i++}>
                            <TableCell>Team Name</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="team_name"
                                    id="team_name"
                                    helperText="Please enter Team name"
                                    onChange={handleChange}
                                    value={data.team_name}
                                    label="Enter Team name"
                                    fullWidth
                                    required
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Coach Name</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="coach_name"
                                    id="coach_name"
                                    helperText="Please enter coach's name"
                                    onChange={handleChange}
                                    value={data.coach_name}
                                    label="Enter coach's name"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Captain Name</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="captain_name"
                                    id="captain_name"
                                    helperText="Please enter Captain's name"
                                    onChange={handleChange}
                                    value={data.captain_name}
                                    label="Enter captain's name"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Total Matches Played</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="total_matches_played"
                                    id="total_matches_played"
                                    helperText="Please enter number of matches played"
                                    onChange={handleChange}
                                    value={data.total_matches_played}
                                    label="Enter number of matches played"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Total Matches Won</TableCell>
                            <TableCell align="right">
                                <TextField
                                    variant="outlined"
                                    name="total_matches_won"
                                    id="total_matches_won"
                                    helperText="Please enter number of matches won"
                                    onChange={handleChange}
                                    value={data.total_matches_won}
                                    label="Enter number of matches won"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Points in Tournament</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="points"
                                    id="points"
                                    helperText="Please enter points in tournament"
                                    onChange={handleChange}
                                    value={data.points}
                                    label="Enter points"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Tournament</TableCell>
                            <TableCell>
                                <TextField
                                    name="tour_name"
                                    id="tour_name"
                                    select
                                    label="Select Tournament"
                                    value={data.tour_name}
                                    onChange={handleChange}
                                    helperText="Please select your Tournament"
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {tours.map((option, i) => (
                                        <MenuItem key={i} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <br/>
            <center>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={submitHandler}
                >
                    Submit
                </Button>
            </center>
        </div>
    )
}