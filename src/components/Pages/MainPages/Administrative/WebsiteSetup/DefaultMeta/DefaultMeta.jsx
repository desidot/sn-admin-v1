import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import "../Meta/Meta.css";
import HomeIcon from "@mui/icons-material/Home";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

const initialState = {
  header: "",
  footer: "",
  google_site: "",
  ms_validate: "",
  fb_domain: "",
  og_image: null,
};

const DefaultMeta = () => {
  let search_id = 1;
  const [state, setState] = useState(initialState);
  const [filePreview, setFilePreview] = useState(null);

  const getCurrMeta = async (id) => {
    try {
      const res = await axios.get(`${APIBASE}admin/pixels/${id}`);
      const metaData = res.data.data;

      setState({
        header: metaData.header,
        footer: metaData.footer,
        google_site: metaData.google_site,
        ms_validate: metaData.ms_validate,
        fb_domain: metaData.fb_domain,
        og_image: metaData.og_image,
      });
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    if (search_id) {
      getCurrMeta(search_id);
    }
  }, [search_id]);

  const handleSaveClick = async () => {
    if (search_id) {
      try {
        // Create a FormData object
        const formData = new FormData();
        formData.append("_method", "PUT");
        // Append each field to the FormData object
        formData.append("header", state.header);
        formData.append("footer", state.footer);
        formData.append("google_site", state.google_site);
        formData.append("ms_validate", state.ms_validate);
        formData.append("fb_domain", state.fb_domain);

        // Check if there is an image selected and append it if available
        if (state.og_image) {
          formData.append("og_image", state.og_image);
        }

        // Send the FormData object as the payload
        await axios.post(`${APIBASE}admin/pixels/${search_id}`, formData);
        toast.success("Meta updated successfully.");
      } catch (error) {
        toast.error("Error!");
        // console.error(error);
      }
    } else {
      try {
        // Create a FormData object
        const formData = new FormData();
        formData.append("_method", "PUT");
        // Append each field to the FormData object
        formData.append("header", state.header);
        formData.append("footer", state.footer);
        formData.append("google_site", state.google_site);
        formData.append("ms_validate", state.ms_validate);
        formData.append("fb_domain", state.fb_domain);

        // Check if there is an image selected and append it if available
        if (state.og_image) {
          formData.append("og_image", state.og_image);
        }

        // Send the FormData object as the payload
        await axios.post(`${APIBASE}admin/pixels/${search_id}`, formData);
        toast.success("Meta updated successfully.");
      } catch (error) {
        toast.error("Error!");
        // console.error(error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };

      reader.readAsDataURL(file);

      // Set the selected file in the state
      setState((prevState) => ({
        ...prevState,
        og_image: file,
      }));
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
            Administrative - Website Setup - Set Default Meta
          </h6>
        </div>

        <button
          className="back-button"
          style={{ background: "#EEF2F6", fontWeight: "500" }}
        >
          <span className="back-arrow" style={{ fontWeight: "500" }}>
            &larr;
          </span>{" "}
          Back
        </button>
      </div>
      <br />
      <div className="add-products-main">
        <section className="filter-section">
          <div className="filter-head-products">
            <Typography variant="h1">Set Default Meta</Typography>
          </div>
          <div className="filter-container">
            <Grid container spacing={2}>
              {/* Your form fields here */}
              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Header Pixels :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
                    placeholder="Header Pixels"
                    value={state.header}
                    onChange={(e) =>
                      setState({ ...state, header: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Footer Pixels :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
                    placeholder="Footer Pixels"
                    value={state.footer}
                    onChange={(e) =>
                      setState({ ...state, footer: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Google Site :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
                    placeholder="Google Site"
                    value={state.google_site}
                    onChange={(e) =>
                      setState({ ...state, google_site: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">MS Validate :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
                    placeholder="MS Validate"
                    value={state.ms_validate}
                    onChange={(e) =>
                      setState({ ...state, ms_validate: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">FB Domain :</InputLabel>
                <FormControl fullWidth>
                  <textarea
                    style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
                    placeholder="FB Domain"
                    value={state.fb_domain}
                    onChange={(e) =>
                      setState({ ...state, fb_domain: e.target.value })
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel htmlFor="">Meta Image (Max 2MB size) :</InputLabel>
                <FormControl fullWidth>
                  <div className="input-field">
                    <input
                      style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </FormControl>
                {/* Display the file preview */}
                {/* {filePreview && ( */}
                  <img
                    src={filePreview ? filePreview : `${IMAGEURL}${state?.og_image}`}
                    alt="Preview"
                    style={{
                      maxWidth: "60px",
                      marginTop: "10px",
                      padding: "5px",
                    }}
                  />
                {/* )} */}
              </Grid>

              <Grid item xs={12} md={6}>
                <div
                  className="add-wishlist-submit-btn"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    // marginTop: "2rem",
                  }}
                >
                  <Button
                    className="submit-btn"
                    onClick={handleSaveClick}
                    variant="contained"
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    </>
  );
};

export default DefaultMeta;

// import React, { useEffect, useState } from "react";
// import {
//   Select,
//   Button,
//   InputLabel,
//   MenuItem,
//   Grid,
//   Typography,
//   FormControl,
//   TextField,
// } from "@mui/material";
// import "../Meta/Meta.css";
// import HomeIcon from "@mui/icons-material/Home";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import { APIBASE, IMAGEURL } from "../../../../../auth/apiConfig";

// const initialState = {
//   page_name: "",
//   meta_title: "",
//   meta_keyword: "",
//   meta_description: "",
// };
// const DefaultMeta = () => {
//   const search = useParams();
//   const [state, setState] = useState(initialState);

//   const getCurrMeta = async (id) => {
//     try {
//       const res = await axios.get(`${APIBASE}admin/metas/${id}`);
//       setState({
//         ...state,
//         page_name: res.data.data.page_name,
//         meta_title: res.data.data.meta_title,
//         meta_description: res.data.data.meta_description,
//         meta_file: res.data.data.meta_file,
//         meta_keyword: res.data.data.meta_keyword,
//       });
//     } catch (error) {
//       //console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (search.id) {
//       getCurrMeta(search.id);
//     }
//   }, [search]);
//   const handleGoBack = () => {
//     // Go back to the previous page in the history
//     window.history.go(-1);
//   };
//   const handleSaveClick = async () => {
//     if (search.id) {
//       try {
//         await axios.put(`${APIBASE}admin/metas/${search.id}`, state);
//         toast.success("Meta updated successfully.");
//         window.history.go(-1);
//       } catch (error) {
//         toast.error("Error!");
//       }
//     } else {
//       try {
//         await axios.post(`${APIBASE}admin/metas`, state);
//         toast.success("Meta added successfully.");
//         window.history.go(-1);
//       } catch (error) {
//         toast.error("Error!");
//       }
//     }
//   };

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <div style={{ display: "flex" }}>
//           <i>
//             <HomeIcon /> {"-"}{" "}
//           </i>
//           <h6 style={{ margin: "5px" }}>
//             Administrative - Website Setup - {search.id ? "Edit" : "Add"} Default Meta
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
//       <div className="add-products-main">
//         <section className="filter-section">
//           <div className="filter-head-products">
//             <Typography variant="h1">
//               {search.id ? "Edit" : "Add"} Meta
//             </Typography>
//           </div>
//           <div className="filter-container">
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Meta Pixels :</InputLabel>
//                 <FormControl fullWidth>
//                   <textarea
//                     style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
//                     placeholder="Meta Description"
//                     value={state.meta_pixels}
//                     onChange={(e) =>
//                       setState({ ...state, meta_pixels: e.target.value })
//                     }
//                   />
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Header Pixels :</InputLabel>
//                 <FormControl fullWidth>
//                   <textarea
//                     style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
//                     placeholder="Meta Description"
//                     value={state.footer_pixels}
//                     onChange={(e) =>
//                       setState({ ...state, footer_pixels: e.target.value })
//                     }
//                   />
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Footer Pixels :</InputLabel>
//                 <FormControl fullWidth>
//                   <textarea
//                     style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
//                     placeholder="Meta Description"
//                     value={state.header_pixels}
//                     onChange={(e) =>
//                       setState({ ...state, header_pixels: e.target.value })
//                     }
//                   />
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <InputLabel htmlFor="">Meta Image (Max 2MB size) :</InputLabel>
//                 <FormControl fullWidth>
//                   <div className="input-field">
//                     <input
//                       style={{ height: "2.5rem", paddingLeft: "0.5rem" }}
//                       value={state.meta_file}
//                       type="file"
//                       onChange={(e) =>
//                         setState({ ...state, meta_file: e.target.value })
//                       }
//                     />
//                   </div>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <div
//                   className="add-wishlist-submit-btn"
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     marginTop: "2rem",
//                   }}
//                 >
//                   <Button
//                     className="submit-btn"
//                     onClick={() => handleSaveClick()}
//                     variant="contained"
//                   >
//                     Save
//                   </Button>
//                 </div>
//               </Grid>
//             </Grid>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// };

// export default DefaultMeta;
