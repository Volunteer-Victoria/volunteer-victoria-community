import { Box, Card, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OpportunityCreateDto } from "../../api";
import { getConfiguredApi } from "../../common";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnLink } from "../../components/ReturnLink";

export const CreateOpportunityPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (opportunity: OpportunityCreateDto) => {
    await getConfiguredApi().opportunityControllerPost({
      opportunityCreateDto: opportunity,
    });

    navigate("/opportunities");
  };

  return (
    <ConstrainedLayout>
      <Box pt={3} pb={2.5}>
        <ReturnLink to="../opportunities">Back to all opportunities</ReturnLink>
      </Box>
      <Box pb={4}>
        <Card>
          <Box p={5}>
            <Typography variant="h1">Post an Opportunity</Typography>
            <Box py={1}>
              <Typography variant="subtitle1">
                All fields are required unless marked as 'optional'
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <EditableOpportunity onSubmit={onSubmit} />
          </Box>
        </Card>
      </Box>
    </ConstrainedLayout>
  );
};
