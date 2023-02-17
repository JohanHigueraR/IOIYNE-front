import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

export default function ImgMediaCard({ titulo, precio, descripción, id }) {
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ minWidth: 275, background: "#C7E2FF" }}>
        <CardContent sx={{ paddingBottom: "0" }}>
          <Typography color="text.primary" variant="h4" gutterBottom>
            {titulo}
          </Typography>
          <Typography variant="h6" component="div">
            $ {precio}
          </Typography>
          <Typography sx={{ padding: "0" }} color="text.secondary">
            {descripción}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"

        >
          <CardActions>
            <Button
              size="small"
              variant="contained"
              onClick={() => navigate("/editarproducto/" + id)}
            >
              Editar
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </>
  );
}
