import { CircularProgress, IconButton } from "@mui/material";
import { Link, useMatch, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { OpportunityResponseDto } from "../../api";
import { canManageOpportunity } from "../../common";
import { useApi } from "../ApiProvider";
import { useUser } from "../UserDataProvider/use-user";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface ManageOpportunityProps {
  opportunity: OpportunityResponseDto;
}

export const ManageOpportunity = ({ opportunity }: ManageOpportunityProps) => {
  const api = useApi();
  const user = useUser();
  const navigate = useNavigate();
  const isOpportunityList = useMatch("/opportunities");
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  if (!user) return null;

  const onDelete = async () => {
    const confirmation = window.confirm(
      "Do you want to delete this opportunity?"
    );
    if (!confirmation) return;

    setSubmitting(true);
    try {
      await api.opportunityControllerDeleteId({
        id: opportunity.opportunityId,
      });
      // TODO - once we are tracking opps in state, we should show this to make it nice
      // enqueueSnackbar("Opportunity deleted!", {
      //   variant: "success",
      // });
      // setSubmitting(false);
    } catch (e) {
      enqueueSnackbar("Error deleting opportunity.  Try again later.", {
        variant: "error",
      });
      setSubmitting(false);
      return;
    }

    // TODO - refactor once we are tracking opps in state - no reason to reload
    if (isOpportunityList) {
      window.location.reload();
    } else {
      navigate("/opportunities", {});
    }
  };

  const canManage = canManageOpportunity(user, opportunity);

  if (!canManage) return null;

  return (
    <>
      <IconButton
        aria-label="Edit this opportunity"
        color="primary"
        component={Link}
        to={`/opportunity/${opportunity.opportunityId}/edit`}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="Delete this opportunity"
        color="primary"
        onClick={onDelete}
        disabled={submitting}
      >
        {submitting && <CircularProgress size={18} color="inherit" />}
        {!submitting && <DeleteIcon />}
      </IconButton>
    </>
  );
};
