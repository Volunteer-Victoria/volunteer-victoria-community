import { Box, Card, Divider, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { OpportunityCreateDto, OpportunityResponseDto } from "../../api";
import { useApi } from "../../components/ApiProvider";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnLink } from "../../components/ReturnLink";

export const EditOpportunityPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;
  const navigate = useNavigate();
  const api = useApi();

  const onSubmit = async (updatedOpportunity: OpportunityCreateDto) => {
    await api.opportunityControllerPutId({
      id: opportunity.opportunityId,
      opportunityCreateDto: updatedOpportunity,
    });

    navigate("/opportunities");
  };

  return (
    <ConstrainedLayout>
      <Box pt={3} pb={2.5}>
        <ReturnLink to="../opportunities">Cancel edit</ReturnLink>
      </Box>
      <Box pb={4}>
        <Card>
          <Box p={5}>
            <Typography variant="h1">Edit an Opportunity</Typography>
            <Box py={1}>
              <Typography variant="subtitle1">
                All fields are required unless marked as 'optional'
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <EditableOpportunity
              onSubmit={onSubmit}
              opportunity={opportunity}
            />
          </Box>
        </Card>
      </Box>
    </ConstrainedLayout>
  );
};
