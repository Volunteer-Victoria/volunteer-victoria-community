import { Box, Card, Divider, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import { OpportunityCreateDto, OpportunityResponseDto } from "../../api";
import { canManageOpportunity } from "../../common";
import { useApi } from "../../components/ApiProvider";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnableLayout } from "../../components/ReturnableLayout";
import { useUser } from "../../components/UserDataProvider/use-user";

export const EditOpportunityPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;
  const navigate = useNavigate();
  const api = useApi();
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  const canManage = canManageOpportunity(user, opportunity);

  if (!canManage) {
    return <Navigate to="/opportunities" />;
  }

  const onSubmit = async (updatedOpportunity: OpportunityCreateDto) => {
    setSubmitting(true);
    try {
      await api.opportunityControllerPutId({
        id: opportunity.opportunityId,
        opportunityCreateDto: updatedOpportunity,
      });

      enqueueSnackbar("Opportunity edited!", { variant: "success" });

      navigate(`/opportunity/${opportunity.opportunityId}`);
    } catch (e) {
      enqueueSnackbar("Error adding opportunity.  Try again later.", {
        variant: "error",
      });
      console.error(e);
      setSubmitting(false);
    }
  };

  return (
    <ReturnableLayout label="Cancel edit">
      <Box pb={4}>
        <Card>
          <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
            <Typography gutterBottom variant="h1">
              Edit an Opportunity
            </Typography>
            <Typography variant="subtitle1" component="span">
              All fields are required unless marked as 'optional'
            </Typography>
            <Divider sx={{ my: 3 }} />
            <EditableOpportunity
              onSubmit={onSubmit}
              opportunity={opportunity}
              submitting={submitting}
            />
          </Box>
        </Card>
      </Box>
    </ReturnableLayout>
  );
};
