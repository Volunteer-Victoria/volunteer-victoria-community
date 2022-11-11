import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AppBar } from "../AppBar";

export const MainLayout = () => {
  return (
    <>
      <AppBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
