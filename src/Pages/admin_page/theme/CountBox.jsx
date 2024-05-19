import { Box, Typography } from "@mui/material";
import { tokens } from "./theme";
import CountCircle from "./CountCircle";

const CountBox = ({ title, subtitle, icon, progress, increase }) => {
  const colors = tokens;

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ color: colors.primary[900] }}
          >
            {subtitle}
          </Typography>
        </Box>
        <Box>
          <CountCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: colors.greenAccent[600] }}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[800] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountBox;