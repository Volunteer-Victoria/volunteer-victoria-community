import { Box, Card, Container, Divider, Typography } from "@mui/material";
import { ReturnableLayout } from "../../components/ReturnableLayout";

export const PrivacyPolicyPage = () => {
  return (
    <Container maxWidth="md">
      <ReturnableLayout label="Back">
        <Box pb={4}>
          <Card>
            <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
              <Typography variant="h1" gutterBottom>
                Privacy Policy
              </Typography>
              <Typography variant="subtitle1">
                Learn more about why and how we collect your data
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h2" pb={3}>
                This Privacy Policy explains how Volunteer Victoria collects,
                uses, and discloses information about you within the “Community”
                App. 
              </Typography>
              <Card variant="outlined">
                <Box p={2}>
                  <Typography variant="body1" component="div">
                    <strong>
                      Information we collect, and why we collect it
                    </strong>

                    <p>When anonymously accessing the app we collect:</p>

                    <ul>
                      <li>
                        Device information, including browser type and IP
                        address. This is collected in case of a security
                        incident and in the normal course of business will be
                        deleted after 30 days. This information may be retained
                        for longer than 30 days if there is an investigation
                        into a security incident.
                      </li>
                    </ul>

                    <p>
                      When logging into the app, through social log-in (e.g.
                      Google) or otherwise, we collect:
                    </p>

                    <ul>
                      <li>
                        Email address. This is collected to enable application
                        features, such as user messaging. This information is
                        only retained when explicitly used within a feature of
                        the application, such as creating an opportunity, or
                        sending a message to a user.
                      </li>
                      <li>
                        Name. This is collected to enable application features,
                        such as auto-complete for forms requiring a name. This
                        information is only retained when explicitly used within
                        a feature of the application, such as creating an
                        opportunity, or sending a message to a user.
                      </li>
                    </ul>

                    <strong>Information we share</strong>

                    <p>
                      Collected information will never be shared with a
                      third-party, or another user of the application, unless
                      done so explicitly by the user, such as posting an
                      opportunity with your name publicly displayed.
                    </p>
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Card>
        </Box>
      </ReturnableLayout>
    </Container>
  );
};
