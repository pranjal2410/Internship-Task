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
}))

function createTeams (id, team_name, tour_name) {
    return { id, team_name, tour_name }
}

export default function AddMatch () {
    const classes = useStyles();
    const location = useLocation();
    let i=0;
    const [rows, setRows] = useState([]);
    const [data, setData] = useState({
        home_team: "",
        away_team: "",
        winner: "",
        criteria: "",
        margin: null,
        won_by: null,
        num_of_six_home: null,
        num_of_six_away: null,
        num_of_four_home: null,
        num_of_four_away: null,
        motm: "",
        wickets_home: null,
        wickets_away: null,
        runs_home: null,
        runs_away: null,
        tour_name: "",
    });
    const [tours, setTours] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            url: 'http://localhost:5000/api/get-data/'
        }).then(response => {
            let rows_local = [];
            let tours_local = [];
            // eslint-disable-next-line array-callback-return
            response.data.teams.map(row => {
                rows_local.push(createTeams(row.id, row.team_name, row.tour_name))
            })
            setRows(rows_local)
            // eslint-disable-next-line array-callback-return
            response.data.tournaments.map(row => {
                tours_local.push(row.tour_name)
            })
            setTours(tours_local);
        })
    }, [location])

    const handleChange = (e) => {
        console.log(tours, rows)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        let won_by = data.criteria==="Super Over"?data.criteria:data.margin + ' ' + data.criteria;
        setData({
            ...data,
            won_by: won_by,
        })
        axios({
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'content-type': 'application/json',
            },
            data: data,
            url: 'http://localhost:5000/api/add-match/'
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
            <h1>Add the Match data in a convenient way!</h1>
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
                        <TableRow key={i++}>
                            <TableCell>Home Team</TableCell>
                            <TableCell>
                                <TextField
                                    name="home_team"
                                    id="home_team"
                                    select
                                    label="Select Team"
                                    value={data.home_team}
                                    onChange={handleChange}
                                    helperText="Please select your Team"
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {rows.map((option, i) => (
                                        option.tour_name === data.tour_name ? (
                                        <MenuItem key={i} value={option.team_name}>
                                            {option.team_name}
                                        </MenuItem>) : null
                                    ))}
                                </TextField></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Away Team</TableCell>
                            <TableCell>
                                <TextField
                                    name="away_team"
                                    id="away_team"
                                    select
                                    label="Select Team"
                                    value={data.away_team}
                                    onChange={handleChange}
                                    helperText="Please select your Team"
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    {rows.map((option, i) => (
                                        option.tour_name===data.tour_name?(
                                        <MenuItem key={i} value={option.team_name}>
                                            {option.team_name}
                                        </MenuItem>): null
                                    ))}
                                </TextField></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Winner</TableCell>
                            <TableCell>
                                <TextField
                                    name="winner"
                                    id="winner"
                                    select
                                    label="Select Winner"
                                    value={data.winner}
                                    onChange={handleChange}
                                    helperText="Please select your Winner"
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    <MenuItem key={2000} value={data.home_team}>
                                        {data.home_team}
                                    </MenuItem>
                                    <MenuItem key={2001} value={data.away_team}>
                                        {data.away_team}
                                    </MenuItem>
                                </TextField></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Winning criteria</TableCell>
                            <TableCell>
                                <TextField
                                    name="criteria"
                                    id="criteria"
                                    select
                                    label="Select Criteria"
                                    value={data.criteria}
                                    onChange={handleChange}
                                    helperText="Please select your Criteria"
                                    variant="outlined"
                                    fullWidth
                                    required
                                >
                                    <MenuItem key={3000} value={'Runs'}>
                                        Runs
                                    </MenuItem>
                                    <MenuItem key={3001} value={'Wickets'}>
                                        Wickets
                                    </MenuItem>
                                    <MenuItem key={3002} value={'Super Over'}>
                                        Super Over
                                    </MenuItem>
                                </TextField></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Win Margin</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="margin"
                                    id="margin"
                                    helperText="Please enter win margin"
                                    onChange={handleChange}
                                    value={data.margin}
                                    label="Enter margin"
                                    fullWidth
                                    required
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>6's scored by Home Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="num_of_six_home"
                                    id="num_of_six_home"
                                    helperText="Please enter 6's of Home Team"
                                    onChange={handleChange}
                                    value={data.num_of_six_home}
                                    label="Enter number of 6's"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>6's scored by Away Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="num_of_six_away"
                                    id="num_of_six_away"
                                    helperText="Please enter 6's of Away Team"
                                    onChange={handleChange}
                                    value={data.num_of_six_away}
                                    label="Enter number of 6's"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>4's scored by Home Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="num_of_four_home"
                                    id="num_of_four_home"
                                    helperText="Please enter 4's of Home Team"
                                    onChange={handleChange}
                                    value={data.num_of_four_home}
                                    label="Enter number of 4's"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Tournament</TableCell>
                            <TableCell align="right">
                                <TextField
                                    variant="outlined"
                                    name="num_of_four_away"
                                    id="num_of_four_away"
                                    helperText="Please enter 4's of Away Team"
                                    onChange={handleChange}
                                    value={data.num_of_four_away}
                                    label="Enter number of 4's"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Man of the Match</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="motm"
                                    id="motm"
                                    helperText="Please enter man of the match"
                                    onChange={handleChange}
                                    value={data.motm}
                                    label="Enter man of the match"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Runs score by Home Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="runs_home"
                                    id="runs_home"
                                    helperText="Please enter runs scored by Home Team"
                                    onChange={handleChange}
                                    value={data.runs_home}
                                    label="Enter runs"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Runs scored by Away Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="runs_away"
                                    id="runs_away"
                                    helperText="Please enter runs scored by Away Team"
                                    onChange={handleChange}
                                    value={data.runs_away}
                                    label="Enter runs"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Wickets lost by Home Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="wickets_home"
                                    id="wickets_home"
                                    helperText="Please enter wickets lost by Home Team"
                                    onChange={handleChange}
                                    value={data.wickets_home}
                                    label="Enter wickets"
                                    fullWidth
                                    required
                                /></TableCell>
                        </TableRow>
                        <TableRow key={i++}>
                            <TableCell>Wickets lost by Away Team</TableCell>
                            <TableCell>
                                <TextField
                                    variant="outlined"
                                    name="wickets_away"
                                    id="wickets_away"
                                    helperText="Please enter wickets lost by Away Team"
                                    onChange={handleChange}
                                    value={data.wickets_away}
                                    label="Enter wickets"
                                    fullWidth
                                    required
                                /></TableCell>
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