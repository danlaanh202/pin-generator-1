import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SaveIcon from "@mui/icons-material/Save";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  useTheme,
} from "@mui/material";

import { DRAWER_WIDTH } from "../../../const";
import CollapsibleContainer from "../../molecules/CollapsibleContainer";
import { DrawerContext } from "../../../contexts/DrawerContext";
import { IDrawerContextValue } from "../../../interface";
import { commonColors } from "../../../const/color";
import SingleColorPicker from "../../atoms/SingleColorPicker";
import useFetchApi from "../../../hooks/api/useFetchApi";

const DrawerContainer = () => {
  const { showDrawer, handleCloseDrawer } =
    useContext<IDrawerContextValue>(DrawerContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState<String>(commonColors[0]);
  const handlePickColor = (value: String) => setColor(value);
  const theme = useTheme();

  // const { data } = useFetchApi({
  //   url: "http://localhost:5000/pinterest/common?url=https://willtiptop.com",
  // });


  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={!!showDrawer}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(0, 1),
          ...theme.mixins.toolbar,
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          sx={{ marginBlock: "8px", borderRadius: "0" }}
          size="large"
          onClick={() => handleCloseDrawer()}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
          <Typography>Hide</Typography>
        </IconButton>
      </div>
      <Divider />
      <Box
        component="div"
        marginBlock={1}
        paddingInline={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Box component="form">
          <TextField
            fullWidth
            label="Enter any URL or sitemap URL..."
            id="fullWidth"
            focused
            variant="filled"
            sx={{ borderRadius: "5px" }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1">Number of pins to generate</Typography>
          <TextField
            type="number"
            focused
            variant="filled"
            size="small"
            sx={{
              padding: 0,
              borderRadius: "5px",
              "& .MuiFilledInput-input": {
                width: "75px",
                padding: "8px 4px",
              },
            }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" color="primary" sx={{ width: "60%" }}>
            GENERATE PINS
          </Button>
          <Button variant="contained" color="secondary" sx={{ width: "35%" }}>
            SHUFFLE
          </Button>
        </Box>
        <Button variant="contained" color="primary">
          SCHEDULE ALL PINS
        </Button>
        <Autocomplete
          id="asynchronous-autocomplete"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          options={[{ value: "1", label: "hehe" }]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select boards to pin to"
              variant="filled"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
      <CollapsibleContainer title="Colors and Font">
        <div className="Pin-ColorContainer__Wrapper">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Colors</Typography>
            {commonColors.slice(0, 5).map((x) => (
              <SingleColorPicker
                key={x}
                handlePick={handlePickColor}
                initialColor={x}
                selectedColor={color}
              />
            ))}
          </Box>
        </div>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Use all colors" />
          <FormControlLabel
            control={<Checkbox />}
            label="Fix low contrast text"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Activate font overrides below"
          />
        </FormGroup>
      </CollapsibleContainer>
      <Divider />
      <CollapsibleContainer title="Templates">
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Randomize" />
          <FormControlLabel
            disabled
            control={<Checkbox />}
            label="Use one of each selected template"
          />
        </FormGroup>
      </CollapsibleContainer>
      <Divider />
      <CollapsibleContainer title="Images">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Randomize Images" />
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Use one of each image"
            />
            <FormControlLabel
              disabled
              control={<Checkbox />}
              label="Show full image in available space"
            />
          </FormGroup>
          <Button variant="contained" color="primary">
            UPLOAD IMAGES
          </Button>
        </Box>
      </CollapsibleContainer>
      <Divider />
      <CollapsibleContainer title="AI Options">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Button variant="contained" color="primary">
            REWRITE ALL TITLES
          </Button>
          <Button variant="contained" color="primary">
            REWRITE ALL DESCRIPTIONS
          </Button>
          <TextField
            id="outlined-basic"
            select
            label="AI language"
            variant="outlined"
          >
            <MenuItem value="hehe">hehe</MenuItem>
          </TextField>
          <TextField id="outlined-basic" label="AI Tone" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="AI Keyword"
            variant="outlined"
            value="Neutral"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Generate alt text with AI"
          />
        </Box>
      </CollapsibleContainer>
      <Divider />
      <CollapsibleContainer title="Bulk Settings">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Set all titles"
            InputProps={{ endAdornment: <SaveIcon color="disabled" /> }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Set all descriptions"
            InputProps={{ endAdornment: <SaveIcon color="disabled" /> }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Set all outbound links"
            InputProps={{ endAdornment: <SaveIcon color="disabled" /> }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Set all URL Text"
            InputProps={{ endAdornment: <SaveIcon color="disabled" /> }}
          />
        </Box>
      </CollapsibleContainer>
    </Drawer>
  );
};

export default DrawerContainer;
