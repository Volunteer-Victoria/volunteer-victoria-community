import { Box, Button, CircularProgress } from "@mui/material";

interface SubmitButtonProps {
  buttonLabel: string;
  submitting: boolean;
}

export function SubmitButton({ buttonLabel, submitting }: SubmitButtonProps) {
  return (
    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" type="submit" disabled={submitting}>
        {buttonLabel}
        {submitting && (
          <CircularProgress
            sx={{
              ml: 2,
            }}
            size={18}
            color="inherit"
          />
        )}
      </Button>
    </Box>
  );
}
