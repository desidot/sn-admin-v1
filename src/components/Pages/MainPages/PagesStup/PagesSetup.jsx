import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

// import AddSupport from "./Support/Support";
// import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
// import TermsCondition from "./TermsCondition/TermsConditions";
// import DisplayPricing from "./Pricing/DisplayPricing";
// import MisNotification from "./MisNotification";
import AddPrivacyPolicy from "./AddPrivacyPolicy";
import AddTermsCondition from "./AddTermsCondition";
import AddRefundPolicy from "./AddRefundPolicy";

// Create a new context to manage the active tab state
const TabContext = React.createContext();

const SetupPages = () => {
  const [activeTab, setActiveTab] = useState("termsconditions");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext.Provider value={{ activeTab }}>
      <div className="card">
        <div className="card-head">
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="nav tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Terms & Conditions" value="termsconditions" />

              <Tab label="Privacy Policy" value="addprivacy" />

              <Tab label="Refund Policy" value="addrefund" />
            </Tabs>
          </Box>
        </div>
      </div>

      {/* Render different components based on the active tab */}

      {activeTab === "termsconditions" && <AddTermsCondition />}
      {activeTab === "addprivacy" && <AddPrivacyPolicy />}
      {activeTab === "addrefund" && <AddRefundPolicy />}

      {/* {activeTab === "notifications" && <MisNotification />} */}
      {/* {activeTab === "addnotification" && <AddNotifications />} */}

      {/* {activeTab === "pricing" && <DisplayPricing />} */}
      {/* Add other components for other tabs if needed */}
    </TabContext.Provider>
  );
};

export default SetupPages;
