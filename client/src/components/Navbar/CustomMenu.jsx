import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function CustomMenu(props) {
  const { menu } = props;
  const { buttonText, options, variant } = menu;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    anchorEl(null);
  };

  return (
    <div>
      <Button
        id="login-button"
        aria-controls={open ? "login-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={onpointerdown ? "true" : undefined}
        onClick={handleClick}
        className="nav-button"
        variant={variant}
      >
        {buttonText}
      </Button>
      <Menu
        id="login-menu"
        className="drop-down"
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "login-button",
        }}
      >
        {options.map(({ path, optionText }) => {
          return (
            <MenuItem
              key={optionText}
              onClick={handleClose}
              component={Link}
              to={path}
              className="nav-button"
            >
              {optionText}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
