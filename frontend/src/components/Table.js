import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AuthorList from "../pages/author/author-list";



export function TableList(props) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');

  const navigate = useNavigate();

  const fetchProducts = async () => {
    await axios
      .get(props.URL)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => console.log(err));


  };


  const itemsData = useMemo(() => [...items], [items]);

  const itemsColumns = useMemo(
    () =>
      items[0]
        ? Object.keys(items[0])
          .filter((key) => (key !== "id" && key !== "createdAt" && key !== "createdBy" && key!=="imageUrl"))
          .map((key) => {
            return key;
          })
        : [],
    [items]
  );

  function onEdit(id) {
    // console.log(id);
    navigate(props.navigate + id);
  }

  const onDelete = (event) => {
    setOpen(true);
    setItemToBeDeleted(event);
  }

  const handleClose = async (event) => {
    if (event) {
      //call axios delete 
      let deleteEndpoint = props.URL + itemToBeDeleted.id;
      await axios.delete(deleteEndpoint, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }
      )
        .then(() => {
          itemsData.length--;
          console.log("Successful deletion");
        }).catch((err) => { console.log(err); })
    }
    setOpen(false);
  };


  useEffect(() => {

    fetchProducts();

  }, [itemsData.length]);


  return (
    <>
      {

        <>

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Continue with the removal (deletion)?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {JSON.stringify(itemToBeDeleted)}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => { handleClose(false) }}>Disagree</Button>
                <Button onClick={() => handleClose(true)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </>}



      {props.title}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {itemsColumns.map((colHeader) => (
                <TableCell>{colHeader.toLocaleUpperCase()}</TableCell>
              ))}
              <TableCell>EDIT</TableCell>
              <TableCell>{"Delete".toLocaleUpperCase()}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {itemsColumns.map((col) => (
                  <TableCell>
                    {col === "image"  ? <img alt={row[col]} src={"http://localhost:5006/api/Book/images-byte/"+row.id} width="200" /> : row[col]}
                  </TableCell>
                ))}
                <TableCell key="edit">
                  <Button size="small" variant="text" onClick={() => { onEdit(row.id) }}>
                    <MdModeEdit size={20} />
                  </Button>
                </TableCell>
                <TableCell key="delete">
                  <Button size="small" variant="text" onClick={() => { onDelete(row) }}>
                    <AiFillDelete size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}