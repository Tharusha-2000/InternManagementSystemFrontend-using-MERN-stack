import React from "react";
import "./EvaluationFormNew.css";
import { Form, Row, Col } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";


function EvaluationFormNew() {
  return (
    <div>
        <h2>The Evaluation Form Creation</h2>
        <h2> this is the new text</h2>

      <div className="Container1">
        
        <Form>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword" noGutters
          >
            <Form.Label column sm="2" md="3">
              Intern Name:
            </Form.Label>
            <Col sm="10"  md="9">
            <Form.Control type="text" placeholder="Readonly intern name..." readOnly />
  
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword" noGutters
          > 
            <Form.Label column sm="2" md="3">
              Assigned Evaluator Name:
            </Form.Label>
            <Col sm="10"  md="9">
            <Form.Control type="text" placeholder="Evaluator Name..." readOnly />
  
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword" noGutters
          >
            <Form.Label column sm="2" md="3">
              Evaluator Name:
            </Form.Label>
            <Col sm="10"  md="9">
            <Form.Control
        type="text"
        placeholder="Disabled input"
        aria-label="Disabled input example"
        disabled
        readOnly
      />
  
            </Col>
          </Form.Group>
        </Form>
      </div>
      <br></br>
      

<div className="Container1">
      <Form>
            <Row className="mb-3">
                <Form.Label column sm={2}></Form.Label>
                {[1, 2, 3, 4, 5].map(num => (
                    <Col sm={1} key={num}>
                        <strong>{num}</strong>
                    </Col>
                ))}
                <Col sm={2}>
                    <strong>Weight</strong>
                </Col>
            </Row>
            {['Performance', 'Accurate', 'Communication', 'Timeliness'].map((label, index) => (
                <Row key={index} className="mb-3">
                    <Form.Label column sm={2}>
                        {label}
                    </Form.Label>
                    {[1, 2, 3, 4, 5].map(num => (
                        <Col sm={1} key={num}>
                            <Form.Check
                                type="radio"
                                name={`rating_${index}`}
                                value={num}
                                disabled
                            />
                        </Col>
                    ))}
                    <Col sm={2}>
                        {/* Replace XX with actual weight value */}
                        <input type="text" className="form-control" placeholder="XX%" readOnly />
                    </Col>
                </Row>
            ))}
        </Form>
        </div>
        <br></br>


        <div className="Container1">
            
            
            <Form>

            <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword" noGutters
          >
            <Form.Label column sm="2" md="3">
              Assigned Mentor Name
            </Form.Label>
            <Col sm="10"  md="9">
            <Form.Control type="text" placeholder="Mentors Name..." readOnly />
  
            </Col>
          </Form.Group>
          <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <Form.Control as="textarea" aria-label="Comment" disabled/>
      </InputGroup>


            </Form>
            
            
            
            
            </div>  


             <br></br>

      <div className="buttonalign">
        <div className="bt-1">
        <Button variant="primary">Create</Button>{" "}</div>
        <div className="bt-2">
        <Button variant="outline-primary">Cancel</Button></div>
      </div>              





    </div>
  );
}

export default EvaluationFormNew;
