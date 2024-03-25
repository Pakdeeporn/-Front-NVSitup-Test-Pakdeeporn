import React, { useEffect, useState } from "react";
import { DemoService } from "../services";
import {
  makeStyles,
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Input,
  Paper,
  IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/AddOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  },
  th:{
    fontWeight: "bold",
    width: '12%'
  }
}));

const CustomTableCell = ({ row, name, index, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode && name !== 'user_id' && name !== 'password'? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row, index)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

const DemoScreen = () => { 

  const [token, setToken] = useState('');
  const [dataHead, setDataHead] = useState([]);
  const [dataBody, setDataBody] = useState([]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  useEffect(() => {
    login();
    if(token !== '')
      getDataTable();
  }, [token]);
  
  const onToggleEditMode = async (index, id, confirm_flag) => {
    if(confirm_flag == 'Y'){
    if(!id)
    {
       //Create
       try {
          let obj = dataBody[index];
          obj.password = "098764321";
        await DemoService.CreateUser(token, obj).then((response) => {
          if(response.result.is_Success){
            getDataTable();
          }
        });
      } catch (e) {
        
      }
    }
    else{
      //Update
      try {
        let obj = dataBody.filter((element) => element.user_id === id)[0];
                await DemoService.UpdateUser(token, obj).then((response) => {
                  if(response.result.is_Success){
                    getDataTable();
                  }
                });
              } catch (e) {
                
              }
    }
  }else{

 setDataBody(state => {
      return dataBody.map(row => {
        if (row.user_id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  }
   
    
  };

  const onChange = (e, row, index) => {
    const value = e.target.value;
    const name = e.target.name;
    if (!previous[row.user_id]) {
      setPrevious(state => ({ ...state, [name]: value }));
    }
    
    const newRows = dataBody.map(data => {
      if (row.user_id === data.user_id) {
        return { ...data, [name]: value };
      }
      return data;
    });
    setDataBody(newRows);
  };

  const onRevert = (index, id) => {
    const newRows = dataBody.map(row => {
      if (row.user_id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setDataBody(state => ({...state, data: newRows}));
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(index, id, 'N');
  };

  const login = async () => {
    try {
        await DemoService.login("Eric@gmail.com", "123456789").then((response) => {
            setToken(`Bearer ${response.token}`);
        });
      } catch (e) {
        
      }
  }

  const getDataTable = async () => {
    try {
        await DemoService.getDataTable(token).then((response) => {
          setDataHead(response.column);
          setDataBody(state => {
            let arr = response.data.map((data, i) => {
              return {...data,  isEditMode: false};
            });
            return arr;
          });
          
        });
      } catch (e) {
        
      }
  }

  const onAdd = () => {
    let item = {
      user_id: "",
      name: "",
      gender: "",
      email: "",
      birth_of_date: "",
      isEditMode: true
    };
    setDataBody([...dataBody, item]);
  }

  const onDelete = async (index, id) => {

    if(id === "")
    {
      //Remove local
      setDataBody(() => {
        return [
          ...dataBody.slice(0, index),
          ...dataBody.slice(index + 1),
        ]
      } );

    }
    else{
      //Remove db
      try {
                const response = await DemoService.DeleteUser(token, id);
                if(response.result.is_Success){
                  getDataTable();
                }
              } catch (e) {
                
              }
    }

  }

    return(
      <Paper className={classes.root}>
        <IconButton aria-label="add" onClick={() => onAdd()}>
          <AddIcon />
        </IconButton>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
          <TableCell align="left" className={classes.th} style={{ width: '6%' }}>Edit</TableCell>
          <TableCell align="left" className={classes.th} style={{ width: '6%' }}>Delete</TableCell>
            {dataHead && dataHead.map(col => (
              <TableCell className={classes.th} key={col.key} align="left">{col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataBody && dataBody.map((row, i) => (
            <TableRow key={row.user_id}>
              <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(i, row.user_id, 'Y')}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(i, row.user_id)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="edit"
                    onClick={() => onToggleEditMode(i, row.user_id, 'N')}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell><IconButton
                    aria-label="delete"
                    onClick={(e) => onDelete(i, row.user_id)}
                  >
                    <DeleteIcon />
                  </IconButton></TableCell>
              <CustomTableCell {...{ row, name: "user_id", index: i, onChange }} />
              <CustomTableCell {...{ row, name: "name", index: i, onChange }} />
              <CustomTableCell {...{ row, name: "gender", index: i, onChange }} />
              <CustomTableCell {...{ row, name: "email", index: i , onChange}} />
              <CustomTableCell {...{ row, name: "password", index: i, onChange }} />
              <CustomTableCell {...{ row, name: "date_of_birth", index: i, onChange }} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

    );

}

export default DemoScreen;