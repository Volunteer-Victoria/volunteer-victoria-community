import { Box, Card, Divider, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { OpportunityCreateDto, OpportunityResponseDto } from "../../api";
import { useApi } from "../../components/ApiProvider";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnableLayout } from "../../components/ReturnableLayout";

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
    <ReturnableLayout label="Cancel edit">
      <Box pb={4}>
        <Card>
          <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
            <Typography gutterBottom variant="h1">
              Edit an Opportunity
            </Typography>
            <Typography variant="subtitle1">
              All fields are required unless marked as 'optional'
            </Typography>
            <Divider sx={{ my: 3 }} />
            <EditableOpportunity
              onSubmit={onSubmit}
              opportunity={opportunity}
            />
          </Box>
        </Card>
      </Box>
    </ReturnableLayout>
  );
};
