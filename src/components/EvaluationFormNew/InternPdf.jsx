import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { KJUR } from "jsrsasign";
import { BASE_URL } from "../../config";
import "./EvaluationFormManager.css";
import {
  Card,
  CardContent,
  CircularProgress,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

function Internpdf() {
  const [comments, setComments] = useState({
    commentMentor: "Loading mentor comment...",
    commentEvaluator: "Loading evaluator comment...",
    overallPerformanceMentor: "Loading...",
    overallPerformanceEvaluator: "Loading...",
    actionTakenMentor: "Loading...",
    evaluatedDateEvaluator: "Loading...",
    evaluatedDateMentor: "Loading...",
    evaluatorName: "Loading evaluator name...",
    mentorName: "Loading mentor name...",
    user: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [pdfDataUrl, setPdfDataUrl] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = KJUR.jws.JWS.parse(token);
      const userId = decoded.payloadObj.id;

      axios

        .get(`${BASE_URL}getCommentsById`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add authorization header
          },
        })
        .then((response) => {
          const {
            comment_evaluator,
            comment_mentor,
            overall_performance_mentor,
            overall_performance_evaluator,
            action_taken_mentor,
            evaluated_date_Evaluator,
            evaluated_date_Mentor,
            user,
            evaluator,
            mentor,
          } = response.data;

          setComments({
            commentMentor: comment_mentor,
            commentEvaluator: comment_evaluator,
            overallPerformanceMentor: overall_performance_mentor,
            overallPerformanceEvaluator: overall_performance_evaluator,
            actionTakenMentor: action_taken_mentor,
            evaluatedDateEvaluator: evaluated_date_Evaluator,
            evaluatedDateMentor: evaluated_date_Mentor,
            user: user,
            evaluatorName: evaluator,
            mentorName: user.mentor,
          });
        })
        .catch((error) => console.error("Fetching comments failed:", error));
    }
  }, []);

  const generatePDFBlob = async () => {
    const input = document.getElementById("pdfContent");
    const canvas = await html2canvas(input, {
      scale: 2, // Increase scale for better resolution
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height], // Match the PDF size to the canvas
    });

    // Calculate the starting position to center the image
    const startX = (pdf.internal.pageSize.getWidth() - canvas.width) / 2;
    const startY = (pdf.internal.pageSize.getHeight() - canvas.height) / 2;

    pdf.addImage(imgData, "PNG", startX, startY, canvas.width, canvas.height);
    return pdf.output("blob");
  };

  const viewPDF = async () => {
    const blob = await generatePDFBlob();
    const url = URL.createObjectURL(blob);
    setPdfDataUrl(url);
    setShowModal(true);
  };

  const downloadPDF = async () => {
    const blob = await generatePDFBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "InternEvaluation.pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const PDFContent = ({ comments }) => {
    // Calculate average performance outside of the JSX return statement
    const overallPerformanceMentor = parseFloat(
      comments.overallPerformanceMentor
    );
    const overallPerformanceEvaluator = parseFloat(
      comments.overallPerformanceEvaluator
    );
    const averagePerformance = (
      (overallPerformanceMentor + overallPerformanceEvaluator) /
      2
    ).toFixed(2);

    return (
      <div id="pdfContent" style={{ background: "white", padding: "20px" }}>
        <Paper style={{ maxWidth: "100%", overflow: "auto" }}>
          <h2>Evaluation Summary</h2>

          <div
            className="a4Container"
            style={{
              width: "794px",
              height: "1123px",
              margin: "auto",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <h3>
              Name:{" "}
              {comments.user
                ? `${comments.user.fname} ${comments.user.lname}`.trim()
                : "Loading..."}
            </h3>
            <div className="summary">
              <Card className="cardHoverEffect">
                <CardContent className="cardStyle">
                  <CircularProgress
                    CircularProgress
                    value={overallPerformanceEvaluator}
                    className="circularProgressEvaluator"
                    variant="determinate"
                    size={100}
                    thickness={8}
                    style={{ color: "#b5179e" }}
                  />
                  <p>Overall performance marked by</p>
                  <h4>Evaluator</h4>
                  <h4>{overallPerformanceEvaluator.toFixed(2)}%</h4>
                </CardContent>
              </Card>
           
              <Card className="cardHoverEffect">
                <CardContent className="cardStyle">
                  <CircularProgress
                    value={overallPerformanceMentor}
                    className="circularProgressMentor"
                    variant="determinate"
                    size={100}
                    thickness={8}
                    style={{ color: "#008080" }}
                  />
                  <p>Overall performance marked by</p>
                  <h4>Mentor</h4>
                  <h4>{overallPerformanceMentor.toFixed(2)}%</h4>
                </CardContent>
              </Card>
              <Card className="cardHoverEffect">
                <CardContent className="cardStyle">
                  <CircularProgress
                    value={overallPerformanceEvaluator}
                    className="circularProgressEvaluator"
                    variant="determinate"
                    size={100}
                    thickness={8}
                    style={{ color: "#b5179e" }}
                  />
                  <p>Overall performance  </p>
                  <h4>Average</h4>
                  <h4>{averagePerformance}%</h4>
                </CardContent>
              </Card>
            </div>
            <div className="comments">
              <h2>Comments</h2>
              <br />
              <h5>Evaluator's Comment:</h5>
              <div className="comment-box">
                <p>
                  {comments.commentEvaluator?.split("\n").map((item, key) => (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
              <br />
              <h5>Mentor's Comment:</h5>
              <div className="comment-box">
                <p>
                  {comments.commentMentor?.split("\n").map((item, key) => (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <h2>Actions Taken by Mentor</h2>
            <br />
            <div className="comment-box">
              <p>
                {(comments.actionTakenMentor?.split("\n") || []).map(
                  (item, key) => (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  )
                )}
              </p>
            </div>
            <div className="evaluation-details">
              <h5>Evaluator: {comments.evaluatorName}</h5>
              <h5>
                Evaluated on:{" "}
                {new Date(comments.evaluatedDateEvaluator).toLocaleDateString()}
              </h5>
            </div>
            <div className="evaluation-details">
              <h5>Mentor: {comments.mentorName}</h5>
              <h5>
                Evaluated on:{" "}
                {new Date(comments.evaluatedDateMentor).toLocaleDateString()}
              </h5>
            </div>
          </div>
        </Paper>
      </div>
    );
  };

  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: 20,
            width: "60%",
            height: "80%",
            overflow: "auto",
          }}
        >
          <button onClick={onClose} style={{ marginBottom: 10 }}>
            Close
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div>
      <PDFContent comments={comments} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mr: 30 }}>
        <Button variant="contained" color="primary" onClick={viewPDF}>
          View PDF
        </Button>
        <Button variant="outlined" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Box>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <iframe src={pdfDataUrl} width="100%" height="100%"></iframe>
      </Modal>
    </div>
  );
}

export default Internpdf;
