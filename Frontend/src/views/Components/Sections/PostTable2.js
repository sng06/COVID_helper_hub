import React from 'react';
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(_id, date, firstname, lastname, location, postTitle, description) {
  return {
    _id, 
    date,
    firstname,
    lastname,
    location,
    postTitle,
    description
  };
}

function handleEdit() {
    console.log("edit");
}

function handleDelete() {
    console.log("delete");
}

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
            <EditIcon onClick={handleEdit}/>
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
                post description
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
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string,
    location: PropTypes.string.isRequired,
    postTitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("id1", "date1", "firstname1", "lastname1", "loacation1", "title1", "desrciptions1"),
  createData("id2", "date2", "firstname2", "lastname2", "loacation2", "title2", "desrciptions2"),
  createData("id3", "date3", "firstname3", "lastname3", "loacation3", "title3", "desrciptions3"),
  createData("id4", "date4", "firstname4", "lastname4", "loacation4", "title4", "desrciptions4"),
  createData("id5", "date5", "firstname5", "lastname5", "loacation5", "title5", "desrciptions5"),
  createData("id6", "date1", "firstname1", "lastname1", "loacation1", "title1", "desrciptions1"),
  createData("id7", "date2", "firstname2", "lastname2", "loacation2", "title2", "desrciptions2"),
  createData("id8", "date3", "firstname3", "lastname3", "loacation3", "title3", "desrciptions3"),
  createData("id9", "date4", "firstname4", "lastname4", "loacation4", "title4",  "desrciptions4"),
  createData("id10", "date5", "firstname5", "lastname5", "loacation5", "title5", "desrciptions5"),
];

export default function PostTable2() {
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
          {rows.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
