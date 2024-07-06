import React from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import Chart from './test2';
import EmailForm from './test';

const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={3}>

        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">$24k</Typography>
              <Typography color="textSecondary">Budget</Typography>
              <Typography color="textSecondary">↑ 12% Since last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">1.6k</Typography>
              <Typography color="textSecondary">Total Customers</Typography>
              <Typography color="textSecondary">↓ 16% Since last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">75.5%</Typography>
              <Typography color="textSecondary">Task Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">$15k</Typography>
              <Typography color="textSecondary">Total Profit</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6"> Task Overview</Typography>
              <Chart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
              <EmailForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

