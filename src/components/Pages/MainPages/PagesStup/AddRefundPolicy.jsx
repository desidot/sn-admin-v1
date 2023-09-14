import React from "react";

import {
  // Select,
  InputLabel,
  // MenuItem,
  Grid,
  // TextField,
  Button,
  capitalize,
  // Autocomplete,
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddRefundPolicy = () => {
  // const [selectCurrency, setSelectedCurrency] = useState("");

  return (
    <>
      <br />
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Add Refund Policy</h3>
        </div>
        <div className="card-header">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="input-field">
                <InputLabel>Refund Policy:</InputLabel>
                {/* <textarea
                  placeholder="Enter Notification Message"
                  // value={initialAmount}
                  // onChange={handleInitialAmountChange}
                /> */}
                <CKEditor
                  editor={ClassicEditor}
                  // onChange={handlePrivacyPolicyChange}
                  config={{
                    ckfinder: {
                      uploadUrl: "/your_upload_image_endpoint", // Replace with your image upload endpoint
                    },
                  }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "right",
                gap: "2rem",
              }}
            >
              {/* Submit button */}
              <Button
                className="save-btn"
                variant="contained"
                style={{
                  background: "#7356b2",
                  textTransform: capitalize,
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                }}
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
          <br />
        </div>
      </div>
    </>
  );
};

export default AddRefundPolicy;
