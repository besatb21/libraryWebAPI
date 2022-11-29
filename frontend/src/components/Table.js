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
import { BOOK_LIST_ADMIN_ROLE, BOOK_LIST_OF_AUTHOR, BOOK_COVER, CATEGORY_LIST_GROUPED } from "../constants";

export function TableList(props) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState('');
  const [catGroup, setCatGroup] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    if (localStorage.getItem('role') == 'Administrator' && props.book) {
      await axios
        .get(BOOK_LIST_ADMIN_ROLE, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
        .then((response) => {
          setItems(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            localStorage.clear();
          }
        });

      await axios.get(CATEGORY_LIST_GROUPED)
        .then((res) => { setCatGroup(res.data) });

    }
    else if (!props.book) {
      await axios
        .get(props.URL, { headers: { 'Authorization': "Bearer " + localStorage.getItem('token') } })
        .then((response) => {
          setItems(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            localStorage.clear();
          }
        });
    }
    else {

      await axios
        .get(BOOK_LIST_OF_AUTHOR + localStorage.getItem("author_id"))
        .then((response) => {
          setItems(response.data);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            localStorage.clear();
          }
        });
    }
  };


  const itemsData = useMemo(() => [...items], [items]);

  const authorColumn = useMemo(() => (props.book && localStorage.getItem('role') == "Administrator") ? items[0] ? Object.keys(items[0].author).map((key) => { return key; }) : [] : [], []);
  const topColumns = useMemo(() => (props.book && localStorage.getItem('role') == "Administrator") ? items[0] ? Object.keys(items[0]).map((key) => { return key; }) : [] : [], [items]);
  const itemsColumns = useMemo(
    () =>
      (props.book && localStorage.getItem('role') == "Administrator") ?
        items[0]
          ? Object.keys(items[0].book)
            .filter((key) => (key !== "id" && key !== "createdAt" && key !== "createdBy" && key !== "imageUrl"))
            .map((key) => {
              return key;
            })
          : [] : []

  );

  const authorRoleCols = useMemo(
    () =>

      items[0]
        ? Object.keys(items[0])
          .filter((key) => ( key !== "createdAt" && key !== "createdBy" && key !== "books"&&key!=='bookCategories'  && key !== "authorId"))
          .map((key) => {
            return key;
          })
        : [],
    [items]
  );


  function getGroupCategories(book_id) {
    var tempString = '';
    catGroup.forEach(e => {
      if (e.id == book_id) {
        tempString += e.categories.map(c => { return c.category });
      }

    });

    console.log(book_id);
    console.log(tempString);
    return tempString;
  }

  function onEdit(id) {
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




      <span
        className="navbar-brand mb-0 h1">{props.title}</span>
      <TableContainer  component={Paper}>
        <Table sx={{ minWidth: 400}} aria-label="simple table">
          <TableHead>
            {localStorage.getItem('role') == "Administrator" && props.book && <TableRow>
              {topColumns.map((colHeader) => (
                <TableCell align="center" className="header" colSpan={colHeader == "book" ? itemsColumns.length : 1}>{colHeader.toLocaleUpperCase()}</TableCell>
              ))}
              <TableCell align="center" colSpan={2} className="action_cell">{"Action".toLocaleUpperCase()}</TableCell>

            </TableRow>}
            <TableRow>
              {localStorage.getItem('role') == "Administrator" && props.book &&
                <>
                  {
                    itemsColumns.map((colHeader) => (
                      <TableCell className="book_cell">{colHeader.toLocaleUpperCase()}</TableCell>
                    ))
                  }{
                    <TableCell className="author_cell">{"Author Name".toLocaleUpperCase()}</TableCell>
                  }

                </>
              }

              {
                props.book == false &&
                authorRoleCols.map((colHeader) => (
                  <TableCell className="header" >{colHeader.toLocaleUpperCase()}</TableCell>
                ))
              }
              {
                localStorage.getItem('role') == "Author" &&
                authorRoleCols.map((colHeader) => (
                  <TableCell className="header" >{colHeader.toLocaleUpperCase()}</TableCell>
                ))
              }
              <TableCell className="action_cell" >EDIT</TableCell>
              <TableCell className="action_cell"> {"Delete".toLocaleUpperCase()}</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {itemsData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {

                  localStorage.getItem('role') == "Administrator" && props.book &&
                  <>
                    {
                      itemsColumns.map((col) => (
                        col == 'bookCategories' ?
                          <TableCell className="book_cell">

                            {getGroupCategories(parseInt(row['book'].id))}
                          </TableCell>
                          :
                          <TableCell className="book_cell">{col == 'image' ? < img src={BOOK_COVER + row.book.id}></img> : row['book'][col]}</TableCell>

                      ))
                    }{
                      <TableCell className="author_cell">{row['author']}</TableCell>
                    }
                  </>

                }

                {
                  props.book == false && authorRoleCols.map((col) => (
                    <TableCell >{row[col]}</TableCell>
                  ))
                }
                {
                  localStorage.getItem('role') == "Author" && authorRoleCols.map((col) => (
                    <TableCell >{col == 'image' ? < img src={BOOK_COVER + row.id}></img> : row[col]}</TableCell>
                  ))
                }
                {
                  localStorage.getItem('role') == "Administrator" &&props.book&& <>
                    <TableCell key="edit">
                      <Button size="small" variant="text" onClick={() => { onEdit(row['book'].id) }}>
                        <MdModeEdit size={20} />
                      </Button>
                    </TableCell>
                    <TableCell key="delete">
                      <Button size="small" variant="text" onClick={() => { onDelete(row['book']) }}>
                        <AiFillDelete size={20} />
                      </Button>
                    </TableCell>
                  </>
                }
                  {
                 props.book==false
                  && <>
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
                  </>
                }
                {
                  localStorage.getItem('role') == "Author" && <>
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
                  </>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
