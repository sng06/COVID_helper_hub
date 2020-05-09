import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from 'react-router-dom';

import axios from "axios";
import { Button } from '@material-ui/core';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
        borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
        <TableRow className={classes.root}>
            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>

            <TableCell component="th" scope="row" show="true">
            {row.name}
            </TableCell>

            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="left">{row.firstname}</TableCell>
            <TableCell align="left">{row.lastname}</TableCell>
            <TableCell align="left">{row.location}</TableCell>
            <TableCell align="left">{row.postTitle}</TableCell>

            <TableCell>
                <Link to={"/edit-posting-page"} className={classes.link}> 
                    <EditIcon onClick={handleEdit} /> 
                </Link>                
                <DeleteIcon onClick={handleDelete}/>
            </TableCell>
        </TableRow>

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>    
                <Typography variant="h6" gutterBottom component="div">
                    description
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                    {row.description}
                </Typography>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        email: PropTypes.string,
        location: PropTypes.string,
        postTitle: PropTypes.string.isRequired,
        description: PropTypes.string,
        date: PropTypes.string,
    }).isRequired,
};



function createData(post) {
    // console.log(post)

    var _id = post._id
    var date = post.createdAt.substring(0,10)
    var firstname = post.firstName
    var lastname = post.lastName
    var location = post.location
    var postTitle = post.postTitle
    var description = post.description
    var email = post.email

    return {
        _id, 
        date,
        firstname,
        lastname,
        location,
        postTitle,
        description,
        email
    };
    
    }

function handleEdit() {
    console.log("edit");
}

function handleDelete(id) {

    var uri = 'postings/'+id 

    axios.delete(uri).then(resp => { 
        console.log(resp)
    });

    PostTable2.setState({
        rows: this.state.rows.filter(el => el._id !== id)
    })
    
}


export default class PostTable2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: [ ], 
            userEmail: ""
        }
    }

    createUserPosts(row) {
        if (row.email === this.userEmail) {
            return (
                <Row key={row._id} row={createData(row)}/>
            )
        }
    }

    componentDidMount() {

        console.log("component did mount")

        axios.get('postings/').then(resp => { 
            this.setState({
                rows: resp.data
            });
            // console.log(this.state.rows)
        });

        axios.get('/userdata').then((resp) => {
            this.setState({
                userEmail: resp.email
            })
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {

        return (
            <TableContainer component={Paper}>
            <Table aria-label="post table">
                <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell align="left">date</TableCell>
                    <TableCell align="left">first name</TableCell>
                    <TableCell align="left">last name</TableCell>
                    <TableCell align="left">location</TableCell>
                    <TableCell align="left">title</TableCell>
                    <TableCell align="left">action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.rows.map((row) => (
                    this.createUserPosts(row)                  
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        );

    }
    
}


