import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Radio,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EvaluationFormTableTemp = ({
  criterias,
  onRatingsChange,
  isEvaluated,
  ratings,
}) => {
  const [internalRatings, setInternalRatings] = useState(
    isEvaluated ? ratings : Array(criterias.length).fill(0)
  );

  // Update internalRatings whenever ratings or isEvaluated changes
  useEffect(() => {
    setInternalRatings(isEvaluated ? ratings : Array(criterias.length).fill(0));
  }, [ratings, isEvaluated, criterias.length]);

  const handleRadioChange = (event, index) => {
    if (!isEvaluated) {
      const newRatings = [...internalRatings];
      newRatings[index] = Number(event.target.value);
      setInternalRatings(newRatings);

      if (criterias.length === 1) {
        onRatingsChange(newRatings[0]);
      } else {
        onRatingsChange(newRatings);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={1}>
              <Typography variant="h6">Criteria</Typography>
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
                  {isEvaluated ? (
                    internalRatings[index] === num + 1 ? (
                      <React.Fragment>
                        {`${num + 1}`}
                        <CheckCircleOutlineIcon color="success" />
                      </React.Fragment>
                    ) : (
                      ""
                    )
                  ) : (
                    <Radio
                      value={num + 1}
                      checked={internalRatings[index] === num + 1}
                      onChange={(event) => handleRadioChange(event, index)}
                    />
                  )}
                </TableCell>
              ))}
              <TableCell align="center">
                {internalRatings[index]
                  ? internalRatings[index] * 20 + "%"
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EvaluationFormTableTemp;
