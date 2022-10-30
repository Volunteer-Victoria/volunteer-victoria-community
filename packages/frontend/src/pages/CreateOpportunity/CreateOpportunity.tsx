import { Box, Button, Card, Typography } from "@mui/material";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { ReturnLink } from "../../components/ReturnLink";

export const CreateOpportunityPage = () => {
  const onClick = () => {
    console.log("Created");
  };
  return (
    <ConstrainedLayout>
      <Box pt={3} pb={2.5}>
        <ReturnLink to="../opportunities">Back to all opportunities</ReturnLink>
      </Box>
      <Card>
        <Box p={4}>
          <Typography variant="h1">Post an Opportunity</Typography>
          <Typography variant="subtitle1">
            All fields are required unless marked as 'optional'
          </Typography>
          <hr />
          <Button variant="contained" onClick={onClick}>
            Post
          </Button>
        </Box>
      </Card>
    </ConstrainedLayout>
  );
};
