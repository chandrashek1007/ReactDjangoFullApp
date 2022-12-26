
import ApplicationHeader from "components/Headers/ApplicationHeader";
import Header from "components/Headers/Header";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
  } from "reactstrap";
  

  import {Grid} from 'ag-grid-community';
  import 'ag-grid-community/styles//ag-grid.css';
  import 'ag-grid-community/styles//ag-theme-alpine.css';
  // core components
  import { useForm } from "react-hook-form";
  import React, {useCallback, useEffect, useState} from "react";
  import {toast, ToastContainer} from "react-toastify";
  import apiAxios from "utils/apiAxios";
import { data } from "jquery";

  
  
  const EditReviewers = (props) => {
    console.log(props);
    const { register, handleSubmit } = useForm();
    const [rowData, setRowData] = useState(props.location.idProps.data);
    const [loading, setLoading] = useState(false);





  const handleRegistartion = (data) => {
    let reviewer_id = document.getElementById('input-reviewer-id').value;
    let reviewer_name = document.getElementById('input-reviewer-name').value;
    
    let payload = {
  
      "reviewer_name": reviewer_name,
      
  }

    apiAxios.put('/reviewers/'+ reviewer_id +'/', payload)
          .then(response => {
              if (response.status === 200) {
                  
                      console.log(response.data);
                      setRowData(...rowData, reviewer_name);
                      
                  
              }
          })
          .catch((error) => console.log("Failed to fetch Data (" + error + ")"))
  
  
  };



    
    return (
      <>
         <ApplicationHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Reviewer Details</h3>
                    </Col>
                 
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit(handleRegistartion)}>
                    <h6 className="heading-small text-muted mb-4">
                      Reviewer Information
                    </h6>
                    
                    <div className="pl-lg-4">
                      <Row>
                      <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-reviewer-id"
                            >
                              Reviewer Id
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.reviewer_id}
                              id="input-reviewer-id"
                              placeholder="Reviewer Id"
                              type="text"
                              readOnly
                            />
                            
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-reviewer-name"
                            >
                              Reviewer Name
                            </label><br></br>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.reviewer_name}
                              id="input-reviewer-name"
                              placeholder="Reviewer Name"
                              type="text"
                              
                            />
                            
                          </FormGroup>
                        </Col>
                        
                      </Row>
                      
                      
                      <Row>

                        <Col lg="12">
                          <FormGroup>
                            
                          <button className="btn btn-info"  type="submit">Update</button>
                          
                          
                          </FormGroup>
                        </Col>
                        
                      </Row>
                      
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default EditReviewers;
  