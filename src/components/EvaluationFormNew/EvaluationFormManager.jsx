import React from "react";

import { Card, CardContent, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "./EvaluationFormManager.css";
import BarchartManagement from "./BarchartManagement";

function EvaluationFormManager({ evaluationFormDetails, mentor }) {
  
  const {
    job_performance_scores_evaluator,
    job_performance_scores_mentor,
    job_performance_criterias_evaluator,
    overall_performance_evaluator,
    overall_performance_mentor,
    comment_evaluator,
    comment_mentor,
    action_taken_mentor,
    job_performance_criterias_mentor,
    core_values_criterias_evaluator,
    core_values_scores_evaluator,
    core_values_criterias_mentor,
    core_values_scores_mentor,
    evaluator,
    evaluated_date_Evaluator,
    evaluated_date_Mentor,
  } = evaluationFormDetails;

  const data = job_performance_criterias_evaluator.map((criteria, index) => ({
    name: criteria,
    Evaluator: job_performance_scores_evaluator[index],
  }));
  const data2 = job_performance_criterias_mentor.map((criteria, index) => ({
    name: criteria,
    mentor: job_performance_scores_mentor[index],
  }));

  const data3 = core_values_criterias_evaluator.map((criteria, index) => ({
    name: criteria,
    Evaluator: core_values_scores_evaluator[index],
  }));
  const data4 = core_values_criterias_mentor.map((criteria, index) => ({
    name: criteria,
    mentor: core_values_scores_mentor[index],
  }));

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Intern Evaluation Summary</h1>
        <br></br>
      </div>
      <div className="evaluation-details">
        <h5>Evaluator : {evaluator}</h5>

        <h5>
          Evaluated on :{" "}
          {new Date(evaluated_date_Evaluator).toLocaleDateString()}
        </h5>
      </div>

      <div className="evaluation-details">
        <h5>Mentor : {mentor}</h5>
        <h5>
          Evaluated on : {new Date(evaluated_date_Mentor).toLocaleDateString()}
        </h5>
      </div>

      <h2>Overall Performance</h2>

      <div className="summary"></div>

      <div className="summary">
        <Card className="cardHoverEffect">
          <CardContent className="cardStyle">
            <CircularProgress
              className="circularProgressEvaluator"
              variant="determinate"
              value={overall_performance_evaluator}
              size={100}
              thickness={8}
              style={{ color: "#b5179e" }}
            />
            <p>Overall performance marked by</p>
            <h4>Evaluator</h4>
            <h4>{overall_performance_evaluator.toFixed(2)}%</h4>
          </CardContent>
        </Card>
        <Card className="cardHoverEffect">
          <CardContent className="cardStyle">
            <CircularProgress
              className="circularProgressMentor"
              variant="determinate"
              value={overall_performance_mentor}
              size={100}
              thickness={8}
              style={{ color: "#008080" }}
            />
            <p>Overall performance marked by</p>
            <h4>Mentor</h4>
            <h4>{overall_performance_mentor.toFixed(2)}%</h4>
          </CardContent>
        </Card>
        <Card className="cardHoverEffect">
          <CardContent className="cardStyle">
            <CircularProgress
              className="circularProgressAverage"
              variant="determinate"
              value={
                (overall_performance_evaluator + overall_performance_mentor) / 2
              }
              size={100}
              thickness={8}
              style={{ color: "#FF0000" }}
            />
            <p>Overall performance</p>
            <h4> Average</h4>
            <h4>
              {(
                (overall_performance_evaluator + overall_performance_mentor) /
                2
              ).toFixed(2)}
              %
            </h4>
          </CardContent>
        </Card>
      </div>
      <br></br>

      <h2>Job Performance assesment</h2>
      <br></br>
      <div className="charts">
        <BarchartManagement data={data} dataKey="Evaluator" fill="#b5179e" />

        <BarchartManagement data={data2} dataKey="mentor" fill="#008080" />
      </div>

      <h2>Core Values and objectives assesment</h2>
      <br></br>
      <div className="charts">
        <BarchartManagement data={data3} dataKey="Evaluator" fill="#b5179e" />

        <BarchartManagement data={data4} dataKey="mentor" fill="#008080" />
      </div>

      <div className="comments">
        <h2>Comments</h2>
        <br></br>
        <h5>Evaluator's Comment: </h5>
        <div className="comment-box">
          <p>
            {comment_evaluator.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
        <br></br>
        <h5>Mentor's Comment: </h5>
        <div className="comment-box">
          <p>
            {comment_mentor.split("\n").map((item, key) => {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <h2>Actions Taken by Mentor</h2>
      <br></br>
      <div className="comment-box">
        <p>
          {action_taken_mentor.split("\n").map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default EvaluationFormManager;
