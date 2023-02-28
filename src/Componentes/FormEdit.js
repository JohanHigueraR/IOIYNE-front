import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Stack } from "@mui/system";

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

export default function FormEdit({ titulo, inputs, selects = false }) {

  const location = useLocation();
  const params = useParams();
  const [ruta, setRuta] = useState(null);
  const [initialValues, setInitalValues] = useState("");
  const navigate = useNavigate();

  const peticion = async () => {
    if (location.pathname === "/editarproducto/" + params.id) {
      setRuta("productos");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/products`
      );
      const data = await response.json();
      data.map(
        (dato, index) =>
          dato.product_id.toString() === params.id.toString() &&
          setInitalValues(dato)
      );
    } else if (location.pathname === "/editarusuario/" + params.id) {
      setRuta("usuarios");
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users`);
      const data = await response.json();
      data.map(
        (dato, index) =>
          dato.user_id.toString() === params.id.toString() &&
          setInitalValues(dato)
      );
    } else if (location.pathname === "/editarcliente/" + params.id) {
      setRuta("clientes");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/clients`
      );
      const data = await response.json();
      data.map(
        (dato, index) =>
          dato.client_id.toString() === params.id.toString() &&
          setInitalValues(dato)
      );
    }
  };

  useEffect(() => {
    peticion();
  }, []);

  return (

    <Container
      component="main"
      maxWidth="xs"
      className="contenedorFormulario"
    >
      {initialValues !== "" ? (
        <>
          <Typography className="tituloFormulario">{titulo}</Typography>

          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validateOnChange={false}

            validate={(valores) => {
              const errors = {};

              inputs.forEach((input) => {

                if (!valores[input.value]) {
                  errors[input.value] = `El campo ${input.label} es requerido`;

                } else if (input.type === "password" && valores[input.value].length < 8) {
                  errors[input.value] = `El campo ${input.label} debe contener al menos 8 caracteres`;

                } else if (input.type === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  valores[input.value])
                ) {
                  errors[input.value] = `El campo ${input.label} no es válido`;

                } else if (input.type === "number" && valores[input.value] < 0) {
                  errors[input.value] = `El campo ${input.label} debe ser mayor que 0`;

                } else if (input.type === "text" && input.label !== "Dirección" && !/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]+$/i.test(
                  valores[input.value])
                ) {
                  errors[input.value] = `El campo ${input.label} no puede contener números ni caracteres especiales`;

                } else if (input.label === "Dirección" && !/^[a-zA-Z0-9\s\-\,\.\#]+$/i.test(
                  valores[input.value])
                ) {
                  errors[input.value] = `El campo ${input.label} no es valido`;
                }
              });
              return errors;
            }}

            onSubmit={async (valores) => {
              if (ruta === "productos") {
                await fetch(
                  `${process.env.REACT_APP_SERVER_URL}/products/${params.id}`,
                  {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: { "Content-type": "application/json" },
                  }
                );
                navigate("/" + ruta);
              } else if (ruta === "clientes") {
                await fetch(
                  `${process.env.REACT_APP_SERVER_URL}/clients/${params.id}`,
                  {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: { "Content-type": "application/json" },
                  }
                );
                navigate("/" + ruta);
              } else if (ruta === "usuarios") {
                await fetch(
                  `${process.env.REACT_APP_SERVER_URL}/users/${params.id}`,
                  {
                    method: "PUT",
                    body: JSON.stringify(valores),
                    headers: { "Content-type": "application/json" },
                  }
                );

                navigate("/" + ruta);
              }
            }}
          >
            {({ handleSubmit, values, errors, touched, handleChange, handleBlur }) => (
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
                    {inputs.map((input, index) => (
                      <CssTextField
                        key={index}
                        fullWidth
                        label={input.label}
                        margin="normal"
                        className="textField"
                        type={input.type}
                        name={input.value}
                        focused
                        defaultValue={
                          input.type !== "file" ? values[input.value] : ""
                        }
                        onChange={handleChange}
                        inputProps={{ maxLength: 30 }}
                        helperText={touched[input.value] ? errors[input.value] : ""}
                        onBlur={handleBlur}
                      ></CssTextField>
                    ))}

                    {selects === false ? (
                      <></>
                    ) : (
                      <select
                        className="Select"
                        name="us_admin"
                        onChange={handleChange}
                        required
                      >
                        <option selected disabled>
                          Seleccione una opción
                        </option>
                        {selects.map((select, index) => (
                          <option key={index}>{select}</option>
                        ))}
                      </select>
                    )}

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
        </>
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}

        >
          <CircularProgress sx={{ color: 'white' }}></CircularProgress>
        </Stack>
      )}
    </Container>

  );
}
