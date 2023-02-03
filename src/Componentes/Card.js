import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Box, Modal, Stack } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35rem",
  bgcolor: "#C7E2FF",
  border: "2px solid white",
  boxShadow: 24,
  p: 1,
};

export default function ImgMediaCard({
  titulo,
  precio,
  descripción,
  id,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card sx={{ maxWidth: 345, backgroundColor: "#C7E2FF", height: "150px", marginTop: "12px"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {titulo} {precio}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {descripción}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate("/editarproducto/" + id)}
          >
            Editar
          </Button>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Ver detalles
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={2}
          >
            <div>
              <Typography className="textoModal" sx={{ fontWeight: "900" }}>
                ID: <span>{id}</span>
              </Typography>
              <Typography className="textoModal" sx={{ fontWeight: "900" }}>
                Titúlo: <span>{titulo}</span>
              </Typography>
              <Typography className="textoModal" sx={{ fontWeight: "900" }}>
                Descripción: <span>{descripción}</span>
              </Typography>
              <Typography className="textoModal" sx={{ fontWeight: "900" }}>
                Cantidad: <span>{id}</span>
              </Typography>
              <Button variant="contained" sx={{ marginTop: '12rem' }}>Editar</Button>
              <Button variant="contained" color="warning" sx={{ marginTop: '12rem', marginLeft: '2px' }}>Cerrar</Button>
            </div>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
