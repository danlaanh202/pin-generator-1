import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContext } from "../../contexts/DrawerContext";
import { IDrawerContextValue } from "../../interface";
import { DRAWER_WIDTH } from "../../const";

const pages = ["Generate", "Schedule", "Pricing"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function TopBar() {
  const { showDrawer, handleShowDrawer, hasDrawer } =
    React.useContext<IDrawerContextValue>(DrawerContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        ...(!showDrawer
          ? {
              transition:
                "margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            }
          : {
              width: `calc(100% - ${DRAWER_WIDTH}px)`,
              marginLeft: `${DRAWER_WIDTH}px`,
              transition: `transition: margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
            }),
      }}
    >
      <Toolbar>
        {hasDrawer && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleShowDrawer}
            edge="start"
            sx={{ mr: 2, ...(showDrawer && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              href={`/${page.toLowerCase()}`}
              sx={{ color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
