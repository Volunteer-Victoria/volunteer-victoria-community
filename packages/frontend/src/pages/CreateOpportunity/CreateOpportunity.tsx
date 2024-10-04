import { Box, Card, Divider, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OpportunityCreateDto, ResponseError } from "../../api";
import { useApi } from "../../components/ApiProvider";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnableLayout } from "../../components/ReturnableLayout";
import { isEmailUnverifiedError } from "../../common/api-error-handling";

export const CreateOpportunityPage = () => {
  const navigate = useNavigate();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (opportunity: OpportunityCreateDto) => {
    setSubmitting(true);
    try {
      const result = await api.opportunityControllerPost({
        opportunityCreateDto: opportunity,
      });
      enqueueSnackbar("Opportunity added!", { variant: "success" });
      navigate(`/opportunity/${result.opportunityId}/thanks`);
    } catch (e) {
      if (e instanceof ResponseError && (await isEmailUnverifiedError(e))) {
        enqueueSnackbar("Please verify your email address and try again.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error adding opportunity.  Try again later.", {
          variant: "error",
        });
      }
      console.error(e);
      setSubmitting(false);
    }
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
            <EditableOpportunity onSubmit={onSubmit} submitting={submitting} />
          </Box>
        </Card>
      </Box>
    </ReturnableLayout>
  );
};
