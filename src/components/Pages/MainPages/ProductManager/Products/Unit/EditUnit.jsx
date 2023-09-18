import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";
import {
  TextField,
  Button,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUnit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedUnit, setEditedUnit] = useState({
    _method: "PUT",
    name: "",
    short_name: "",
    allow_decimal: "",
    add_as_multiple: "",
    unit_value: "",
    base_unit: "",
  });

  useEffect(() => {
    // Fetch the data of the selected unit using its ID
    const fetchUnitData = async () => {
      try {
        const response = await axios.get(`${APIBASE}admin/units/${id}`);
        const dataFromBackend = response.data.data;
        // console.log(dataFromBackend);

        // Convert "yes" to true and "no" to false for allow_decimal
        dataFromBackend.allow_decimal = dataFromBackend.allow_decimal === "yes";

        setEditedUnit(dataFromBackend); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching unit data:", error);
      }
    };

    if (id) {
      fetchUnitData();
    }
  }, [id]);

  const handleCheckbox = (event) => {
    setEditedUnit((prevUnit) => ({
      ...prevUnit,
      add_as_multiple: event.target.checked,
      time_base_unit: event.target.checked ? prevUnit.time_base_unit : null,
      base_unit: event.target.checked ? prevUnit.base_unit : null,
    }));
    // console.log(editedUnit);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "allow_decimal" && type === "select-one") {
      const allowDecimalValue = newValue === "yes" ? "yes" : "no";
      setEditedUnit((prevUnit) => ({
        ...prevUnit,
        allow_decimal: allowDecimalValue,
      }));
    } else {
      setEditedUnit((prevUnit) => ({
        ...prevUnit,
        [name]: newValue,
      }));
    }

    // console.log(editedUnit);
  };

  const handleSave = async () => {
    if(editedUnit.name){
    try {
      // Convert the allow_decimal field to "Yes" or "No" for the backend
      const dataToSend = {
        ...editedUnit,
        allow_decimal: editedUnit.allow_decimal === "yes" ? "yes" : "no",
      };

      // Update the unit data in the database using the unit ID
      const res = await axios.put(`${APIBASE}admin/units/${id}`, dataToSend);
      // console.log("response", res.data);

      // Show toast for successful update
      toast.success("Updated successfully", { autoClose: 2000 });

      // Navigate back to the Units component after saving
      navigate("/admin/ProductManager/Products/units");
    } catch (error) {
      console.error("Error updating unit data:", error);
    } }else{
      toast.warn("Make sure Unit name should not be duplicate or Empty.", {
        position:"top-center",
        autoClose: 2000,
      });
    } 
  };

  const handleGoBack = () => {
    // Go back to the previous page in the history
    navigate(-1);
  };

  return (
    <>
      <ToastContainer />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <i>
            <HomeIcon /> {"-"}{" "}
          </i>
          <h6 style={{ margin: "5px" }}>
            Product Manager - Products - Edit Units
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
      <div className="card-flow">
        <div className="card-header">
          <h3 className="card-title">Edit Units </h3>
        </div>
        <div className="add-Brand-container">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>Name: <span style={{ color: "red", fontWeight: "800" }}>*</span></InputLabel>
                <TextField
                  name="name"
                  value={editedUnit.name || ""}
                  onChange={handleInputChange}
                  placeholder="Unit Name"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>Short Name:</InputLabel>
                <TextField
                  name="short_name"
                  value={editedUnit.short_name || ""}
                  onChange={handleInputChange}
                  placeholder="Short Name"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="input-field">
                <InputLabel>Allow decimal:</InputLabel>
                <FormControl>
                  <Select
                    name="allow_decimal"
                    value={editedUnit.allow_decimal}
                    onChange={handleInputChange}
                    displayEmpty
                    renderValue={(value) => {
                      if (!value) {
                        return <div>Yes / No</div>;
                      }
                      return value;
                    }}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                className="input-field"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexDirection: "row",
                  paddingTop: "36px",
                }}
              >
                <Checkbox
                  style={{ marginRight: "4px" }}
                  name="add_as_multiple"
                  onChange={handleCheckbox}
                  checked={editedUnit.add_as_multiple}
                />
                <InputLabel>Add as multiple of other unit</InputLabel>
              </div>
            </Grid>

            {editedUnit.add_as_multiple && (
              <>
                <Grid item xs={12} sm={6}>
                  <div className="units">
                    <div className="input-field">
                      <InputLabel>1 Unit =</InputLabel>
                      <TextField
                        name="time_base_unit"
                        // value={editedUnit.time_base_unit || ""}
                        onChange={handleInputChange}
                        placeholder="Time Base Unit"
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="units" style={{ paddingTop: "31px" }}>
                    <div className="input-field">
                      <FormControl fullWidth>
                        <Select
                          name="base_unit"
                          // value={editedUnit.base_unit}
                          onChange={handleInputChange}
                          input={<OutlinedInput />}
                          displayEmpty
                          renderValue={(selected) => {
                            if (!selected) {
                              return <>Select an Option</>;
                            }

                            return selected;
                          }}
                        >
                          <MenuItem value="null" disabled>
                            Select an Option
                          </MenuItem>
                          <MenuItem value="Piece(s)">Piece(s)</MenuItem>
                          <MenuItem value="Gram(s)">Gram(s)</MenuItem>
                          <MenuItem value="Packet(s)">Packet(s)</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
          <Grid container justifyContent="flex-end" sx={{ marginTop: "20px" }}>
            <Grid item>
              <Button
                className="save-btn"
                variant="contained"
                style={{ background: "#7356b2" }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default EditUnit;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   InputLabel,
//   Grid,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControl,
//   OutlinedInput,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditUnit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [editedUnit, setEditedUnit] = useState({
//     _method: "PUT",
//     name: "",
//     short_name: "",
//     allow_decimal: "",
//     add_as_multiple: "",
//     unit_value: "",
//     base_unit: "",
//   });

//   useEffect(() => {
//     // Fetch the data of the selected unit using its ID
//     const fetchUnitData = async () => {
//       try {
//         const response = await axios.get(
//           `${APIBASE}admin/units/${id}`
//         );
//         const dataFromBackend = response.data.data;

//         // Convert "yes" to true and "no" to false for allow_decimal
//         dataFromBackend.allow_decimal = dataFromBackend.allow_decimal === "yes";

//         setEditedUnit(dataFromBackend); // Set the fetched data to the state
//       } catch (error) {
//         console.error("Error fetching unit data:", error);
//       }
//     };

//     if (id) {
//       fetchUnitData();
//     }
//   }, [id]);

//   const handleCheckbox = (event) => {
//     setEditedUnit((prevUnit) => ({
//       ...prevUnit,
//       add_as_multiple: event.target.checked,
//       time_base_unit: event.target.checked ? prevUnit.time_base_unit : null,
//       base_unit: event.target.checked ? prevUnit.base_unit : null,
//     }));
//   };

//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     const newValue = type === "checkbox" ? checked : value;

//     if (name === "allow_decimal" && type === "select-one") {
//       setEditedUnit((prevUnit) => ({
//         ...prevUnit,
//         allow_decimal: newValue === "yes" ? "yes" : "no",
//       }));
//     } else {
//       setEditedUnit((prevUnit) => ({
//         ...prevUnit,
//         [name]: newValue,
//       }));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       // Convert the allow_decimal field to "Yes" or "No" for the backend
//       const dataToSend = {
//         ...editedUnit,
//         allow_decimal: editedUnit.allow_decimal ? "yes" : "no",
//       };

//       // Update the unit data in the database using the unit ID
//       const res = await axios.put(
//         `${APIBASE}admin/units/${id}`,
//         dataToSend
//       );
//       console.log("response", res.data);

//       // Show toast for successful update
//       toast.success("Updated successfully", { autoClose: 2000 });

//       // Navigate back to the Units component after saving
//       navigate("/admin/ProductManager/Products/units");
//     } catch (error) {
//       console.error("Error updating unit data:", error);
//     }
//   };

//   const handleGoBack = () => {
//     // Go back to the previous page in the history
//     navigate(-1);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div style={{ display: "flex" }}>
//           <i>
//             <HomeIcon /> {"-"}{" "}
//           </i>
//           <h6 style={{ margin: "5px" }}>
//             Product Manager - Products - Edit Units
//           </h6>
//         </div>

//         <button
//           className="back-button"
//           onClick={handleGoBack}
//           style={{ background: "#EEF2F6", fontWeight: "500" }}
//         >
//           <span className="back-arrow" style={{ fontWeight: "500" }}>
//             &larr;
//           </span>{" "}
//           Back
//         </button>
//       </div>
//       <br />
//       <div className="card-flow">
//         <div className="card-header">
//           <h3 className="card-title">Edit Units </h3>
//         </div>
//         <div className="add-Brand-container">
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <div className="input-field">
//                 <InputLabel>Name:</InputLabel>
//                 <TextField
//                   name="name"
//                   value={editedUnit.name || ""}
//                   onChange={handleInputChange}
//                   placeholder="Unit Name"
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div className="input-field">
//                 <InputLabel>Short Name:</InputLabel>
//                 <TextField
//                   name="short_name"
//                   value={editedUnit.short_name || ""}
//                   onChange={handleInputChange}
//                   placeholder="Short Name"
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div className="input-field">
//                 <InputLabel>Allow decimal:</InputLabel>
//                 <FormControl>
//                   <Select
//                     name="allow_decimal"
//                     value={editedUnit.allow_decimal}
//                     onChange={handleInputChange}
//                     displayEmpty
//                     renderValue={(value) => (value ? "yes" : "no")}
//                   >
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div
//                 className="input-field"
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-end",
//                   flexDirection: "row",
//                   paddingTop: "36px",
//                 }}
//               >
//                 <Checkbox
//                   style={{ marginRight: "4px" }}
//                   name="add_as_multiple"
//                   onChange={handleCheckbox}
//                   checked={editedUnit.add_as_multiple}
//                 />
//                 <InputLabel>Add as multiple of other unit</InputLabel>
//               </div>
//             </Grid>

//             {editedUnit.add_as_multiple && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <div className="units">
//                     <div className="input-field">
//                       <InputLabel>1 Unit =</InputLabel>
//                       <TextField
//                         name="time_base_unit"
//                         value={editedUnit.time_base_unit || ""}
//                         onChange={handleInputChange}
//                         placeholder="Time Base Unit"
//                       />
//                     </div>
//                   </div>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <div className="units" style={{ paddingTop: "31px" }}>
//                     <div className="input-field">
//                       <FormControl fullWidth>
//                         <Select
//                           name="base_unit"
//                           value={editedUnit.base_unit}
//                           onChange={handleInputChange}
//                           input={<OutlinedInput />}
//                           displayEmpty
//                           renderValue={(selected) => {
//                             if (!selected) {
//                               return <>Select an Option</>;
//                             }

//                             return selected;
//                           }}
//                         >
//                           <MenuItem value="null" disabled>
//                             Select an Option
//                           </MenuItem>
//                           <MenuItem value="Piece(s)">Piece(s)</MenuItem>
//                           <MenuItem value="Gram(s)">Gram(s)</MenuItem>
//                           <MenuItem value="Packet(s)">Packet(s)</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//           <Grid container justifyContent="flex-end" sx={{ marginTop: "20px" }}>
//             <Grid item>
//               <Button
//                 className="save-btn"
//                 variant="contained"
//                 style={{ background: "#7356b2" }}
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//             </Grid>
//           </Grid>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditUnit;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   TextField,
//   Button,
//   InputLabel,
//   Grid,
//   Select,
//   MenuItem,
//   Checkbox,
//   FormControl,
//   OutlinedInput,
// } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EditUnit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [editedUnit, setEditedUnit] = useState({
//     _method: "PUT",
//     name: "",
//     short_name: "",
//     allow_decimal: "", // Change to a yes or no
//     add_as_multiple: "",
//     unit_value: "",
//     base_unit: "",
//   });

//   useEffect(() => {
//     // Fetch the data of the selected unit using its ID
//     const fetchUnitData = async () => {
//       try {
//         const response = await axios.get(
//           `${APIBASE}admin/units/${id}`
//         );
//         const dataFromBackend = response.data.data;

//         // Convert "yes" to true and "no" to false for allow_decimal
//         dataFromBackend.allow_decimal = dataFromBackend.allow_decimal === "yes";

//         setEditedUnit(dataFromBackend); // Set the fetched data to the state
//       } catch (error) {
//         console.error("Error fetching unit data:", error);
//       }
//     };

//     if (id) {
//       fetchUnitData();
//     }
//   }, [id]);

//   const [checkboxChange, setCheckboxChange] = useState(false);
//   // const [selectBaseUnit, setSelectBaseUnit] = useState("default");

//   // const handleBaseUnitSelect = (event) => {
//   //   setSelectBaseUnit(event.target.value);
//   // };

//   const handleCheckbox = (event) => {
//     setCheckboxChange((prevState) => !prevState);

//     if (event.target.value === false) {
//       setEditedUnit((prevUnit) => ({
//         ...prevUnit,
//         time_base_unit: null,
//         base_unit: null,
//       }));
//     }
//     console.log(editedUnit);
//   };

//   const handleInputChange = (event) => {
//     // Handle "add_as_multiple" checkbox
//     setEditedUnit((prevUnit) => ({
//       ...prevUnit,
//       [event.target.name]: event.target.value,
//     }));
//     console.log(editedUnit);
//   };

//   const handleSave = async () => {
//     try {
//       // Convert the allow_decimal field to "Yes" or "No" for the backend
//       const dataToSend = {
//         ...editedUnit,
//         allow_decimal: editedUnit.allow_decimal ? "yes" : "no",
//       };

//       // Update the unit data in the database using the unit ID

//       const res = await axios.put(
//         `${APIBASE}admin/units/${id}`,
//         dataToSend
//       );
//       console.log("response", res.data);

//       // Show toast for successful update
//       toast.success("Updated successfully", { autoClose: 2000 });

//       // Navigate back to the Units component after saving
//       navigate("/admin/ProductManager/Products/units");
//     } catch (error) {
//       console.error("Error updating unit data:", error);
//     }
//   };

//   const handleGoBack = () => {
//     // Go back to the previous page in the history
//     navigate(-1);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div style={{ display: "flex" }}>
//           <i>
//             <HomeIcon /> {"-"}{" "}
//           </i>
//           <h6 style={{ margin: "5px" }}>
//             Product Manager - Products - Edit Units
//           </h6>
//         </div>

//         <button
//           className="back-button"
//           onClick={handleGoBack}
//           style={{ background: "#EEF2F6", fontWeight: "500" }}
//         >
//           <span className="back-arrow" style={{ fontWeight: "500" }}>
//             &larr;
//           </span>{" "}
//           Back
//         </button>
//       </div>
//       <br />
//       <div className="card-flow">
//         <div className="card-header">
//           <h3 className="card-title">Edit Units </h3>
//         </div>
//         <div className="add-Brand-container">
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <div className="input-field">
//                 <InputLabel>Name:</InputLabel>
//                 <TextField
//                   name="name"
//                   value={editedUnit.name || ""}
//                   onChange={handleInputChange}
//                   placeholder="Unit Name"
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div className="input-field">
//                 <InputLabel>Short Name:</InputLabel>
//                 <TextField
//                   name="short_name"
//                   value={editedUnit.short_name || ""}
//                   onChange={handleInputChange}
//                   placeholder="Short Name"
//                 />
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div className="input-field">
//                 <InputLabel>Allow decimal:</InputLabel>
//                 <FormControl>
//                   <Select
//                     name="allow_decimal"
//                     value={editedUnit.allow_decimal}
//                     onChange={handleInputChange}
//                     // displayEmpty
//                     // renderValue={(value) => (value ? "yes" : "no")}
//                   >
//                     <MenuItem value="yes">Yes</MenuItem>
//                     <MenuItem value="no">No</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <div
//                 className="input-field"
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-end",
//                   flexDirection: "row",
//                   paddingTop: "36px",
//                 }}
//               >
//                 <Checkbox
//                   style={{ marginRight: "4px" }}
//                   name="add_as_multiple"
//                   onChange={handleCheckbox}
//                   checked={checkboxChange}
//                 />
//                 <InputLabel>Add as multiple of other unit</InputLabel>
//               </div>
//             </Grid>

//             {checkboxChange && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <div className="units">
//                     <div className="input-field">
//                       <InputLabel>1 Unit =</InputLabel>
//                       <TextField
//                         name="time_base_unit"
//                         value={editedUnit.time_base_unit || ""}
//                         onChange={handleInputChange}
//                         placeholder="Time Base Unit"
//                       />
//                     </div>
//                   </div>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <div className="units" style={{ paddingTop: "31px" }}>
//                     <div className="input-field">
//                       <FormControl fullWidth>
//                         <Select
//                           name="base_unit"
//                           // value={editedUnit.base_unit}
//                           onChange={handleInputChange}
//                           input={<OutlinedInput />}
//                           displayEmpty
//                           renderValue={(selected) => {
//                             if (!selected) {
//                               return <>Select an Option</>;
//                             }

//                             return selected;
//                           }}
//                         >
//                           <MenuItem value="null" disabled>
//                             Select an Option
//                           </MenuItem>
//                           <MenuItem value="Piece(s)">Piece(s)</MenuItem>

//                           <MenuItem value="Gram(s)">Gram(s)</MenuItem>
//                           <MenuItem value="Packet(s)">Packet(s)</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>
//                 </Grid>
//               </>
//             )}
//           </Grid>
//           <Grid container justifyContent="flex-end" sx={{ marginTop: "20px" }}>
//             <Grid item>
//               <Button
//                 className="save-btn"
//                 variant="contained"
//                 style={{ background: "#7356b2" }}
//                 onClick={handleSave}
//               >
//                 Save
//               </Button>
//             </Grid>
//           </Grid>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditUnit;
