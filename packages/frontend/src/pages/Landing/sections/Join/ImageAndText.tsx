import { Box, Stack, Typography } from "@mui/material";

type ImageAndTextProps = React.PropsWithChildren<{
  img: string;
  alt: string;
  title: string;
  action: React.ReactNode;
}>;

export const ImageAndText = ({
  img,
  alt,
  title,
  children,
  action,
}: ImageAndTextProps) => {
  return (
    <Box sx={{ textAlign: "center", height: "100%" }}>
      <Stack spacing={{ xs: 1.5, md: 6 }} sx={{ height: "100%" }}>
        <Box
          component="img"
          src={img}
          alt={alt}
          sx={{
            height: { xs: 130, md: 220 },
          }}
        />
        <Typography variant="h3" mb={{ xs: 2, md: 5 }}>
          {title}
        </Typography>
        <Box>{children}</Box>
        <Box>{action}</Box>
      </Stack>
    </Box>
  );
};
