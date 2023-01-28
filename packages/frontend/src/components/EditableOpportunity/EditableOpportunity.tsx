import { useCallback, useMemo } from "react";
import { OpportunityCreateDto, OpportunityResponseDto } from "../../api";
import { FormData } from "./default-values";
import { EditableOpportunityForm } from "./EditableOpportunityForm";
import { formDataToOpportunity } from "./form-data-to-opportunity";
import { opportunityToFormData } from "./opportunity-to-form-data";

interface EditableOpportunityProps {
  opportunity?: OpportunityResponseDto;
  onSubmit: (opportunity: OpportunityCreateDto) => void;
  submitting: boolean;
}

export const EditableOpportunity = ({
  opportunity,
  onSubmit,
  submitting,
}: EditableOpportunityProps) => {
  const initialValues = useMemo(
    () => {
      return opportunity ? opportunityToFormData(opportunity) : {};
    },
    // We do not want the initial values recalculated
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const transformAndSubmit = useCallback(
    (data: FormData) => {
      const opp = formDataToOpportunity(data);
      onSubmit(opp);
    },
    [onSubmit]
  );

  return (
    <EditableOpportunityForm
      initialValues={initialValues}
      onSubmit={transformAndSubmit}
      submitting={submitting}
    />
  );
};
