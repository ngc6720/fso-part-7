import { MenuItem, Menu, MenuMenu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useUser, useAuth } from "/src/contexts/authContext";
import { useState } from "react";

const Header = () => {
  const path = window.location.pathname;
  const user = useUser();
  const auth = useAuth();

  const [ariaExpanded, setAriaExpanded] = useState(false);

  return (
    <header>
      <Button
        icon="bars"
        onClick={() => setAriaExpanded(!ariaExpanded)}
        id="toggle-header-menu"
        aria-controls="header-menu"
        aria-expanded={ariaExpanded}
        toggle
        active={ariaExpanded}
      ></Button>

      <Menu
        stackable
        secondary
        id="header-menu"
        className={ariaExpanded ? "expanded" : ""}
      >
        <MenuItem
          as={Link}
          to="/"
          name="upcomingEvents"
          active={path === "/"}
          onClick={() => setAriaExpanded(false)}
        >
          Blogs
        </MenuItem>

        <MenuItem
          as={Link}
          to="/users"
          name="reviews"
          active={path === "/users"}
          onClick={() => setAriaExpanded(false)}
        >
          Users
        </MenuItem>

        {user ? (
          <MenuMenu position="right">
            <MenuItem>
              <i aria-hidden="true" className="user circle outline icon"></i>
              logged in as : {user.name}
            </MenuItem>
            <MenuItem
              color="red"
              onClick={() => {
                setAriaExpanded(false);
                auth.logout();
              }}
            >
              Log Out
            </MenuItem>
          </MenuMenu>
        ) : (
          <MenuItem
            as={Link}
            to="/login"
            position="right"
            onClick={() => setAriaExpanded(false)}
          >
            Log in
          </MenuItem>
        )}
      </Menu>
    </header>
  );
};

export default Header;
