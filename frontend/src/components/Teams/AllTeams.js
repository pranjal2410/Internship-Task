import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {useHistory, useLocation} from "react-router";
import {Link} from "react-router-dom";
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

function createData(id, team_name, coach_name, captain_name, total_matches_played, total_matches_won, points) {
    return { id, team_name, coach_name, captain_name, total_matches_played, total_matches_won, points };
}

export default function AllTeams () {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const location = useLocation();
    const {setTeamData} = useContext(TeamContext);
    const history = useHistory();

    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            url: 'http://localhost:5000/api/get-data/'
        }).then((response) => {
            let rows_local = []
            // eslint-disable-next-line array-callback-return
            response.data.teams.map((row) => {
                rows_local.push(createData(row.id, row.team_name, row.coach_name, row.captain_name, row.total_matches_played, row.total_matches_won, row.points))
            })
            setRows(rows_local)
        })
    }, [location])

    const navToTeam = (i) => {
        setTeamData(rows[i])
        history.push('/team-record')
    }

    return (
        <div className={classes.root}>
            <h1>Check out all the registered teams!</h1>
            <div className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Team Name</TableCell>
                            <TableCell align="center">Captain Name</TableCell>
                            <TableCell align="right">Coach Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <Link onClick={() => navToTeam(i)} style={{ color: 'white' }}>
                                        {row.team_name}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{row.captain_name}</TableCell>
                                <TableCell align="right">{row.coach_name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}