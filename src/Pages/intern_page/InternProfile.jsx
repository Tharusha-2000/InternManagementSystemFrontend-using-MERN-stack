import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Adminsidebar from "../../components/common/AdminSidebar";
import Managersidebar from "../../components/common/Managersidebar";
import Mentorsidebar from "../../components/common/Mentorsidebar";
import Evaluatorsidebar from "../../components/common/Evaluatorsidebar";
import Internsidebar from "../../components/common/Internsidebar";
import Header from "../../components/common/Header";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import axios from 'axios';


export default function Profile() {
  const [role, setRole] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  const getSidebar = () => {
    switch (role) {
      case "admin":
        return <Adminsidebar />;
      case "mentor":
        return <Mentorsidebar />;
      case "evaluator":
        return <Evaluatorsidebar />;
      case "manager":
        return <Managersidebar />;
      case "intern":
          return <Internsidebar />;
      default:
        return null;
    }
  };


return (
  <>
  
  <Header />
  <Box height={60} />
      <Box sx={{ display: "flex" }}>  
    {getSidebar()}
    <Box sx={{ flex: 1, width: '100%' }}>
     
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                sx={{
                  bgcolor: 'background.body',
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  left: 100,
                  top: 170,
                  boxShadow: 'sm',
                }}
              >
                <EditRoundedIcon />
              </IconButton>
     
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                </FormControl>
            </Stack>

            <Stack direction="row" spacing={2}>
            <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input size="sm" type="date" sx={{ flexGrow: 1 }} />
                  </FormControl>
                  <FormControl sx={{ display: { sm: "contents" } }}>
                    <FormLabel>Gender</FormLabel>
                    <Input
                      size="sm"
                      value={data.gender}
                      type="text"
                      //onChange={e => setData({ ...data, gender: e.target.value })}
                      fullWidth
                    />
                  </FormControl>
                  </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Phone Number</FormLabel>
                  <Input size="sm" defaultValue="" />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    defaultValue=""
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
                </Stack>
                </Stack>
                </Stack>
         
          </Card>

        <Card>
        <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Other info</Typography>
        </Box>
        <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
            
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
            </Stack>

            <Stack spacing={1}>
            <FormLabel>University Name</FormLabel>
            <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
            <Input size="sm" placeholder="University Name" />
            </FormControl>
            </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>GPA</FormLabel>
                  <Input size="sm" defaultValue="" placeholder="GPA"/>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm" defaultValue="" placeholder="Role"/>
                </FormControl>
                </Stack>

                <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Interview Score</FormLabel>
                  <Input size="sm" defaultValue="" placeholder="Interview Score"/>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Interview FeedBack</FormLabel>
                  <Input size="sm" defaultValue="" placeholder="Interview FeedBack" />
                </FormControl>
                </Stack>

                <Stack spacing={1}>
                <FormLabel>Mentor Name</FormLabel>
                <FormControl
                  sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                >
                  <Input size="sm" placeholder="Mentor Name" />
                  </FormControl>
              </Stack>
 
              </Stack>
              </Stack>
        </Card>

        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
              Write a short introduction to be displayed on your profile
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>

            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue="" placeholder="Description"
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button variant="outlined" sx={{ borderColor: 'blue', textTransform: 'uppercase' }}>
                Cancel
           </Button>
           <Button variant="solid" sx={{ borderColor: 'blue', textTransform: 'uppercase' }}>
             Save
           </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
    </Box>
    </> 
  );
}


