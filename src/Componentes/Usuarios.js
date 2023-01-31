import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import {Button, Container, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function InsetList() {
  const navigate =useNavigate()
  return (
    <Container maxWidth="lg">
      <Typography marginTop={'60px'} className="titulos">Lista de usuarios</Typography>
      <Button variant='contained' color='warning' onClick={()=>navigate("/crearusuarios")}>Crear Usuario</Button>
    <List
      sx={{ width: '100%', maxWidth: 760, bgcolor: '#1976d2', color: 'white', border: 'solid 1px black', padding:'0'}}
      aria-label="contacts"
    >
      <ListItem disablePadding sx={{borderBottom: 'inset 1px black'}}>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon color='warning'/>
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" secondary="administrador"/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{borderBottom: 'inset 1px black'}}>
        <ListItemButton>
          <ListItemText inset primary="Eric Hoffman" secondary="gestor" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{borderBottom: 'inset 1px black'}}>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon color='warning'/>
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" secondary="administrador"/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{borderBottom: 'inset 1px black'}}>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon color='warning'/>
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" secondary="administrador"/>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{borderBottom: 'inset 1px black'}}>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon color='warning'/>
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" secondary="administrador"/>
        </ListItemButton>
      </ListItem>
    </List>
    </Container>
  );
}