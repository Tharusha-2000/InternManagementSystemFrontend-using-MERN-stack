import { Box, Typography,IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { tokens } from "./theme";
import CountCircle from "./CountCircle";

const CountBox = ({ title, subtitle, icon, progress, increase }) => {
  const colors = tokens;

  return (
    <Box width="100%" m="0 5px" position="relative"> 
    <IconButton 
      aria-label="settings"
      sx={{ 
        position: 'absolute', 
        top: 0, 
        right: 0 
      }} 
    >
      <MoreVertIcon />
    </IconButton>
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
      <Box display="flex" justifyContent="space-between" mt="1px">
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