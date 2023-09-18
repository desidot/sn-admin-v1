import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Agent.css";
import { APIBASE, IMAGEURL } from "../../../auth/apiConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Pagination,
  Checkbox,
  Button,
  IconButton,
  Menu,
  FormControlLabel,
  styled,
  Switch,
} from "@mui/material";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { toast } from "react-toastify";
const Agents = () => {
  const [allEmp, setAllEmp] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const getAllEmp = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${APIBASE}admin/agents`);
      setAllEmp(res.data.data);
      setIsLoading(false);
      setTotalItems(res.data.data.length);
    } catch (error) {
      setIsLoading(false);
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event, srNo) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelectedRows) => {
      if (isChecked) {
        return [...prevSelectedRows, srNo];
      } else {
        return prevSelectedRows.filter((row) => row !== srNo);
      }
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredRows.map((row) => row.srNo));
    } else {
      setSelectedRows([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const filteredRows = allEmp.filter((row) => {
    const nameMatch = row.name.toLowerCase().includes(searchText.toLowerCase());

    return nameMatch;
  });

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };

  const handleDeleteClick = async (id) => {
    handleMenuClose();
    try {
      await axios.delete(`${APIBASE}admin/agents/${id}`);
      toast.success("Agent deleted successfully.");
      getAllEmp();
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleEmpStatusChange = async (e, row) => {
    const payload = {
      status: e.target.checked ? 1 : 0,
    };
    try {
      await axios.put(`${APIBASE}admin/update-agent-status/${row.id}`, payload);
      toast.success("Status got updated successfully.");
      getAllEmp();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>People - List of Agents</h6>
        </div>

        <button
          className="back-button"
          onClick={handleGoBack}
          style={{ background: "#EEF2F6", fontWeight: "500" }}
        >
          <span className="back-arrow" style={{ fontWeight: "500" }}>
            &larr;
          </span>{" "}
          Back
        </button>
      </div>
      <br />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Agent List</h3>
          <div className="copy-button">
            <Link to="/admin/people/add-agent">
              <Button variant="contained">Add New Agent</Button>
            </Link>
          </div>
        </div>
        <div className="main-body2">
          {/* Search and Nos */}
          <div className="searchAndNosBlogs">
            <div className="nos">Total:- {totalItems}</div>
            <div className="search-inventory">
              <div className="search-in-table">
                <OutlinedInput
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                  value={searchText}
                  onChange={handleSearchChange}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="start">Search...</InputAdornment>
                  }
                />
              </div>
            </div>
          </div>
          {/* Search and Nos END */}

          {/* Table */}
          <TableContainer
            component={Paper}
            style={{ boxShadow: "gray" }}
            id="tableContainer"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    <Checkbox
                      checked={selectedRows.length === displayedRows.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Code
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>

                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Change Status
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody align="left">
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  displayedRows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">
                        <Checkbox
                          checked={selectedRows.includes(row.srNo)}
                          onChange={(event) =>
                            handleCheckboxChange(event, row.srNo)
                          }
                        />
                      </TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              sx={{ m: 1 }}
                              checked={row.status === 1}
                              onChange={(e) => handleEmpStatusChange(e, row)}
                            />
                          }
                        />
                      </TableCell>
                      <TableCell align="left">
                        <span className="status-active">
                          {row.status == 1 ? "Active" : "Inactive"}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, row.id)}
                          size="small"
                        >
                          <MoreVertOutlined />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={openMenuId === row.id}
                          onClose={handleMenuClose}
                          PaperProps={{
                            style: {
                              maxHeight: 120,
                            },
                          }}
                        >
                          <MenuItem onClick={handleMenuClose}>
                            <Link to={`/admin/People/edit-agent/${row.id}`}>
                              <EditOutlined sx={{ marginRight: 1 }} />
                              Edit
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={() => handleDeleteClick(row.id)}>
                            <DeleteOutlined sx={{ marginRight: 1 }} />
                            Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              className="pagination-style"
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "right",
              }}
            />
          </div>
          {/* Pagination END */}
        </div>
      </div>
    </>
  );
};

export default Agents;
