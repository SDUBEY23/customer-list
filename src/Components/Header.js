import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

const Header = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <h1>{title}</h1>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
