import { Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import "./Roles.css";
const PermissionRow = ({
  row,
  index,
  allowedPermissions,
  setAllowedPermissions,
}) => {
    const isPermissionAllowed = (permissionId) =>
    allowedPermissions?.includes(permissionId);

  const handleCheckboxChange = (elem, e) => {
   if(e.target.checked){
 
    setAllowedPermissions([...allowedPermissions,elem.id])
   }else{
   
    const filter=allowedPermissions?.filter((ele)=>ele!==elem.id);
    setAllowedPermissions(filter)
   }
  };

  return (
    <div className="single-row" key={index}>
      <label>{Object.keys(row)[0]}</label>
      <div className="permission-box">
        {row[Object.keys(row)[0]]?.permissions?.map((elem, index) => (
          <div key={index}>
            <FormControlLabel
              control={
                <Checkbox
                checked={isPermissionAllowed(elem.id)}
                  onChange={(e) => handleCheckboxChange(elem, e)}
                />
              }
              label={elem.name.split(" ")[0]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionRow;
