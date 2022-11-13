import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBar } from "../AppBar";

export const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Container
        sx={{
          py: 3,
        }}
      >
        <Outlet />
      </Container>
    </>
  );
};
