import {
  Box,
  Card,
  Typography,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { mapFormik } from "../../common";
import { useApi } from "../../components/ApiProvider";
import { RequireAuth } from "../../components/RequireAuth";
import { ReturnableLayout } from "../../components/ReturnableLayout";
import { useUser } from "../../components/UserDataProvider/use-user";
import { Guidelines } from "./Guidelines";
import { GuidelinesCheckbox } from "./GuidelinesCheckbox";
import { createDefaultMessageTemplate } from "./message-template";
import { Note } from "./Note";
import { schema } from "./schema";
import { SubmitButton } from "./SubmitButton";
import { Title } from "./Title";

export const ExpressInterestPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;
  const api = useApi();
  const user = useUser();
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async ({
    name,
    message,
  }: {
    name: string;
    message: string;
  }) => {
    setSubmitting(true);
    try {
      await api.messageControllerPost({
        opportunityId: opportunity.opportunityId,
        threadStartDto: {
          applicantName: name,
          message,
        },
      });

      enqueueSnackbar("Message sent!", { variant: "success" });

      navigate(`/opportunity/${opportunity.opportunityId}`);
    } catch (e) {
      enqueueSnackbar("Error sending message.  Try again later.", {
        variant: "error",
      });
      console.error(e);
      setSubmitting(false);
    }
  };

  const formik = useFormik<{
    name: string;
    message: string;
    guidelines: boolean;
  }>({
    initialValues: {
      name: user.data?.name ?? "",
      message: createDefaultMessageTemplate(opportunity),
      guidelines: false,
    },
    validationSchema: schema,
    onSubmit,
  });

  const buttonLabel = useMemo(() => {
    if (submitting) {
      return "Applying...";
    }
    return "Apply";
  }, [submitting]);

  return (
    <RequireAuth>
      <ReturnableLayout>
        <Box pb={4} component="form" onSubmit={formik.handleSubmit}>
          <Card>
            <Box px={{ xs: 3, lg: 4 }} py={3}>
              <Title opportunity={opportunity}></Title>
              <Divider sx={{ my: 3 }} />
              <Stack spacing={3}>
                <Typography variant="h2">Share your details</Typography>
                <TextField label="Full name" {...mapFormik(formik, "name")} />
                <TextField
                  multiline
                  rows={9}
                  label="Message"
                  {...mapFormik(formik, "message")}
                />
                <Note />
                <Guidelines />

                <Stack spacing={0}>
                  <GuidelinesCheckbox
                    touched={formik.touched.guidelines}
                    errors={formik.errors.guidelines}
                    guidelines={formik.values.guidelines}
                    handleChange={formik.handleChange}
                  ></GuidelinesCheckbox>
                </Stack>
              </Stack>
              <SubmitButton
                submitting={submitting}
                buttonLabel={buttonLabel}
              ></SubmitButton>
            </Box>
          </Card>
        </Box>
      </ReturnableLayout>
    </RequireAuth>
  );
};
