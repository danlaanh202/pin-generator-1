import { GenerateContext } from "../contexts/GenerateContext";
import DrawerContainer from "../components/organisms/Generate/DrawerContainer";
import GenerateContent from "../components/organisms/Generate/GenerateContent";
import testData from "../components/organisms/Template/testData.json";
import WithMarginTop from "../components/molecules/WithMarginTop";
import { Box } from "@mui/material";
import useTemplateInput from "../hooks/useTemplateInput";


const Generate = () => {
  const {input, handleChangeComponentSetting} = useTemplateInput(testData)

  return (
    <GenerateContext.Provider value={{input, handleChangeComponentSetting}}>
      <DrawerContainer />
      <WithMarginTop>
        <Box sx={{paddingInlineStart: "30px", paddingBlock: "30px"}}>
          <Box sx={{display: "flex", flexGrow: "1"}}>
            <Box sx={{width: "100%", height: "100%", flex: "1 1 auto"}}>
              <div>
                <GenerateContent /> 
              </div>           
            </Box>
          </Box>
        </Box>
      </WithMarginTop>
    </GenerateContext.Provider>
  );
};

export default Generate;
