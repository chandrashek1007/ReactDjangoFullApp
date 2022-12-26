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

  
  
  const EditApplicants = (props) => {
    console.log(props);
    const { register, handleSubmit } = useForm();
    const [rowData, setRowData] = useState(props.location.idProps.data);
    const [loading, setLoading] = useState(false);

    const sleep = (ms) => {
        return new Promise(r => setTimeout(r, ms));
    }



 

  const handleRegistartion = (data) => {
    let name = document.getElementById('input-name').value;
    let gender = document.getElementById('gender').value;
    let state = document.getElementById('input-state').value;
    let district = document.getElementById('input-district').value;
    let pincode =  document.getElementById('input-pincode').value;
    
    let payload = {
      "id": rowData.id,
      "name": name,
      "gender": gender,
      "state": state,
      "district": district,
      "pincode": pincode
  }

    apiAxios.put('/applicants/'+ rowData.id +'/', payload)
          .then(response => {
              if (response.status === 200) {
                  
                      console.log(response.data);
                      setRowData(...rowData, name, gender,state,district,pincode);
                      
                  
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
                      <h3 className="mb-0">Applicant Details</h3>
                    </Col>
                 
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit(handleRegistartion)}>
                    
                 
                    <h6 className="heading-small text-muted mb-4">
                      Applicant information
                      
                    </h6>
            

                    <div className="pl-lg-4">
                      <Row>
                      <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-name"
                            >
                              Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.name}
                              id="input-name"
                              placeholder="Home Name"
                              type="text"
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-gender"
                            >
                              Gender
                            </label><br></br>
                            <select id="gender" class="rounded form-control-alternative" style={{"height":"42px", "width":"100%"}} value={rowData.gender} aria-label="Default select example">
                           
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            <option value="NA">NA</option>
                            </select>
                          </FormGroup>
                        </Col>
                        
                      </Row>
                      <Row>
                      <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-govt-type"
                            >
                              Govt. ID Type
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.govt_id_type}
                              id="input-govt-type"
                              placeholder="Govt ID Type"
                              type="text"
                              readOnly
                            />
                            
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-govt-id"
                            >
                              Govt. ID No.
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.govt_id_no}
                              id="input-govt-id"
                              placeholder="Govt ID No"
                              type="text"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-district"
                            >
                              District
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.district}
                              id="input-district"
                              placeholder="District"
                              type="text"
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-state"
                            >
                              State
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.state}
                              id="input-state"
                              placeholder="State"
                              type="text"
                              
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-pincode"
                            >
                              Pincode
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-pincode"
                              defaultValue={rowData.pincode}
                              placeholder="Pincode"
                              type="number"
                              
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    
                    <div className="pl-lg-4">
                     

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
  
  export default EditApplicants;
  