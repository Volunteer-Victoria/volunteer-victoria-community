import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { DefinitionItem } from "./DefinitionItem";

interface InterestDialogProps extends DialogProps {
  name: string;
  phoneNumber?: string;
  email?: string;
  onOk: () => void;
}

export const InterestDialog = ({
  onClose,
  onOk,
  open,
  name,
  phoneNumber,
  email,
}: InterestDialogProps) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>How to Apply</DialogTitle>
      <DialogContent>
        <Typography>To apply for this position, please contact:</Typography>
        <Stack component="dl" spacing={2}>
          <DefinitionItem title="Organizer" details={name} />
          <DefinitionItem title="Phone Number" details={phoneNumber ?? ""} />
          <DefinitionItem title="Email" details={email ?? ""} />
        </Stack>
        <Alert severity="info">
          Volunteer Victoria is not responsible for the contents of this post.
          Please ensure that the posting is legitimate and any liability
          concerns are discussed with the poster.
        </Alert>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button variant="contained" onClick={onOk}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
