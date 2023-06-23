import * as React from "react";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const openUserSettings = Boolean(anchorEl);
  const handleUserSettings = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleCloseUserSettings = () => {
    setAnchorEl(null);
  }

  return (
    <header className="h-14 bg-gray-800">
      <div className="mx-4 flex items-center h-full">
        <h1 className="text-white text-2xl">
          Peer Pressure Experiment Admin
        </h1>
        {/* User settings button */}
        <Button 
          className="ml-auto text-white"
          onClick={handleUserSettings}
        >
          User Settings
        </Button>
        {/* User settings menu */}
        <Menu
          anchorEl={anchorEl}
          open={openUserSettings}
          onClose={handleCloseUserSettings}
        >
          <MenuItem onClick={handleCloseUserSettings}>Profile</MenuItem>
          <MenuItem onClick={handleCloseUserSettings}>My account</MenuItem>
          <MenuItem onClick={handleCloseUserSettings}>Sign out</MenuItem>
        </Menu>
      </div>
    </header>
  );
}

export default Header;