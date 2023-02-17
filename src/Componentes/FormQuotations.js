import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Autocomplete, Button, ButtonGroup, TextField, Typography, } from "@mui/material";
import { ModalQuotation } from "./ModalQuotation";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function FormQuotations({ loginStateAux }) {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const navigate = useNavigate();

  // Cargar y setear datos de clientes desde la db
  const [clients, setClients] = useState([]);


  const loadClients = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/clients`);
    const data = await response.json();
    setClients(
      data.map(
        ({
          client_id,
          cl_name,
          cl_lastname,
          cl_email,
          cl_ident,
          cl_address,
        }) => {
          return {
            client_id,
            label: cl_name + " " + cl_lastname,
            cl_lastname,
            cl_email,
            cl_ident,
            cl_address,
          };
        }
      )
    );
  };


  // Cargar y setear el valor de la ultima cotizacion y sumarle uno para mostrar el proximo valor a ser cargado en la db
  // la ident se debe enviar tambien al formulario de productos ya que se debe asociar cada producto a una referencia de cotizacion.
  const [ident, setIdent] = useState(1);

  const loadIdent = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/quotations/ident`);
    const data = await response.json();
    setIdent(parseInt(data.qu_ident) + 1);

  };


  // Capturar los datos del cliente desde el formulario de cotizacion 
  const [client, setClient] = useState({
    label: "Seleccione un cliente",
    email: "",
    dirección: "",
  });

  const userLogged = JSON.parse(loginStateAux)
  const createQuotation = async () => {

    if (client.label !== "Seleccione un cliente") {

      await fetch(`${process.env.REACT_APP_SERVER_URL}/quotations`, {
        method: "POST",
        body: JSON.stringify(
          {
            "qu_ident": parseInt(ident),
            "user_id": userLogged.user_id,
            "client_id": parseInt(client.client_id)
          }
        ),
        headers: { "Content-type": "application/json" },
      });
    }
  }

  const createFinalQuotation = async () => {

    if (client.label !== "Seleccione un cliente") {

      await fetch(`${process.env.REACT_APP_SERVER_URL}/quotations`, {
        method: "PUT",
        body: JSON.stringify(
          {
            "qu_value": total,
            "qu_ident": parseInt(ident)
          }
        ),
        headers: { "Content-type": "application/json" },
      });
    }

    navigate('/cotizaciones')

  }

  useEffect(() => {
    createQuotation()
  }, [client])


  const handleChangeClients = async (event, newValue) => {
    if (newValue !== null) {
      setClient(newValue);
    }
  };


  // Capturar los productos enviados desde el modal para añadir productos
  const [requiredProducts, setRequiredProducts] = useState([]);


  // Esta funcion se pasa al modal por props
  const handleSubmitProducts = (nombre, descripcion, cantidad, precio) => {
    setRequiredProducts([
      ...requiredProducts,
      {

        nombre: nombre,
        descripcion: descripcion,
        cantidad: cantidad,
        precio: precio,
      },
    ]);
  };


  // Estados necesarios para el calculo de precios de la cotizacion 
  const [subTotal, setSubTotal] = useState("");
  const [total, setTotal] = useState(subTotal);
  const [descuento, setDescuento] = useState(0);
  const [tipoDescuento, setTipoDescuento] = useState("Tipo de descuento");


  // Capturar descuento (tipo y valor)
  const handleChangeType = (event) => {
    setTipoDescuento(event.target.value);
  };
  const handleChangeValue = (event) => {
    setDescuento(event.target.value);
  };


  // Calcular precio unitario por cantidad, descuentos, suntotal y total
  const totals = () => {
    setSubTotal(
      requiredProducts
        .map(({ precio, cantidad }) => precio * cantidad)
        .reduce((sum, i) => sum + i, 0)
    );

    setTotal(
      requiredProducts
        .map(({ precio, cantidad }) => precio * cantidad)
        .reduce((sum, i) => sum + i, 0)
    );

    if (tipoDescuento === "Porcentual") {
      setTotal(subTotal - (subTotal * descuento / 100))
    } else if (tipoDescuento === "Por valor") {
      setTotal(subTotal - descuento)
    }
  };


  // Escuchar los cambios en el componente para renderizar valores de productos y totales
  useEffect(() => {
    totals();
  }, [requiredProducts, descuento]);

  // Traer informacion requerida de la db al cargar el componente
  useEffect(() => {
    loadClients();
    loadIdent();
  }, []);

  const sendEmail = async () => {

    await fetch(`${process.env.REACT_APP_SERVER_URL}/email`, {
      method: "POST",
      body: JSON.stringify(
        {
          "qu_ident": parseInt(ident),
          "us_name": userLogged.us_name,
          "cl_name": client.label,
          "cl_email": client.cl_email,
          "cl_address": client.cl_address,
          "qu_value": total

        }
      ),
      headers: { "Content-type": "application/json" },
    });
  }


  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}>
        <Typography className="titulos" sx={{ marginTop: '3rem' }}>Crear cotización</Typography>
        <Typography sx={{ marginTop: '4rem', color: "#C7E2FF", fontSize: '1.5rem' }}>{"Ref " + ident}</Typography>
      </Stack>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left" colSpan={2}>
                Cliente
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Email
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Dirección
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Añadir productos
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} sx={{ padding: 0 }}>
                {client.label === "Seleccione un cliente" ?
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={client}
                    options={clients}
                    sx={{ width: 300 }}
                    className="Autocomplete"
                    focused
                    renderInput={(params) => (
                      <TextField {...params} label="" variant="filled" />
                    )}
                    onChange={handleChangeClients}
                  /> : client.label}
              </TableCell>
              <TableCell align="center" colSpan={1}>
                {client.cl_email}
              </TableCell>
              <TableCell align="center" colSpan={1}>
                {client.cl_address}
              </TableCell>
              <TableCell align="center" colSpan={1}>
                {client.label !== "Seleccione un cliente" ?
                  <ModalQuotation disabled ident={ident}
                    handleSubmitProducts={handleSubmitProducts}
                  ></ModalQuotation> : <></>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Producto</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio por unidad</TableCell>
              <TableCell align="center">Precio total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requiredProducts.map((requiredProduct, index) => (
              <TableRow key={index}>
                <TableCell>{requiredProduct.nombre}</TableCell>
                <TableCell>{requiredProduct.descripcion}</TableCell>
                <TableCell align="center">{requiredProduct.cantidad}</TableCell>
                <TableCell align="center">$ {requiredProduct.precio}</TableCell>
                <TableCell align="center">
                  $ {requiredProduct.precio * requiredProduct.cantidad}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="center">$ {subTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Descuento</TableCell>
              <TableCell sx={{ padding: "0" }} align="center">
                {requiredProducts.length !== 0 ?
                  <select required onChange={handleChangeType} className="SelectQuotation">
                    <option selected disabled>
                      Tipo de descuento
                    </option>
                    <option>Porcentual</option>
                    <option>Por valor</option>
                  </select> : <></>}
              </TableCell>
              <TableCell sx={{ padding: "0" }} align="center">
                {tipoDescuento !== "Tipo de descuento" ?
                  <TextField
                    sx={{ width: "120px" }}
                    label="Valor"
                    variant="filled"
                    type="number"
                    onChange={handleChangeValue}
                    className="Autocomplete TextField"
                  ></TextField> : <></>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="center">$ {total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}>

        <ButtonGroup sx={{ marginTop: "10px" }} variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => navigate('/cotizaciones')} color='warning'>Cancelar</Button>
          <Button onClick={() => { handleClick(); sendEmail() }} color='success'>Enviar</Button>
          <Button onClick={createFinalQuotation} >Crear</Button>
        </ButtonGroup>
      </Stack>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Correo enviado correctamente!
        </Alert>
      </Snackbar>
    </>
  );
}
