import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Adminsidebar from "./AdminSidebar";
import Managersidebar from "./Managersidebar";
import Mentorsidebar from "./Mentorsidebar";
import Evaluatorsidebar from "./Evaluatorsidebar";
import Header from "./Header";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import { FormControl, FormLabel, Select, MenuItem } from "@mui/joy";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import axios from "axios";
import { BASE_URL } from "../../config";

export default function Profile() {
  const [role, setRole] = useState("");
  const [data, setData] = useState({
    fname: "",
    lname: "",
    dob: "",
    role: "",
    gender: "",
    email: "",
    jobtitle: '',
    department: '',
    employmentType: ''
  });
  const [originalData, setOriginalData] = useState({});
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
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
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
                  <Input size="sm" placeholder="First name"    />
                  <Input size="sm" placeholder="Last name" sx={{ flexGrow: 1 }} />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input size="sm"  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
             
              <div>
              <Stack direction="row" spacing={2}>
                  <FormControl sx={{ width: '175px'}}>
                      <FormLabel>Gender</FormLabel>
                       <Select size="sm">
                         <Option value="male"> Male </Option>
                         <Option value="female"> Female </Option>
                       </Select>
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Date of Birth</FormLabel>
                      <Input size="sm" type="date" sx={{ flexGrow: 1 }} />
                  </FormControl>
                </Stack>
              </div>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: 'flex', md: 'none' }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
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
                    left: 85,
                    top: 180,
                    boxShadow: 'sm',
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: 'flex-column',
                      md: 'flex-row',
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" value=" " />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                

                sx={{ flexGrow: 1 }}
              />
            </FormControl>
           
            <div>
              <FormControl sx={{ display: { sm: 'contents' } }}>
                <FormLabel>Gender</FormLabel>
                <Select
                  size="sm"
                >
                  <Option value="male"> Male </Option>
                  <Option value="female"> Female </Option>
                </Select>
              </FormControl>

              <FormControl>

              <FormLabel>Date of Birth</FormLabel>
              <Input size="sm" type="date" sx={{ flexGrow: 1 }} />
             </FormControl>
             
            </div>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">job details</Typography>
          </Box>
          <Divider />
          <div>
                    <Stack direction="row" spacing={2}>
                      <FormControl sx={{ flexGrow: 1 }}>
                     
                        <FormLabel>Job title</FormLabel>
                        <Input
                      size="sm"
                      value={data.jobtitle}
                      type="text"
                      onChange={e => setData({ ...data, jobtitle: e.target.value })}
                      fullWidth
                  
                    />
                      </FormControl>
                      <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Department</FormLabel>
                        <Input
                          size="sm"
                          value={data.department}
                          onChange={e => setData({ ...data, department: e.target.value })}
                          type="text"
                          fullWidth
                       
                        />
                      </FormControl>
                    </Stack>
                  </div>

           <FormControl sx={{ display: { sm: "contents" } }}>
                    <FormLabel>employmentType</FormLabel>
                    <Input
                      size="sm"
                      value={data.employmentType}
                      type="text"
                      onChange={e => setData({ ...data, employmentType: e.target.value })}
                      fullWidth
                  
                    />
           </FormControl>

          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" variant="solid" type="submit">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
          </Stack>
            
        </Box>
        </form>
      </Box>
    </>
  );
}
