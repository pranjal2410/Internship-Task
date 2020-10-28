import React, {useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {MatchContext} from "../../context/MatchContext";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import {TeamContext} from "../../context/TeamContext";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2),
    },
    table: {
        margin: 'auto',
        maxWidth: '75%',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
}));


export default function MatchRecord () {
    const {data} = useContext(MatchContext);
    const {setTeamData} = useContext(TeamContext)
    const classes = useStyles();
    const history = useHistory();

    const navToTeam = (id) => {
        axios({
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            url: `http://localhost:5000/api/get-team/${id}/`
        }).then(response => {
            setTeamData(response.data)
            history.push('/team-record')
        })
    }

    return (
        <div className={classes.root}>
            <h1>Record of <Link onClick={() => navToTeam(data.home_team_id)} style={{ color: 'white'}}>{data.home_team}</Link>
                 vs <Link onClick={() => navToTeam(data.away_team_id)} style={{ color: 'white'}}>{data.away_team}</Link>! Click on the team name whose record you would like to see</h1>
            <div className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Parameters</TableCell>
                            <TableCell>Recorded Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Match</TableCell>
                            <TableCell>{data.match}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Winner</TableCell>
                            <TableCell>{data.winner}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Man of the match</TableCell>
                            <TableCell>{data.man_of_the_match}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Score of {data.home_team}</TableCell>
                            <TableCell>{data.score_of_home_team}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Score of {data.away_team}</TableCell>
                            <TableCell>{data.score_of_away_team}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Wickets lost by {data.home_team}</TableCell>
                            <TableCell>{data.wickets_of_home_team}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Wickets lost by {data.away_team}</TableCell>
                            <TableCell>{data.wickets_of_away_team}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>6's hit by {data.home_team}</TableCell>
                            <TableCell>{data.num_of_six_home}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>6's hit by {data.away_team}</TableCell>
                            <TableCell>{data.num_of_six_away}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>4's hit by {data.home_team}</TableCell>
                            <TableCell>{data.num_of_four_home}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>4's hit by {data.away_team}</TableCell>
                            <TableCell>{data.num_of_four_away}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}