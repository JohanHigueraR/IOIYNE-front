import {useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

const theme = createTheme();

export default function Login({log}) {
  localStorage.setItem('validar',false)
  const [login, setLogin] = useState({
    us_email: "",
    us_password: ""
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    log(login)

};
  const handleChange = (e) =>{
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
