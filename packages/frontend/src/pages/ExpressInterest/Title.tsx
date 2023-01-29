import { Box, Typography } from "@mui/material";
import { OpportunityResponseDto } from "../../api";

interface TitleProps {
  opportunity: OpportunityResponseDto;
}

export function Title({ opportunity }: TitleProps) {
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        {opportunity.title}
      </Typography>
      {opportunity.contactName && (
        <Typography>for {opportunity.contactName}</Typography>
      )}
    </Box>
  );
}
