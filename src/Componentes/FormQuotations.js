import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Autocomplete,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { ModalQuotation } from "./ModalQuotation";
import { Stack } from "@mui/system";

export default function SpanningTable() {

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

  const [ident, setIdent] = useState(" ");

  const loadIdent = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/quotations/ident`);
    const data = await response.json();
    setIdent(parseInt(data[0].qu_ident) + 1);
  };


  const [requiredProducts, setRequiredProducts] = useState([]);
  const [client, setClient] = useState({
    label: "",
    email: "",
    dirección: "",
  });

  const handleChangeClients = (event, newValue) => {
    if (newValue !== null) {
      setClient(newValue);
    }
  };

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

  const [subTotal, setSubTotal] = useState("");
  const [total, setTotal] = useState("");
  const [descuento, setDescuento] = useState("");
  const [tipoDescuento, setTipoDescuento] = useState("Tipo de descuento");

  const handleChangeType = (event) => {
    setTipoDescuento(event.target.value);
  };
  const handleChangeValue = (event) => {
    setDescuento(event.target.value);
  };

  const totals = () => {
    setSubTotal(
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

  useEffect(() => {
    totals();
  }, [requiredProducts, descuento]);

  useEffect(() => {
    loadClients();
    loadIdent();
  }, []);



  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}>
        <Typography className="titulos" sx={{ marginTop: '3rem' }}>Crear cotización</Typography>
        <Typography sx={{ marginTop: '4rem', color: "#C7E2FF", fontSize: '1.5rem' }}>{"Ref" + " " + ident}</Typography>
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
                {client.label === "" ?
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
                {client.label !== "" ?
                  <ModalQuotation disabledident={ident}
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
                <TableCell align="center">{requiredProduct.precio}</TableCell>
                <TableCell align="center">
                  {requiredProduct.precio * requiredProduct.cantidad}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="center">{subTotal}</TableCell>
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
                ></TextField>:<></>}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="center">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}>

        <Button variant="contained" sx={{ marginTop: '10px' }}>Crear</Button>
      </Stack>
    </>
  );
}
