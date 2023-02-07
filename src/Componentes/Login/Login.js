import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Alert } from "@mui/material";

// Estilos para el css text field
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#C7E2FF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#C7E2FF",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#C7E2FF",
    },
    "&:hover fieldset": {
      borderColor: "#C7E2FF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C7E2FF",
    },
  },
});

// Logo
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https:/">
        IOYNE
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// tema
const theme = createTheme();

// Creacion de componente login: La funcion validateLogin viene como prop desde app.js
export default function Login({ getSubmitLogin, loginStateAux }) {
  console.log(loginStateAux)
  localStorage.setItem('loginState', 'false')
  const [typedLogin, setLogin] = useState({
    us_email: "",
    us_password: "",
  });
  // Captura los valores tipeados en el campo de usuario y contraseña
  const handleChange = (e) => {
    setLogin({ ...typedLogin, [e.target.name]: e.target.value });
  };
  // Al presionar iniciar sesion, ejecuta la funcion definidia en app.js que llega al componente
  // del login por props, pasandole los datos tipeados por el usuario
  const handleSubmit = (event) => {
    event.preventDefault();
    getSubmitLogin(typedLogin);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {loginStateAux === "contraseña incorrecta"|| loginStateAux === "cuenta bloqueada por dos horas"? (
          <Alert
            severity="error"
            sx={{
              background: "#1d1d1d",
              color: "#C7E2FF",
              marginTop: "2rem",
              fontSize: "1rem",
            }}
          >
            {loginStateAux}
          </Alert>
        ) : (
        <></>
        )}

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img src="./logo2.png" alt="" />
          </div>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <CssTextField
              fullWidth
              label="Usuario"
              margin="normal"
              className="textField"
              onChange={handleChange}
              name="us_email"
            ></CssTextField>

            <CssTextField
              fullWidth
              label="Contraseña"
              margin="normal"
              className="textField"
              onChange={handleChange}
              name="us_password"
            ></CssTextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
