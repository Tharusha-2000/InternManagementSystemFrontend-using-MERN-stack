import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Internprojectsummery from './Internprojectsummery';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Box from '@mui/material/Box';

const PdfDownloadComponent = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Intern Project Summary',
 
  });

  const handleButtonClick = () => {
    handlePrint();
  };

  return (
    <div>
      <div style={{ position: 'absolute', left: '-10000px' }}>
        <Internprojectsummery ref={componentRef} />
      </div>
      <Button
        onClick={handleButtonClick}
        sx={{
          fontSize: '1em',
          backgroundColor: 'royal blue',
          transition: 'transform 0.3s',
          '&:hover': {
            backgroundColor: '#0000FF',
            transform: 'scale(1.1)',
          },
        }}
      >
        <FileDownloadIcon style={{ fontSize: '2em' }} />
        <Typography
          color="textSecondary"
          style={{
            fontSize: '0.7rem',
            marginTop: '5px',
          }}
        >
          Download Pdf
        </Typography>
      </Button>
    </div>
  );
};

export default PdfDownloadComponent;


