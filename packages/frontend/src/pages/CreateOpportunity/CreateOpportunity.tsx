import { Box, Card, Divider, Typography } from "@mui/material";
import { OpportunityResponseDto } from "../../api";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { EditableOpportunity } from "../../components/EditableOpportunity/EditableOpportunity";
import { ReturnLink } from "../../components/ReturnLink";

export const CreateOpportunityPage = () => {
  const sampleOpp: OpportunityResponseDto = {
    opportunityId: "123",
    postedTime: 0,
    postedByUserId: "456",
    title: "Title",
    contactName: "Contact name",
    requiredPeopleCount: 4,
    startTime: 599648400000,
    endTime: 599655600000,
    description: "Description",
    locationName: "Location name",
    indoorsOrOutdoors: "outdoors",
    contactEmail: "foo@bar.com",
    contactPhone: "1234567891",
    criminalRecordCheckRequired: true,
    idealVolunteer: "ideal volunteer",
    additionalInformation: "",
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
            <EditableOpportunity
              opportunity={sampleOpp}
              onSubmit={(opp) => console.log(opp)}
            />
          </Box>
        </Card>
      </Box>
    </ConstrainedLayout>
  );
};
