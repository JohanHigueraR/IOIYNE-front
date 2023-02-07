import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";

export default function InsetList() {
  
  

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`);
    const data = await response.json();

    setUsers(data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography marginTop={"60px"} className="titulos">
        Lista de usuarios
      </Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={() => navigate("/crearusuario")}
      >
        Crear Usuario
      </Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 760,
          bgcolor: "#1976d2",
          color: "white",
          border: "solid 1px black",
          padding: "0",
        }}
        aria-label="contacts"
      >
        {users.map((user, index) => (
          <ListItem disablePadding key={index} onClick={()=>navigate("/editarusuario/"+user.user_id)} sx={{ borderBottom: "inset 1px black" }}>
            <ListItemButton>
              <ListItemIcon>
                {user.us_admin===true?<StarIcon color="warning" />:<></>}
              </ListItemIcon>
              <ListItemText
                primary={user.us_name +' '+  user.us_lastname}
                secondary={user.us_admin===true?'Administrador':'Gestor'}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
