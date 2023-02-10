import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Autocomplete, TextField } from "@mui/material";
import { Stack } from "@mui/system";

// Estilos del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#080215",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
  color: "white"
};


export function ModalQuotation({ handleSubmitProducts, ident }) {

  // Cargar y setear productos para autocomplete
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products`
    );
    const data = await response.json();
    setProducts(
      data.map(({ product_id, pd_name, pd_description, pd_price }) => {
        return {
          product_id,
          label: pd_name,
          pd_name,
          pd_description,
          pd_price,
        };
      })
    );
  };


  // Capturar cambios de los campos del formulario de producto y cantidad
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1000");

  const handleChangeProducts = (e, newValue) => {
    if (newValue !== null) {
      setProduct(newValue);
    }
  };

  const handleChangeQuantity = (e) => {
    if (e.target.value !== null) {
      setQuantity(e.target.value);
    }
  };


  // Campos necesarios para el majeo del modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // Crear productos con su respectiva cantidad en la db
  const addReqProduct = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/requestedproduct`, {
      method: "POST",
      body: JSON.stringify(
        {
          "product_id": product.product_id,
          "qu_ident": ident,
          "quantity": parseInt(quantity)
        }
      ),
      headers: { "Content-type": "application/json" },
    });
  }


  // Cargar productos al desplegar el modal
  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        <AddShoppingCartIcon></AddShoppingCartIcon>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccionar Productos
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={products}
              value={product}
              sx={{ width: 300 }}
              onChange={handleChangeProducts}
              className="inputQuotModal"
              renderInput={(params) => <TextField  {...params} label="Producto" focused />}
            />
            <TextField
              label="Cantidad"
              type="number"
              variant="outlined"
              onChange={handleChangeQuantity}
              className="inputQuotModal"
              focused
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addReqProduct()
                handleSubmitProducts(product.pd_name, product.pd_description, quantity, product.pd_price);
                handleClose();
              }}
              type="submit"
            >
              Agregar producto
            </Button>
          </Stack>
        </Box>
      </Modal>

    </div >
  );
}
