import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Autocomplete, TextField } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export function ModalQuotation({ handleSubmitProducts }) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1000");
  const handleChangeProducts = (e, newValue) => {
    if (newValue !== null) {
      setProduct(newValue);
    }
  };
  const handleChangeQuantity = (e) => {
    if (e.target.value !== null) {
      setQuantity(e.target.value );
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [products, setProducts] = useState([]);
  const loadProducts = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/products`
    );
    const data = await response.json();
    setProducts(
      data.map(({ pd_name, pd_description, pd_price }) => {
        return {
          label: pd_name,
          pd_name,
          pd_description,
          pd_price,
        };
      })
    );
  };
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
            renderInput={(params) => <TextField {...params} label="Producto" />}
          />
          <TextField
            label="Cantidad"
            type="number"
            variant="filled"
            onChange={handleChangeQuantity}
          ></TextField>
          <Button
            variant="contained"
            onClick={() => {
              handleSubmitProducts(product.pd_name, product.pd_description, quantity, product.pd_price);
              handleClose();
            }}
            type="submit"
          >
            Agregar producto
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
