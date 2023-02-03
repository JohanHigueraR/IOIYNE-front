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
  Button,
  Container,
  Menu,
  MenuItem,
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
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = React.useState();
  const [contextMenu, setContextMenu] = React.useState(null);
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
    console.log(clients);
  };
  useEffect(() => {
    loadClients();
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const EditarCliente = () => {
    navigate("/editarcliente");
    handleClose();
  };
  return (
    <Container sx={{ marginTop: "5rem" }}>
      <Typography className="titulos">Lista de clientes</Typography>
      <Button variant="contained" onClick={() => navigate("/crearcliente")}>
        Crear Cliente
      </Button>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={clients}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
          className="DataTable"
          components={{ Toolbar: CustomToolbar, Pagination: CustomPagination }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          componentsProps={{
            row: {
              onContextMenu: handleContextMenu,
              style: { cursor: "context-menu" },
            },
          }}
        />
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
          componentsProps={{
            root: {
              onContextMenu: (e) => {
                e.preventDefault();
                handleClose();
              },
            },
          }}
        >
          <MenuItem onClick={EditarCliente}>Editar Cliente</MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}
