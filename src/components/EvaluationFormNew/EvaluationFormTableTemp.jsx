import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Radio, Typography } from '@mui/material';

const EvaluationFormTableTemp = ({ criterias, onRatingsChange }) => {
  const [ratings, setRatings] = useState(Array(criterias.length).fill(0));

  const handleRadioChange = (event, index) => {
    const newRatings = [...ratings];
    newRatings[index] = Number(event.target.value);
    setRatings(newRatings);

    // If there's only one criterion, call onRatingsChange with the single rating value
    if (criterias.length === 1) {
      onRatingsChange(newRatings[0]);
    } else {
      // Otherwise, call onRatingsChange with the array of ratings
      onRatingsChange(newRatings);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={1}>
              <Typography variant="h6">criteria</Typography>
            </TableCell>
            {["a", "b", "c", "d", "e"].map((value, num) => (
              <TableCell key={value} align="center">
                <Typography variant="h6">{num + 1}</Typography>
              </TableCell>
            ))}
            <TableCell align="center">
              <Typography variant="h6">Weight</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {criterias.map((criteria, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {criteria}
              </TableCell>
              {["a", "b", "c", "d", "e"].map((value, num) => (
                <TableCell key={num} align="center">
                  <Radio
                    value={num + 1}
                    checked={ratings[index] === num + 1}
                    onChange={(event) => handleRadioChange(event, index)}
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                {ratings[index] ? ratings[index] * 20 + "%" : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EvaluationFormTableTemp;