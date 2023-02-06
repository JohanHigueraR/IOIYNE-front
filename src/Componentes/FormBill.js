import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";

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
  "& p": {
    color: "red",
  },
});
export default function FormBill({ titulo, inputs, selects = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const auto = [
    {label: 'cliente1'},
    {label: 'cliente2'},
    {label: 'cliente3'},
    {label: 'cliente4'},
    {label: 'cliente5'},
  ]
  
  return (
    <Container component="main" maxWidth="xs" className="contenedorFormulario">
      <Typography className="tituloFormulario">{titulo}</Typography>
      <Formik
        
        onSubmit={async (valores) => {
     
        
        }}
      >
        {({ handleSubmit, values, handleChange }) => (
          <>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={auto}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Formik>
    </Container>
  );
}
