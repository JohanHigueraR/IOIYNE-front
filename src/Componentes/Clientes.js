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
    field: "Nombre",
    headerName: "Nombre",
    width: 140,
    editable: false,
  },
  {
    field: "Apellido",
    headerName: "Apellido",
    width: 140,
    editable: false,
  },
  {
    field: "fullName",
    headerName: "Nombre Completo",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 220,
    valueGetter: (params) =>
      `${params.row.Nombre || ""} ${params.row.Apellido || ""}`,
  },
  {
    field: "Fecha",
    headerName: "Fecha de registro",
    type: "number",
    width: 150,
    editable: false,
  },
  {
    field: "Numero",
    headerName: "Numero de contacto",
    type: "number",
    width: 160,
    editable: false,
  },
  {
    field: "Correo",
    headerName: "Correo elecronico",
    type: "number",
    width: 200,
    editable: false,
  },
];
const fecha = new Date();

const filas = [
  {
    id: 1,
    Apellido: "Snow camiloooo",
    Nombre: "Jon alvarez",
    Fecha: fecha.toLocaleDateString(),
    Numero: "3202612584",
    Correo: "Snow@gmail.com",
  },
  {
    id: 2,
    Apellido: "Lannister",
    Nombre: "Cersei",
    Fecha: fecha.toLocaleDateString(),
    Numero: "3202612584",
    Correo: "Snow@gmail.com",
  },
  {
    id: 3,
    Apellido: "Lannister",
    Nombre: "Jaime",
    Fecha: fecha.toLocaleDateString(),
    Numero: "3202612584",
    Correo: "Snow@gmail.com",
  },
  {
    id: 4,
    Apellido: "Stark",
    Nombre: "Arya",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 5,
    Apellido: "Targaryen",
    Nombre: "Daenerys",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 6,
    Apellido: "Melisandre",
    Nombre: null,
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 7,
    Apellido: "Clifford",
    Nombre: "Ferrara",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 8,
    Apellido: "Frances",
    Nombre: "Rossini",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 9,
    Apellido: "Roxie",
    Nombre: "Harvey",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 10,
    Apellido: "Roxie",
    Nombre: "Harvey",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 11,
    Apellido: "Roxie",
    Nombre: "Harvey",
    Fecha: fecha.toLocaleDateString(),
  },
  {
    id: 12,
    Apellido: "Roxie",
    Nombre: "Harvey",
    Fecha: fecha.toLocaleDateString(),
  },
];

export default function Clientes() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(filas);
  const [selectedRow, setSelectedRow] = React.useState();

  const [contextMenu, setContextMenu] = React.useState(null);

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
          rows={rows}
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
