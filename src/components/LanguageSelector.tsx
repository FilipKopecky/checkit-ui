import { Button, Menu, MenuItem, Box } from "@mui/material";
import React from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { useAppDispatch, useAppSelector } from "../hooks/ReduxHooks";
import { changeLanguage, selectLanguage } from "../slices/languageSlice";
import { useIntl } from "react-intl";
import Constants from "../utils/Constants";

const LanguageSelector: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const languageSelector = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const intl = useIntl();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectLocale = (locale: string) => {
    handleClose();
    dispatch(changeLanguage(locale));
  };
  const selectCs = () => selectLocale(Constants.LOCALES.CS);
  const selectEn = () => selectLocale(Constants.LOCALES.EN);
  return (
    <Box>
      <Button
        startIcon={<LanguageOutlinedIcon color="inherit" />}
        endIcon={<ExpandMoreOutlinedIcon color="inherit" />}
        onClick={handleClick}
        color="inherit"
      >
        {intl.formatMessage({ id: languageSelector.language })}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={selectCs}>
          {intl.formatMessage({ id: Constants.LOCALES.CS })}
        </MenuItem>
        <MenuItem onClick={selectEn}>
          {intl.formatMessage({ id: Constants.LOCALES.EN })}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
