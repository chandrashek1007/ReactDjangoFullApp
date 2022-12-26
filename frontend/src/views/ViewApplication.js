
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
  import { BrowserRouter as Router, Route, Link } from "react-router-dom";
  import React, {useCallback, useEffect, useState} from "react";
  import {toast, ToastContainer} from "react-toastify";
  import apiAxios from "utils/apiAxios";
import { data } from "jquery";
  
  
  const ViewApplication = (props) => {
    console.log(props);
    const [rowData, setRowData] = useState(props.location.idProps.data);
    const [loading, setLoading] = useState(false);
    const [reviewerData, setReviewerData] = useState([]);
    const [reviwerName, setReviewerName] = useState(props.location.idProps.data.reviewer.reviewer_name);
    const [reviwerId, setReviewerId] = useState(props.location.idProps.data.reviewer.reviewer_id);
    const sleep = (ms) => {
        return new Promise(r => setTimeout(r, ms));
    }

    const fetchData = () => {
      apiAxios.get('/reviewers/')
          .then(response => {
              if (response.status === 200) {
                  
                      console.log(response.data);
                      setReviewerData(response.data);
                      
                  
              }
          })
          .catch((error) => console.log("Failed to fetch Data (" + error + ")"))
          
  }

  const handleChange = (e) =>{
    console.log(e.target.value);
    reviewerData.map((data)=>{
      if(data.reviewer_id == e.target.value){

        setReviewerName(data.reviewer_name)
        setReviewerId(e.target.value)
      }

    })
    
  }
  useEffect(() => {
    
    fetchData();
}, []);
    
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
                      <h3 className="mb-0">Application Details</h3>
                    </Col>
                 
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Application Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-application-id"
                            >
                              Application Id
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.id}
                              id="input-application-id"
                              placeholder="Application Id"
                              type="text"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                 
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
                              defaultValue={rowData.applicant.name}
                              id="input-name"
                              placeholder="Home Name"
                              type="text"
                              readOnly
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
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.applicant.gender}
                              id="input-gender"
                              placeholder="Gender"
                              type="text"
                              readOnly
                            />
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
                              defaultValue={rowData.applicant.govt_id_type}
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
                              defaultValue={rowData.applicant.govt_id_no}
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
                              defaultValue={rowData.applicant.district}
                              id="input-district"
                              placeholder="District"
                              type="text"
                              readOnly
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
                              defaultValue={rowData.applicant.state}
                              id="input-state"
                              placeholder="State"
                              type="text"
                              readOnly
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
                              defaultValue={rowData.applicant.pincode}
                              placeholder="Pincode"
                              type="number"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Application Status
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                      <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-doa"
                            >
                              Date of Application
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.application_date}
                              id="input-doa"
                              placeholder="DOA"
                              type="text"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-md"
                            >
                              Modification Date
                            </label><br></br>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.modified_date}
                              id="input-md"
                              placeholder="Modification Date"
                              min="2018-06-07T00:00"
                              type="date"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-load"
                            >
                              Load Applied
                            </label><br></br>
                            <Input
                              className="form-control-alternative"
                              defaultValue={rowData.load_applied}
                              id="input-load"
                              placeholder="Load Applied"
                              type="number"
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
                              htmlFor="input-ownership"
                            >
                              Ownership
                            </label>
                            <select readOnly class="rounded form-control-alternative" style={{"height":"42px", "width":"100%"}} value={rowData.ownership} aria-label="Default select example">
                     
                            <option value="JOINT">JOINT</option>
                            <option value="INDIVIDUAL">INDIVIDUAL</option>
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-category"
                            >
                              Category
                            </label>
                            <select readOnly class="rounded form-control-alternative" style={{"height":"42px", "width":"100%"}} value={rowData.category} aria-label="Default select example">
                          
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>
                            
                            </select>
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Status
                            </label>
                            <select readOnly class="rounded form-control-alternative" style={{"height":"42px", "width":"100%"}} value={rowData.status} aria-label="Default select example">
                         
                            <option value="Approved">Approved</option>
                            <option value="Connection Released">Connection Released</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejcted">Rejected</option>
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Reviwer information
                     
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
                            <select readOnly  onChange={handleChange} class="rounded form-control-alternative" style={{"height":"42px", "width":"100%"}} value={reviwerId} aria-label="Default select example">
                            {
                              reviewerData.map((data)=>{
                                return(
                                  <option value={data.reviewer_id}>{data.reviewer_id}</option>
                                )
                              })

                            }
                            
                            </select>
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
                            <label
                              className="form-control-alternative rounded"
                              style={{"height":"42px", "width":"100%","marginTop":"4px"}}
                            >
                              {reviwerName}
                              </label>
                          </FormGroup>
                        </Col>
                        
                      </Row>
                      
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-reviewer-comments"
                            >
                              Reviewer Comments
                            </label>
                            <Input
                                className="form-control-alternative"
                                placeholder="A few words about you ..."
                                rows="4"
                                defaultValue={rowData.reviewer_comments}
                                type="textarea"
                                readOnly
                            />
                          </FormGroup>
                        </Col>
                        
                      </Row>

                      <Row>

                        <Col lg="12">
                          <FormGroup>
                          <button type="button" class="btn btn-info">
                        <Link style={{"color" :"white"}} to={{
                          pathname:'/admin/tables',
                         
                        }}>
                        Back
                        </Link></button>
                         
                          
                          
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
  
  export default ViewApplication;
  