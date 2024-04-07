import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { BASE_URL } from '../../config';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import CardActions from '@mui/joy/CardActions';

function Profile() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    getUser();
  }, []);

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <form>
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
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <Input size="sm" placeholder="First name"  value={data.fname}  onChange={e => setData(data => ({...data, fname: e.target.value}))}/>
              </Stack>
            </Stack>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" type="cancel">
                Cancel
              </Button>
              <Button size="sm" variant="solid" type="submit" >
                Save
              </Button>
            </CardActions>
          </Card> 
        </Stack>
      </form>
    </Box>
  );
}

export default Profile;