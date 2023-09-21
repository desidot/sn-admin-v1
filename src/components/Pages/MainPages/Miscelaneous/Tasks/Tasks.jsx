import React, { useRef } from "react";
import "./Tasks.css";
import Draggable from "react-draggable";
import AdminImage from "../../../../../assets/user.jpg";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllAdmins, getAllTasks } from "../../../../../redux/cartSlice";
import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { APIBASE } from "../../../../auth/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  task_date: "",
  employee_id: "",
  task_name: "",
  task_description: "",
  added_by: "",
};
const Tasks = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user.data);
  const allAdmins = useSelector((state) => state.cart.allAdmins);
  const [state, setState] = useState(initialState);
  // const [employee, setEmployee] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [initTasks, setInitTasks] = useState([]);
  const [proTasks, setProTasks] = useState([]);
  const [reTasks, setReTasks] = useState([]);
  const [comTasks, setComTasks] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const handleTaskToChange = (event) => {
    // console.log("event", event.target.value);
    // eslint-disable-next-line no-unused-expressions
    event.target.value;
  };

  useEffect(() => {}, []);

  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${APIBASE}admin/tasks`);
      setAllTasks(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(getAllAdmins());
    getAllTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    // Go back to the previous page in the history
    window.history.go(-1);
  };
  useEffect(() => {
    setProTasks(allTasks?.filter((elem) => elem.status === "process"));
    setInitTasks(
      allTasks?.filter((elem) => elem.status === null || elem.status === "task")
    );
    setComTasks(allTasks?.filter((elem) => elem.status === "completed"));
    setReTasks(allTasks?.filter((elem) => elem.status === "review"));
  }, [allTasks]);

  const cardRef = useRef(null); // Add a useRef hook to get a reference to the draggable card
  const handleAdminChange = (e) => {
    setState({ ...state, employee_id: e.target.value, added_by: auth.name });
  };
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (
      state.task_name === "" ||
      state.task_description === "" ||
      state.task_date === ""
    ) {
      toast.warn("Fill all credentials.", { position: "top-center" });
    } else {
      setIsLoading(true);
      try {
        await axios.post(`${APIBASE}admin/tasks`, state);
        setIsLoading(false);
        getAllTasks();
        toast.success("Task added successfully.");

        setState(initialState);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    }
  };

  const handleStatusChange = async (e, id) => {
    try {
      await axios.put(`${APIBASE}admin/tasks/${id}`, {
        status: e.target.value,
      });
      getAllTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      
      <div className="mb-3" style={{ display: "flex", justifyContent: "space-between",alignItems:"center" }}>
         
        <div style={{ display: "flex",alignItems:"center" }}>
            <HomeIcon /> - <h6 className="mb-0"> Miscellaneous - Task</h6>
        </div>

        <button
          className="back-button"
          onClick={handleGoBack}
          style={{ background: "#EEF2F6", fontWeight: "500" }}
        >
          <span className="back-arrow" style={{ fontWeight: "500" }}>
            &larr;
          </span>
          Back
        </button>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add New Tasks</h3>
        </div>
        <div className="main-body2">
          <div>
            <div className="tasks-main-container">
              <div className="task-inputs mb-3">
                {/* ... */}

                <input
                  type="date"
                  value={state.task_date}
                  onChange={(e) =>
                    setState({ ...state, task_date: e.target.value })
                  }
                  className="task-date"
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    className="task-select"
                    value={state.employee_id}
                    onChange={(e) => handleAdminChange(e)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">Select Employee</MenuItem>
                    {allAdmins?.map((elem, index) => (
                      <MenuItem value={elem.id} key={index}>{elem.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={allAdmins?.map((option) => option.name)}
                  onInputChange={(e, newValue) =>
                    handleAdminChange(e, newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                  sx={{ width: "200px" }}
                /> */}

                <input
                  type="text"
                  placeholder="Task Name"
                  className="task-name"
                  value={state.task_name}
                  onChange={(e) =>
                    setState({ ...state, task_name: e.target.value })
                  }
                />

                <input
                  type="text"
                  id="taskDescription"
                  className="task-description"
                  placeholder="Task Description"
                  value={state.task_description}
                  onChange={(e) =>
                    setState({ ...state, task_description: e.target.value })
                  }
                />

                <button
                  className="task-submit"
                  onClick={(e) => handleAddTask(e)}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding" : "Add Task"}
                </button>

                {/* sm={4} md={6} */}
              </div>

              <div className="task-list">
                <div>
                  <section className="all-task-actions">
                    <div
                      className="task"
                      // bounds=".move-tasks"
                      // handle=".task-list"
                    >
                      <label>Task</label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {initTasks?.map((row, index) => (
                          <div className="task-card-container" key={index}>
                            <div className="task-card">
                              <div className="create-use">
                                <h4>{row.task_name}</h4>
                                <p className="mb-0">
                                  {row.task_description}
                                </p>
                              </div>
                              <div className="user-profile-tasks">
                                <div className="card-image">
                                  <img src={AdminImage} alt="User" />
                                </div>
                                <div className="card-name text-left">
                                  <p className="mb-1">{row.added_by}</p>
                                  <div className="card-task-date ">
                                    <p
                                      style={{
                                        color: "gray",
                                        fontSize: "12px",
                                        marginBottom: "0.5rem",
                                      }}
                                    >
                                      Date: {row.task_date}
                                    </p>
                                    <select
                                      onChange={(e) =>
                                        handleStatusChange(e, row.id)
                                      }
                                      value={row.status}
                                      style={{
                                        outline: "none",
                                        cursor: "pointer",
                                        border: "0.5px solid lightgray",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        color: "#666",
                                        padding: "5px",
                                      }}
                                    >
                                      <option value="">Change Status</option>
                                      <option value="task">Task</option>
                                      <option value="process">Process</option>
                                      <option value="review">Review</option>
                                      <option value="completed">
                                        Completed
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="process">
                      <label>Process</label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {proTasks?.map((row, index) => (
                          <div className="task-card-container" key={index}>
                            <div className="task-card">
                              <div className="create-use">
                                <h4>{row.task_name}</h4>
                                <p className="mb-0">
                                  {row.task_description}
                                </p>
                              </div>
                              <div className="user-profile-tasks">
                                <div className="card-image">
                                  <img src={AdminImage} alt="User" />
                                </div>
                                <div className="card-name text-left ">
                                  <p className="mb-1">{row.added_by}</p>

                                  <div className="card-task-date">
                                  <p className="mb-0">
                                      Date: {row.task_date}
                                    </p>
                                    <select
                                      onChange={(e) =>
                                        handleStatusChange(e, row.id)
                                      }
                                      value={row.status}
                                      style={{
                                        outline: "none",
                                        cursor: "pointer",
                                        border: "0.5px solid lightgray",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        color: "#666",
                                        padding: "5px",
                                      }}
                                    >
                                      <option value="">Change Status</option>
                                      <option value="task">Task</option>
                                      <option value="process">Process</option>
                                      <option value="review">Review</option>
                                      <option value="completed">
                                        Completed
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="review">
                      <label>Review</label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {reTasks?.map((row, index) => (
                          <div className="task-card-container" key={index}>
                            <div className="task-card">
                              <div className="create-use">
                                <h4>{row.task_name}</h4>
                                <p className="mb-0">
                                  {row.task_description}
                                </p>
                              </div>
                              <div className="user-profile-tasks">
                                <div className="card-image">
                                  <img src={AdminImage} alt="User" />
                                </div>
                                <div className="card-name text-left">
                                  <p className="mb-1">{row.added_by}</p>
                               
                                <div className="card-task-date ">
                                  <p
                                    style={{
                                      color: "gray",
                                      fontSize: "12px",
                                      marginBottom: "0.5rem",
                                    }}
                                  >
                                    Date: {row.task_date}
                                  </p>
                                  <select
                                    onChange={(e) =>
                                      handleStatusChange(e, row.id)
                                    }
                                    value={row.status}
                                    style={{
                                      outline: "none",
                                      cursor: "pointer",
                                      border: "0.5px solid lightgray",
                                      borderRadius: "4px",
                                      fontSize: "14px",
                                      color: "#666",
                                      padding: "5px",
                                    }}
                                  >
                                    <option value="">Change Status</option>
                                    <option value="task">Task</option>
                                    <option value="process">Process</option>
                                    <option value="review">Review</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="complete">
                      <label>Completed</label>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {comTasks?.map((row, index) => (
                          <div className="task-card-container" key={index}>
                            <div className="task-card">
                              <div className="create-use">
                                <h4>{row.task_name}</h4>
                                <p className="mb-0">
                                  {row.task_description}
                                </p>
                              </div>
                              <div className="user-profile-tasks">
                                <div className="card-image">
                                  <img src={AdminImage} alt="User" />
                                </div>
                                <div className="card-name text-left">
                                  <p className="mb-1">{row.added_by}</p>
                                  <div className="card-task-date ">
                                    <p
                                      style={{
                                        color: "gray",
                                        fontSize: "12px",
                                        marginBottom: "0.5rem",
                                      }}
                                    >
                                      Date: {row.task_date}
                                    </p>
                                    <select
                                      onChange={(e) =>
                                        handleStatusChange(e, row.id)
                                      }
                                      value={row.status}
                                      style={{
                                        outline: "none",
                                        cursor: "pointer",
                                        border: "0.5px solid lightgray",
                                        borderRadius: "4px",
                                        fontSize: "14px",
                                        color: "#666",
                                        padding: "5px",
                                      }}
                                      className=""
                                    >
                                      <option value="">Change Status</option>
                                      <option value="task">Task</option>
                                      <option value="process">Process</option>
                                      <option value="review">Review</option>
                                      <option value="completed">
                                        Completed
                                      </option>
                                      <option value="delete">Delete</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
