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
        <Grid item xs={12} lg={6}>
          <img src={img} alt={alt} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h2" mb={5}>
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
