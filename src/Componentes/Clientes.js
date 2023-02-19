import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarContainer,
  GridToolbarFilterButton,
  useGridApiContext,
  useGridSelector,
  esES,
} from "@mui/x-data-grid";
import {
  Alert,
  Button,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "cl_name",
    headerName: "Nombre",
    width: 140,
    editable: false,
  },
  {
    field: "cl_lastname",
    headerName: "Apellido",
    width: 140,
    editable: false,
  },
  {
    field: "cl_ident",
    headerName: "Identificación",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 220,
  },
  {
    field: "cl_email",
    headerName: "Correo elecronico",
    type: "number",
    width: 200,
    editable: false,
  },
  {
    field: "cl_address",
    headerName: "Dirección",
    type: "number",
    width: 200,
    editable: false,
  },
];

export default function Clientes() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const getClientId = (event) => {
    var id = event.currentTarget.getAttribute("data-id");
    navigate("/editarcliente/" + id)
  }

  const loadClients = async () => {
    setLoading(true)
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/clients`);
    const data = await response.json();
    setLoading(false)

    setClients(
      data.map(
        ({
          client_id,
          cl_name,
          cl_lastname,
          cl_email,
          cl_ident,
          cl_address
        }) => {
          return {
            id: client_id,
            cl_name,
            cl_lastname,
            cl_email,
            cl_ident,
            cl_address,
          };
        }
      )
    );
  };
  useEffect(() => {
    loadClients();
  }, []);

  return (
    <Container sx={{ marginTop: "4.5rem" }}>
      <Typography className="titulos">Lista de clientes</Typography>
      <Alert severity="info" sx={{ background: '#080215', color: '#C7E2FF' }}>Para editar pulse click en el cliente</Alert>
      <Button variant="contained" onClick={() => navigate("/crearcliente")}>
        Crear Cliente
      </Button>
      <Box sx={{ height: 400, width: "100%", marginTop: "15px" }}>
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          className="DataTable"
          components={{ Toolbar: CustomToolbar, Pagination: CustomPagination }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={loading}
          componentsProps={{
            row: {

              onClick: getClientId,
              style: { cursor: "context-menu" },
            },
          }}
        />
      </Box>
    </Container>
  );
}
