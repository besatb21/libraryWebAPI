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

export function TableList(props) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');

  const navigate = useNavigate();

  const fetchProducts = async () => {
     await axios
      .get(props.URL)
      .then((response)=>{
      setItems(response.data);
      })
      .catch((err) => console.log(err));

    
  };


  const itemsData = useMemo(() => [...items], [items]);

  const itemsColumns = useMemo(
    () =>
      items[0]
        ? Object.keys(items[0])
          .filter((key) => (key !== "id" && key !== "createdAt" && key !== "createdBy"))
          .map((key) => {
            // if (key === "image")
            //   return {
            //     Header: key,
            //     accessor: key,
            //     Cell: ({ value }) => <img alt=' ' src={value} width="100" />,
            //   };

            return key;
          })
        : [],
    [items]
  );

  function onEdit() {
    navigate(props.navigate);
  }

  const onDelete = (event) => {
    setOpen(true);
    setItemToBeDeleted(event);
  }

  const handleClose = async (event) => {
    if (event) {
      //call axios delete 
      let deleteEndpoint = props.URL + '/' + itemToBeDeleted.id;
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
                <TableCell>{colHeader}</TableCell>
              ))}
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemsData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {itemsColumns.map((col) => (
                  <TableCell>
                    {row[col]}
                  </TableCell>
                ))}
                <TableCell key="edit">
                  <Button size="small" variant="text" onClick={() => { onEdit(row) }}>
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