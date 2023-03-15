import { Box, Card, Container, Divider, Typography, Link } from "@mui/material";
import { ReturnableLayout } from "../../components/ReturnableLayout";

export const TermsAndConditionsPage = () => {
  return (
    <Container maxWidth="md">
      <ReturnableLayout label="Back">
        <Box pb={4}>
          <Card>
            <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
              <Typography variant="h1" gutterBottom>
                Terms & Conditions
              </Typography>
              <Typography variant="subtitle1">
                Learn more about the terms of service of our platform
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h2" pb={3}>
                Welcome to Volunteer Victoria’s Community Volunteering Platform
              </Typography>
              <Card variant="outlined">
                <Box px={2}>
                  <Typography variant="body1" component="div">
                    <p>
                      Individuals and groups can post requests to find
                      volunteers to help with a one-time activity or short-term
                      project, such as decorating a home for the holidays,
                      painting a shed, or helping with an event. Positions
                      cannot include activities that include personal care or
                      child-care, or require complex or long-term help.
                    </p>

                    <p>
                      Individuals, groups, or organizations can post volunteer
                      positions or “volunteers needed postings” for free.
                      Potential volunteers read the posts and respond directly
                      to the person or group who posted the position.
                    </p>

                    <p>
                      Individuals with specific talents or skills can also post
                      activities that they would like to share with members of
                      the community – such as “I am available to teach each
                      others how to knit” or “I like to organize spaces.”
                      Activities can be one-time or short-term.
                    </p>

                    <p>Volunteer Victoria’s community matching platform:</p>

                    <ul>
                      <li>
                        Will not take requests for volunteers that compromise
                        the health, safety or well being of volunteers or the
                        community.
                      </li>
                      <li>
                        Will not take requests for volunteers for partisan
                        political parties.
                      </li>
                      <li>
                        Reserves the right, at any time, to refuse a request for
                        volunteers.
                      </li>
                    </ul>

                    <p>
                      Personal information will not be shared through the
                      platform. When a volunteer responds to a request for help,
                      the person who posted the position will be able to contact
                      the volunteer using the information provided by the
                      volunteer – normally a phone number or email address. The
                      person and the volunteer will make sure that the volunteer
                      is a good fit for the role. If the person and the
                      volunteer agree to move forward they will:
                    </p>

                    <ul>
                      <li>
                        Decide together on a day, time, and location for the
                        activity to take place.
                      </li>
                      <li>Share basic contact information.</li>
                      <li>
                        Discuss any materials or tools that the volunteer needs
                        to bring to an activity – such aswork boots, sun screen,
                        or a mask
                      </li>
                    </ul>
                    <strong>Important Safety Information</strong>
                    <p>
                      Volunteer Victoria does not assess the people who post
                      positions or the volunteers who respond to postings. We do
                      not assess for safety or security purposes or ensure that
                      the volunteer is the right fit for the volunteer position.
                      We ask all participants on the platform to:
                    </p>

                    <ul>
                      <li>Never give out any financial details</li>
                      <li>
                        Never pay a volunteer. If a volunteer asks for a payment
                        please report them to Volunteer Victoria
                      </li>
                      <li>
                        Share contact information such as email, telephone, or
                        address after you have discussed the volunteer position
                        and feel that it feels safe to proceed.
                      </li>
                      <li>
                        Stay Alert. If you encounter anyone on the platform who
                        does not behave in a way thatis respectful and ethical
                        please contact Volunteer Victoria.
                      </li>
                    </ul>

                    <p>
                      As Volunteer Victoria does not assess the volunteers or
                      the people making requests through this system we
                      recommend that users think about personal safety and
                      minimize potential risks. Whenever possible meet new
                      people in a public space, and if this is not possible,
                      invite a friend or family member to be present when
                      someone new is visiting a home. If a volunteer or a person
                      making a request asks for money, payments, or banking
                      details do not give it to them either in person, via
                      telephone, or in an email. Report the request to Volunteer
                      Victoria.
                    </p>
                    <p>
                      If you need help finding a long-term volunteer for
                      yourself or another person please contact Volunteer
                      Victoria at{" "}
                      <Link href="tel:2503862269">250.386.2269</Link> and we can
                      help direct you to an organization in your community that
                      assesses and trains volunteers to work with vulnerable
                      populations.
                    </p>
                    <p>
                      Never respond or click on suspicious links and
                      attachments. Just by clicking on the link could open the
                      door to malware and disclosure of your personal or
                      financial information
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
