import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Divider, Paper, Stack } from "@mui/material";

export default function ImgMediaCard({ titulo, precio, descripción, id }) {
  const navigate = useNavigate();
  return (
      <Paper variant="outlined" className="cardProduct">
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography sx={{color: "#C7E2FF", textTransform: "capitalize", fontSize: '20px', fontWeight: 'bolder'}}>{titulo}</Typography>
          <Typography sx={{color: "#C7E2FF", textTransform: "capitalize", fontSize: '18px', fontWeight: '800'}}>$ {precio}</Typography>
          <Typography sx={{color: "#C7E2FF", marginTop: '10px'}} variant="caption">{descripción}</Typography>
          <Button
            sx={{ position: "relative", top: 95 }}
            onClick={() => navigate("/editarproducto/" + id)}
            variant="contained"
            size="small"
          >
            editar
          </Button>
        </Stack>
      </Paper>  
  );
}
