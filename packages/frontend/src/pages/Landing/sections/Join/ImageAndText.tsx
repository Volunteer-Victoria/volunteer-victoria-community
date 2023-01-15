import { Box, Grid, Typography } from "@mui/material";

type ImageAndTextProps = React.PropsWithChildren<{
  img: string;
  alt: string;
  title: string;
  reverse?: boolean;
}>;

export const ImageAndText = ({
  img,
  alt,
  title,
  children,
  reverse = false,
}: ImageAndTextProps) => {
  return (
    <Box>
      <Grid
        container
        direction={reverse ? { xs: "row", lg: "row-reverse" } : {}}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={img}
            alt={alt}
            sx={{
              height: { xs: 200, md: "auto" },
              display: "block",
              margin: "auto",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} my={{ xs: 3, md: 0 }}>
          <Typography variant="h2" mb={{ xs: 2, md: 5 }}>
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
