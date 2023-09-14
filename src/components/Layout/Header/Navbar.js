import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/shopnmac-logo.png";
import User from "../../../assets/user.jpg";
import { AiOutlineSetting } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import Search from "../Header/Search";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiTodoLine } from "react-icons/ri";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/authSlice";
import Drawer from "@mui/material/Drawer";
import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { APIBASE } from "../../auth/apiConfig";
import { DeleteOutlined } from "@mui/icons-material";
const initialState = { notes: "", added_by: "" };
const Navbar = () => {
  const [todoList, setTodoList] = useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, ["right"]: open });
  };
  const [data, setData] = useState(initialState);
  const [authenticated, setAuthenticated] = useState(true);
  const [allTodos, setAllTodos] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user.data);
  useEffect(() => {
    setData({ ...data, added_by: auth?.name });
  }, [auth]);
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Dispatch the logout action to reset Redux state
    dispatch(logout());

    // Update the authenticated state
    setAuthenticated(false);
  };

  const getAllTodos = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/stickynotes`);
      setAllTodos(res.data.data);
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${APIBASE}admin/remove-sticky-note/${id}`);
      getAllTodos();
      toast.success("Todo deleted successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSaveNotesClick = async () => {
    if (data.notes != "") {
      try {
        await axios.post(`${APIBASE}admin/stickynotes`, data);
        toast.success("Todo added successfully.", { autoClose: 300 });
        getAllTodos();
        setData({...data,notes:""})
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.warn("Type something...", { position: "top-center" });
    }
  }; 
   function getNormalDateAndTime(dateString) {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const normalDate = `${year}-${month}-${day}`;
    const normalTime = `${hours}:${minutes}:${seconds}`;

    return {
      normalDate,
      normalTime,
    };
  }


  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-between align-itmes-center">
      <div className="left-part d-flex align-items-center w-50 position-relative">
        <Link className="navbar-brand" to="#">
          <img src={Logo} alt="shopnmac logo" className="img-fluid" />
        </Link>

        <Search />
      </div>
      <div className="right-part w-50 text-right">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          align-item="center"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon ">
            <ExpandCircleDownOutlinedIcon />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <div
            style={{
              color: "#673AB7",
              textAlign: "end",
              width: "100%",
              fontWeight: "500",
              fontSize: "22px",
            }}
          >
            <Link
              to="/admin/Sales/PoS"
              style={{
                color: "#673AB7",
              }}
            >
              POS
            </Link>
          </div>

          <ul className="navbar-nav ml-auto align-items-center">
            <li className="nav-item dropdown ml-3">
              <Link
                className="nav-link dropdown-toggle text-pruple pruple-bg"
                to="#"
                id="navbarDropdownMenuLink"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <RiTodoLine
                  onClick={toggleDrawer("right", true)}
                  className="icon-size"
                />
              </Link>
              <div
                className="dropdown-menu mt-2"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <p className="p-4">Notifaction design</p>
              </div>
            </li>
            <li className="nav-item dropdown ml-3">
              <Link
                className="nav-link dropdown-toggle text-pruple pruple-bg"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <IoNotificationsOutline className="icon-size" />
              </Link>
              <div
                className="dropdown-menu p-0"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <div className="notification">
                  <h3>
                    All Notification{" "}
                    <span className="badge badge-danger ml-3">02</span>
                  </h3>
                  <hr className="mb-0" />
                  <div className="notification-list">
                    <ul>
                      <li>
                        <div className="multilist-item d-flex justify-content-between align-items-center">
                          <div className="multilist-user">
                            <img
                              src={User}
                              alt="user"
                              className="user-profile"
                            />
                            <span className="multilist-text ml-3">
                              John Doe
                            </span>
                          </div>

                          <div className="">
                            <span className="small-text">2 min ago</span>
                          </div>
                        </div>
                        <p className="small-text ml-5 mt-1">
                          It is a long established fact that a reader will be
                          distracted
                        </p>
                        <div className="ml-5">
                          <span className="badge badge-danger-light">
                            Unread
                          </span>
                          <span className="badge badge-warning-light ml-2">
                            New
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="multilist-item d-flex justify-content-between align-items-center">
                          <div className="multilist-user">
                            <img
                              src={User}
                              alt="user"
                              className="user-profile"
                            />
                            <span className="multilist-text ml-3">
                              John Doe
                            </span>
                          </div>

                          <div className="">
                            <span className="small-text">2 min ago</span>
                          </div>
                        </div>
                        <p className="small-text ml-5 mt-1">
                          It is a long established fact that a reader will be
                          distracted
                        </p>
                        <div className="ml-5">
                          <span className="badge badge-danger-light">
                            Unread
                          </span>
                          <span className="badge badge-warning-light ml-2">
                            New
                          </span>
                        </div>
                      </li>
                    </ul>

                    <div className="viewall text-center d-flex align-items-center justify-content-center">
                      <Link className="ancher-text pt-3">View All</Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {auth.name && (
              <li
                style={{
                  color: "darkgray",
                  padding: "0px 10px",
                  fontWeight: "500",
                }}
              >
                Hello {auth.name.split(" ")[0]}{" "}
              </li>
            )}
            <li className="nav-item dropdown  ">
              <Link
                className="nav-link dropdown-toggle text-skyblue user-bg rounded-26"
                to="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={User} alt="user" className="user-profile mr-3" />{" "}
                <AiOutlineSetting className="icon-size" />
              </Link>
              <div
                className="dropdown-menu mt-2"
                aria-labelledby="navbarDropdownMenuLink"
                id="settings-dropdown"
              >
                <Link className="dropdown-item" to="#">
                  {" "}
                  <AiOutlineSetting className="mr-2" /> Account Setting
                </Link>
                <Link className="dropdown-item" to="#">
                  <BiUser className="mr-2" /> Profile
                </Link>
                <Link
                  className="dropdown-item"
                  to="/admin/"
                  onClick={() => handleLogout()}
                >
                  <IoLogOutOutline className="mr-2" /> Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div
            style={{
              height: "100vh",
              width: "340px",
              backgroundColor: "#ebf1f4",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingLeft: "15px",
                fontSize: "24px",
                fontWeight: "500",
                color: "gray",
                paddingTop: "15px",
              }}
            >
              Todo List
            </div>
            <div
              style={{
                width: "90%",
                margin: "auto",
                height: "88vh",
                backgroundColor: "white",
                borderRadius: "8px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  padding: "8px",
                }}
              >
                <input
                  placeholder="add todo..."
                  style={{
                    outline: "none",
                    border: "0.5px solid rgb(103, 58, 183)",
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "gray",
                    height: "40px",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                  value={data.notes}
                  onChange={(e) => setData({ ...data, notes: e.target.value })}
                />
                <AddCircleIcon
                  style={{
                    fontSize: "42px",
                    cursor: "pointer",
                    color: "rgb(103, 58, 183)",
                  }}
                  onClick={() => handleSaveNotesClick()}
                />
              </div>
              <div style={{ padding: "8px",display:"flex",flexDirection:"column",gap:"8px" }}>
                {" "}
                {allTodos?.map((row, index) => (
                  <div
                    style={{
                      border: "0.5px solid lightgray",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        marginBottom: "6px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "90%" }}>{row.notes}</div>
                      <span style={{ width: "10%" }}>
                        <DeleteOutlined
                          sx={{ marginRight: 1 }}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteTodo(row.id)}
                        />
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        color: "gray",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      <span>{row.added_by}</span>
                      <span>{getNormalDateAndTime(row.created_at).normalTime} | { getNormalDateAndTime(row.created_at).normalDate}</span>{" "}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </nav>
  );
};

export default Navbar;
