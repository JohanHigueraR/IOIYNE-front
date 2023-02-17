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
        <CardContent>
          <Typography color="text.primary" variant="h6" gutterBottom>
            {titulo}
          </Typography>
          <Typography variant="h6" component="div">
            ${precio}
          </Typography>
          <Typography sx={{ mb: 4.5 }} color="text.secondary">
            {descripción}
          </Typography>
        </CardContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
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
