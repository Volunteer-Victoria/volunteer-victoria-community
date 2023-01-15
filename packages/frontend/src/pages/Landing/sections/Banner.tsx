import {
  Box,
  ImageList,
  ImageListItem,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LandingBannerWriting from "../../../assets/landing-banner-writing.png";
import LandingBannerPlanting from "../../../assets/landing-banner-planting.png";
import LandingBannerWalking from "../../../assets/landing-banner-walking.png";
import { Container } from "@mui/system";

interface DescribedImage {
  img: string;
  title: string;
}
const BANNER_IMAGES: DescribedImage[] = [
  {
    img: LandingBannerWriting,
    title: "TODO title",
  },
  {
    img: LandingBannerPlanting,
    title: "TODO title",
  },
  {
    img: LandingBannerWalking,
    title: "TODO title",
  },
];

export const BannerSection = () => {
  const isMedium = useMediaQuery<Theme>((theme) => theme.breakpoints.up("md"));
  return (
    <>
      <ImageList
        cols={3}
        rowHeight={isMedium ? 517 : 150}
        gap={0}
        sx={{ overflow: "hidden", my: 0 }}
      >
        {BANNER_IMAGES.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box
        sx={{
          backgroundColor: "primary.main",
          pt: { xs: 2, md: 5 },
          pb: { xs: 2, md: 3 },
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          position: "relative",
        }}
      >
        <Container>
          <Typography variant="h1" color="white" textAlign="center">
            OUR COMMUNITY IS ONLY AS STRONG AS OUR VOLUNTEERS
          </Typography>
        </Container>
      </Box>
    </>
  );
};
