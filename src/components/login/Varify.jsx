import Paper from "@mui/material/Paper";
import { Link } from '@mui/material';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import image2 from "../../assets/photo2.jpg";
import React  from "react";

import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import {BASE_URL} from '../../config';

function OTP({ separator, length, value, onChange }) {


    //this only otp input part
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
     break;
    case "ArrowRight":
      event.preventDefault();
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
        selectInput(currentIndex + 1);
      }
      break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };


  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

//final part in otp input


function Varify() {
  const [otp, setOtp] = React.useState("");
  const location = useLocation();
  const { email,code} = location.state || {};
  const navigate = useNavigate();


  const resendOTP = () => {
    setOtp("");
    if(!email){
      Swal.fire({ position: "top",
      text: "cannot resend OTP without email address",
      customClass: { confirmButton: 'my-button' }
     });
    // window.alert('cannot resend OTP without email address')
     return;
    }
  axios.post(`${BASE_URL}generateOTP&sendmail`,{email:email})
    .then(result => {
        if(result.data){
             if(result.status === 201 ) {
              Swal.fire({ position: "top",
              text: result.data.msg,
              customClass: { confirmButton: 'my-button' }
             });
              //  window.alert(result.data.msg);   
               }
            }
            
          });
          
      
      };

  const handleSubmit = () => {

     console.log(otp);
     axios.get(`${BASE_URL}verifyOTP?&code=${otp}` )
       .then(result => {
           if(result.data){
            Swal.fire({ position: "top",
                   text: result.data.msg,
                   customClass: { confirmButton: 'my-button' }
                  });
              //window.alert(result.data.msg);
                  if(result.status === 201 ) {
                      navigate('/CreateNew' ,{state: { email:email} });
                      }
                  }
               }).catch(err => {
                  if (err.response) {
                    Swal.fire({ position: "top",
                    text: err.response.data.msg,
                    customClass: { confirmButton: 'my-button' }
                   });
               //  window.alert(err.response.data.msg);
                  }
                });
};


  return (
    <main
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh", // make the main tag fill the entire height of the viewport
        display: "flex", // add this
        justifyContent: "center", // add this
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          width: 400,
          mx: "auto", // margin left & right
          my: 0, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
            backgroundColor: 'rgba(190, 216, 230, 0.93)',
          '&:hover': { 
            transform: 'scale(1.02)', 
            boxShadow: 'lg',
          },
        }}
        variant="outlined"
      >
        <div>
          <Typography variant="h5" component="h3">
            <b>Verification</b>
          </Typography>
          <br />
          <br />
          <Typography variant="body1">Enter verification code.</Typography>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <OTP
            separator={<span>-</span>}
            value={otp}
            onChange={setOtp}
            length={6}
          />

       
        </Box>

        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >
          Verify
        </Button>

        <Typography
          fontSize="sm"
          sx={{
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Don&apos;t received the code?
          <Link
            component={Button}
            underline="none"
            sx={{ color: "blue", textTransform: "none", ml: 1 }}
            onClick={resendOTP}
          >
            Resend
          </Link>
        </Typography>
      </Paper>
    </main>
  );
}

const blue = {
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  200: "#DAE2ED",
  300: "#C7D0DD",
  700: "#434D5B",
  900: "#1C2025",
};

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 50%;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

export default Varify;
