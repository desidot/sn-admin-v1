import React, { useState } from "react";
import { Link } from "react-router-dom";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
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
  styled,
  Button,
  IconButton,
  Menu,
  Modal,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  MoreVertOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const RolesPermissions = () => {
  const [allRoles, setAllRoles] = useState([]);
  const [allEmp, setAllEmp] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [usersPerRole, setUsersPerRole] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleViewUsersClick = (userArr) => {
    setUsersPerRole(userArr);
    handleOpen();
  };

  const getAllRoles = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/roles`);
      setAllRoles(res.data.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllEmp = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/admins`);
      setAllEmp(res.data.data);
      setTotalItems(res.data.data.length);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getAllEmp();
  }, []);

  function createData(srNo, name, expdate, Supplier) {
    return { srNo, name, expdate, Supplier };
  }

  const rows = [
    createData(
      1,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
    createData(
      2,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
    createData(
      3,
      "Sample Product Description 180 caps",
      "Jul 13 2023",
      "Product Name Here"
    ),
  ];
  const users = [
    {
      emp_code: "123",
      name: "Rahul",
      login_allowed: "yes",
      status: 1,
      role: "manager",
    },
    {
      emp_code: "76",
      name: "Sanju",
      login_allowed: "no",
      status: 0,
      role: "Director",
    },
    {
      emp_code: "201",
      name: "Pritish",
      login_allowed: "yes",
      status: 1,
      role: "User",
    },
  ];
  const roles = [
    { name: "Administrator", total_user: 5 },
    { name: "Restricted User", total_user: 2 },
    { name: "Users", total_user: 6 },
    { name: "Support", total_user: 4 },
    { name: "Manager", total_user: 7 },
  ];

  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

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

  const handleEmpStatusChange = async (e, row) => {
    const payload = { status: e.target.checked ? 1 : 0 };
    try {
      await axios.post(
        `${APIBASE}admin/update-employee-status/${row.id}?_method=PUT`,
        payload
      );
      toast.success("Status got updated successfully.");
      getAllEmp();
    } catch (err) {
      toast.error("Error!");
    }
  };
  const handleDeleteClick = async (id) => {
    handleMenuClose();
    try {
      await axios.delete(`${APIBASE}admin/admins/${id}`);
      toast.success("Employee deleted successfully.");
      getAllEmp();
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Administrative - Settings - Roles And Permissions
          </h6>
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

      <div>
        <h5
          style={{
            color: "rgba(47, 43, 61, 0.78)",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          Roles{" "}
        </h5>
        <div className="roles-list" style={{ paddingTop: "10px" }}>
          {allRoles?.map((row, index) => (
            <div key={index}>
              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                <span
                  style={{
                    color: "rgba(47, 43, 61, 0.68)",                  
                  }}
                >
                  Total{" "}
                  {
                    displayedRows?.filter(
                      (elem) => elem?.roles[0]?.name === row?.name
                    ).length
                  }{" "}
                  users
                </span>{" "}
                <span
                  style={{
                    color: "#7367F0",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onClick={() =>
                    handleViewUsersClick(
                      displayedRows?.filter(
                        (elem) => elem?.roles[0]?.name === row?.name
                      )
                    )
                  }
                >
                  View
                </span>
              </div>
              <div>
                {" "}
                <h3
                  style={{ color: "rgba(47, 43, 61, 0.78)", fontWeight: "500" }}
                >
                  {row.name}{" "}
                </h3>{" "}
              </div>
              <div>
                {" "}
                <Link
                  to={`/admin/Administrative/Settings/edit-roles/${row.id}`}
                  style={{ color: "rgb(115, 103, 240)", cursor: "pointer" }}
                >
                  Edit Role
                </Link>{" "}
              </div>
            </div>
          ))}
          <div>
            <div>
              {" "}
              <Link
                to="/admin/Administrative/Settings/add-roles"
                style={{ outline: "none", cursor: "pointer" }}
              >
                <button className="add-btn">Add New Role</button>
              </Link>
            </div>
            <div style={{ marginTop: "15px", marginBottom: "15px" }}>
              {" "}
              <span style={{ color: "rgba(47, 43, 61, 0.68)" }}>
                Add role if it doesn't exist.
              </span>
            </div>
          </div>
        </div>

        <div
          className="main-body2"
          style={{ borderRadius: "6px", marginTop: "25px" }}
        >
          {/* Search and Nos */}
          <div
            className="searchAndNosBlogs"
            style={{ backgroundColor: "white" }}
          >
            <h3 className="card-title">Total:- {totalItems}</h3>
            <div className="search-inventory">
              <div className="search-in-table m-3">
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
                    EMP code
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Role
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>
                    Login Allowed
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
                {displayedRows?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">
                      <Checkbox
                        checked={selectedRows.includes(row.srNo)}
                        onChange={(event) =>
                          handleCheckboxChange(event, row.srNo)
                        }
                      />
                    </TableCell>
                    <TableCell align="left">{row.employee_code}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      <span className="user-role">{row.roles[0].name}</span>
                    </TableCell>
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
                          <EditOutlined sx={{ marginRight: 1 }} />
                          <Link
                            to={`/admin/Basic-HR/Employees/edit-employees/${row.id}`}
                          >
                            {" "}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Table End */}

          {/* Pagination */}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid gray",
            borderRadius: "6px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div style={{ backgroundColor: "white" }}>
            {usersPerRole.length > 0 ? (
              usersPerRole?.map((row, index) => (
                <div
                key={index}
                  style={{
                    padding: "5px 10px",
                    borderBottom: "0.5px solid lightgray",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div> {row.name}</div>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "5px 10px",
                  borderBottom: "0.5px solid lightgray",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>No users</div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default RolesPermissions;
