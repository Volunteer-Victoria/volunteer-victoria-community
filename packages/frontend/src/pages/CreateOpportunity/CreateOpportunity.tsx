import { Box, Card, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { OpportunityCreateDto } from "../../api";
import { useApi } from "../../components/ApiProvider";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnableLayout } from "../../components/ReturnableLayout";

export const CreateOpportunityPage = () => {
  const navigate = useNavigate();
  const api = useApi();

  const onSubmit = async (opportunity: OpportunityCreateDto) => {
    await api.opportunityControllerPost({
      opportunityCreateDto: opportunity,
    });

    navigate("/opportunities");
  };

  return (
    <ReturnableLayout>
      <Box pb={4}>
        <Card>
          <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
            <Typography variant="h1" gutterBottom>
              Post an Opportunity
            </Typography>
            <Typography variant="subtitle1">
              All fields are required unless marked as 'optional'
            </Typography>
            <Divider sx={{ my: 3 }} />
            <EditableOpportunity onSubmit={onSubmit} />
          </Box>
        </Card>
      </Box>
    </ReturnableLayout>
  );
};
