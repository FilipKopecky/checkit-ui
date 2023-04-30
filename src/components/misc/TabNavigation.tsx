import React from "react";
import { keyframes, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";

interface TabNavigationProps {
  tabs: string[];
  labels: string[];
  activeTab: string;
  setActiveTab: (event: React.SyntheticEvent, newValue: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  labels,
  activeTab,
  setActiveTab,
}) => {
  const intl = useIntl();
  return (
    <Box
      sx={{ backgroundColor: "white", display: "flex", flex: 1 }}
      p={1}
      pl={0}
      pr={5}
    >
      <Tabs
        TabIndicatorProps={{
          sx: { display: "none" },
        }}
        value={activeTab}
        onChange={setActiveTab}
        sx={{
          padding: 0.5,
          borderRadius: 4,
          backgroundColor: "#EDF8F8",
          "& button": {
            borderRadius: 3,
            minHeight: "auto",
          },
          "& button.Mui-selected": {
            backgroundColor: "white",
            animation: `${inset} 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both`,
          },
        }}
      >
        {tabs.map((tab, index) => {
          return (
            <Tab
              key={tab}
              label={labels[index]}
              value={tab}
              disableRipple={true}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

const inset = keyframes`
  0% {
    -webkit-box-shadow: inset 0 0 0 0 rgba(209, 200, 200, 0);
    box-shadow: inset 0 0 0 0 rgba(209, 200, 200, 0);
  }
  100% {
    -webkit-box-shadow: inset 0 0 4px 0 rgba(209, 200, 200, 0.95);
    box-shadow: inset 0 0 4px 0 rgba(209, 200, 200, 0.95);
  }
`;

export default TabNavigation;
