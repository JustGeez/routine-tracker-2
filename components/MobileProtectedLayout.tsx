/* IMPORTS */
import React, { useState } from "react";

import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useSession } from "next-auth/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

/* TYPES */
interface PropsType {
  children: ReactJSXElement | ReactJSXElement[];
}

const MobileProtectedLayout = ({ children }: PropsType) => {
  /* STATE */
  const [value, setValue] = useState();

  /* HOOKS */
  const { data: session } = useSession();

  /* COMPONENT FUNCTIONS */

  /* JSX */
  return (
    <Container sx={{ padding: { xs: 1.5, sm: 2 } }}>
      {session ? (
        <>
          {children}
          <Paper
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="My Routine"
                icon={<SettingsAccessibilityIcon />}
              />
              <BottomNavigationAction
                label="Favorites"
                icon={<FavoriteIcon />}
              />
              <BottomNavigationAction label="Latest" icon={<ArchiveIcon />} />
              <BottomNavigationAction label="Trending" icon={<ArchiveIcon />} />
              <BottomNavigationAction label="Search" icon={<ArchiveIcon />} />
            </BottomNavigation>
          </Paper>
        </>
      ) : (
        <Paper>
          <Typography variant="h2">Restricted: Sign-in to access</Typography>
        </Paper>
      )}
    </Container>
  );
};

/* EXPORTS */
export default MobileProtectedLayout;
