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
  ButtonGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ModalQuotation } from "./ModalQuotation";
import { Stack } from "@mui/system";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FormQuotations({ loginStateAux }) {
  const params = useParams();

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
  const [ident, setIdent] = useState("");

  // Capturar los datos del cliente desde el formulario de cotizacion
  const [client, setClient] = useState({
    label: "Seleccione un cliente",
    cl_email: "",
    cl_address: "",
  });

  const getQuotationForEdit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/quotations/edit`,
      {
        method: "PUT",
        body: JSON.stringify({
          qu_ident: params.id,
        }),
        headers: { "Content-type": "application/json" },
      }
    );
    const data = await response.json();
    
    setClient({
      label: data[0].cl_name + " " + data[0].cl_lastname,
      cl_email: data[0].cl_email,
      cl_address: data[0].cl_address,
    });
    setRequiredProducts(
      data.map(({ pd_price, pd_description, pd_name, quantity, product_id }) => {
        return {
          nombre: pd_name,
          descripcion: pd_description,
          cantidad: quantity,
          precio: pd_price,
          id: product_id
        };
      })
    );
  };

  const EditQuotation = async () => {
    if (client.label !== "Seleccione un cliente") {
      await fetch(`${process.env.REACT_APP_SERVER_URL}/quotations`, {
        method: "PUT",
        body: JSON.stringify({
          qu_value: total,
          qu_ident: parseInt(ident),
        }),
        headers: { "Content-type": "application/json" },
      });
    }
  };
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
      setTotal(subTotal - (subTotal * descuento) / 100);
    } else if (tipoDescuento === "Por valor") {
      setTotal((subTotal - descuento).toLocaleString('en-IN'));
    }
  };
  const handleRemoveProduct = async(product) => {
    setRequiredProducts(requiredProducts.filter((item) => item !== product));
    await fetch(`${process.env.REACT_APP_SERVER_URL}/requestedproduct`, {
      method: "DELETE",
      body: JSON.stringify({
        product_id: product.id,
        qu_ident: params.id,
      }),
      headers: { "Content-type": "application/json" },
    });
  }


  // Escuchar los cambios en el componente para renderizar valores de productos y totales
  useEffect(() => {
    totals();
  }, [requiredProducts, descuento]);

  // Traer informacion requerida de la db al cargar el componente
  useEffect(() => {
    loadClients();
    getQuotationForEdit();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}
      >
        <Typography className="titulos" sx={{ marginTop: "3rem" }}>
          Editar cotización
        </Typography>
        <Typography
          sx={{ marginTop: "4rem", color: "#C7E2FF", fontSize: "1.5rem" }}
        >
          {"Ref " + params.id}
        </Typography>
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
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} sx={{ padding: 0 }}>
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
                />
              </TableCell>
              <TableCell align="center" colSpan={1}>
                {client.cl_email}
              </TableCell>
              <TableCell align="center" colSpan={1}>
                {client.cl_address}
              </TableCell>
              <TableCell align="center" colSpan={1}>
                {client.label !== "Seleccione un cliente" ? (
                  <ModalQuotation
                    disabled
                    ident={ident}
                    handleSubmitProducts={handleSubmitProducts}
                  ></ModalQuotation>
                  
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Producto</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Precio por unidad</TableCell>
              <TableCell align="center">Precio total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requiredProducts.map((requiredProduct, index) => (
              <TableRow key={index}>
                <TableCell>{requiredProduct.nombre}</TableCell>
                <TableCell>{requiredProduct.descripcion}</TableCell>
                <TableCell align="center">{requiredProduct.cantidad}</TableCell>
                <TableCell align="center">$ {requiredProduct.precio.toLocaleString()}</TableCell>
                <TableCell align="center">
                  $ {requiredProduct.precio * requiredProduct.cantidad}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    
                    aria-label="delete"
                    size="small"
                    onClick={() => handleRemoveProduct(requiredProduct)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="center">$ {subTotal}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={1}>Descuento</TableCell>
              <TableCell sx={{ padding: "0" }} align="center">
                {requiredProducts.length !== 0 ? (
                  <select
                    required
                    onChange={handleChangeType}
                    className="SelectQuotation"
                  >
                    <option selected disabled>
                      Tipo de descuento
                    </option>
                    <option>Porcentual</option>
                    <option>Por valor</option>
                  </select>
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell sx={{ padding: "0" }} align="center">
                {tipoDescuento !== "Tipo de descuento" ? (
                  <TextField
                    sx={{ width: "120px" }}
                    label="Valor"
                    variant="filled"
                    type="number"
                    onChange={handleChangeValue}
                    className="Autocomplete TextField"
                  ></TextField>
                ) : (
                  <></>
                )}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="center">$ {total}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-start"
        spacing={2}
        sx={{marginTop: '0.8rem'}}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button color="warning">Cancelar</Button>
          <Button>Guardar</Button>
        </ButtonGroup>
      </Stack>
    </>
  );
}
