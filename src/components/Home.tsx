import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useIntl } from "react-intl";
import HomeNavigationButtons from "./misc/HomeNavigationButtons";
import TabNavigation from "./misc/TabNavigation";

const Home: React.FC = () => {
  const intl = useIntl();
  const tabs = ["default", "secondary", "third"];
  const [value, setValue] = React.useState("default");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box p={3}>
      <Typography variant={"h4"} gutterBottom>
        {intl.formatMessage({ id: "welcome" })}
      </Typography>
      <HomeNavigationButtons />
      <Box>
        <TabNavigation
          tabs={tabs}
          activeTab={value}
          setActiveTab={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Home;
