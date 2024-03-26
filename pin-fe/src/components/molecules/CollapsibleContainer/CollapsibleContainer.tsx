import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ICollapsible } from "../../../interface";

const CollapsibleContainer = ({ title, children }: ICollapsible) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingTop: 0 }}>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CollapsibleContainer;
