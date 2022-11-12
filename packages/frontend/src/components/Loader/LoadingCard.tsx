import { Card, Box, Typography, CircularProgress } from "@mui/material";

export const LoadingCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
        p: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      <Box p={1} />
      <Typography variant="h2">Loading...</Typography>
    </Card>
  );
};
