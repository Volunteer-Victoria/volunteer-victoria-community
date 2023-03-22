import { ThemeProvider } from "@mui/material";
import { AppBar } from "../../components/AppBar";
import { marketingTheme } from "../../themes";
import { AcknowedgementSection } from "./sections/Acknowedgement";
import { AttributionSection } from "./sections/Attribution";
import { BannerSection } from "./sections/Banner";
import { FooterSection } from "./sections/Footer";
import { HowToApplySection } from "./sections/HowToApply/HowToApply";
import { JoinSection } from "./sections/Join/Join";
import { LeadInSection } from "./sections/LeadIn";
import { QuerySection } from "./sections/Query/Query";

export const LandingPage = () => {
  return (
    <>
      <AppBar />
      <ThemeProvider theme={marketingTheme}>
        <BannerSection />
        <LeadInSection />
        <JoinSection />
        <HowToApplySection />
        <QuerySection />
        <AcknowedgementSection />
        <AttributionSection />
        <FooterSection />
      </ThemeProvider>
    </>
  );
};
