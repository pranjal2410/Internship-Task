import React, {useContext, useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import {useHistory, useLocation} from "react-router";
import Link from "@material-ui/core/Link";
import {MatchContext} from "../../context/MatchContext";

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

function createData(id, match, winner, margin) {
    return { id, match, winner, margin };
}

export default function AllMatches () {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const location = useLocation();
    const history = useHistory();
    const {setData} = useContext(MatchContext);

    useEffect(() => {
        axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
            url: 'http://localhost:5000/api/get-all-matches/'
        }).then((response) => {
            let rows_local = []
            // eslint-disable-next-line array-callback-return
            response.data.map((row) => {
                rows_local.push(createData(row.id, row.home_team + ' vs ' + row.away_team, row.winner, row.winning_margin))
            })
            setRows(rows_local)
            console.log(rows_local)
        })
    }, [location])

    const navToRecord = (e, i) => {
        console.log(rows[i])
        axios({
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            url: `http://localhost:5000/api/one-match/${rows[i].id}`
        }).then((response) => {
            setData(response.data)
            history.push('/match-record')
        })
    }
    return (
        <div className={classes.root}>
            <h1>Check out all the matches played!</h1>
            <div className={classes.table}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Match</TableCell>
                            <TableCell align="center">Winner</TableCell>
                            <TableCell align="right">Winning Margin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, i) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <Link onClick={() => navToRecord(i)} style={{ textDecoration: 'none', color: 'white'}}>
                                        {row.match}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{row.winner}</TableCell>
                                <TableCell align="right">{row.margin}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}