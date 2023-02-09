/* IMPORTS */
import React, { useEffect, useState } from "react";

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
import { useRouter } from "next/router";

/* TYPES */
interface PropsType {
  children: ReactJSXElement | ReactJSXElement[];
}

const MobileProtectedLayout = ({ children }: PropsType) => {
  /* STATE */
  const [value, setValue] = useState<number>();

  /* HOOKS */
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;

    switch (path) {
      case "/user":
        setValue(0);
        break;
      case "/user/favouriteRoutines":
        setValue(1);
        break;
      case "/user/latestRoutines":
        setValue(2);
        break;
      case "/user/trendingRoutines":
        setValue(3);
        break;
      case "/user/searchRoutines":
        setValue(4);
        break;
    }
  }, []);

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

                console.log(newValue);
                switch (newValue) {
                  case 0:
                    router.replace("/user");
                    break;
                  case 1:
                    router.replace("/user/favouriteRoutines");
                    break;
                  case 2:
                    router.replace("/user/latestRoutines");
                    break;
                  case 3:
                    router.replace("/user/trendingRoutines");
                    break;
                  case 4:
                    router.replace("/user/searchRoutines");
                    break;
                }
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
