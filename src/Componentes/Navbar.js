import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from 'react-router-dom'

const adminPages = ['usuarios', 'clientes', 'productos', 'cotizaciones'];
const managerPages =['clientes', 'productos', 'cotizaciones']

// obtener el objeto del loggedUser del local storage

function ResponsiveAppBar({loginState, setLoginAux}) {
  const userLogin = JSON.parse(loginState)
  console.log(userLogin)
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] =useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className='no-print'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            IOYNE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {userLogin.us_admin=== true? adminPages.map((page,index) => (
                <MenuItem key={index} onClick={()=>{handleCloseNavMenu(); navigate("/"+page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )):managerPages.map((page,index) => (
                <MenuItem key={index} onClick={()=>{handleCloseNavMenu(); navigate("/"+page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {userLogin.us_admin=== true? adminPages.map((page, index) => (
                <MenuItem key={index} onClick={()=>{handleCloseNavMenu(); navigate("/"+page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              )):managerPages.map((page, index) => (
                <MenuItem key={index} onClick={()=>{handleCloseNavMenu(); navigate("/"+page)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
           
                <MenuItem  onClick={()=>{navigate("/editarusuariologeado/"+userLogin.user_id)}} > 
                {/* // onClick={()=>console.log(objectLoggedUser.user_id)}> */
                  // Obtener el id del loggedUser desde el objeto obtenido del local storage
                }
                  <Typography textAlign="center">Cuenta</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={() =>{setLoginAux(""); navigate("/"); localStorage.setItem("loginOk", "false")}}>Cerrar Sesión</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
