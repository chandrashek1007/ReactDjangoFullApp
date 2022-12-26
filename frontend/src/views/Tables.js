
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import {Grid} from 'ag-grid-community';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
// core components
import Header from "components/Headers/Header.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import apiAxios from "utils/apiAxios";
import LoadingSpinner from "components/spinner/LoadingSpinner";
import HeaderView from "components/Headers/HeaderView";
    

const Tables = () => {
  const [grid, setGrid] = useState(null);
  const localData = JSON.parse(localStorage.getItem('applications'));
    const [rowData, setRowData] = useState(localData);
    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(false);

    const [rowFilterData, setFilterRowData] = useState(JSON.parse(localStorage.getItem('applications')));
    const sleep = (ms) => {
        return new Promise(r => setTimeout(r, ms));
    }
    
    const fetchData = () => {
      
        let startTime = new Date().getTime();
        setLoading(true);
        apiAxios.get('/applications/')
            .then(response => {
                if (response.status === 200) {
                    
                        console.log(response.data);
                        setRowData(response.data);
                        setFilterRowData(response.data);
                        setLoading(false);
                        localStorage.setItem('applications', JSON.stringify(response.data));
                    
                }
            })
            .catch((error) => toast.error("Failed to fetch Data (" + error + ")"))
            .finally(
                sleep(500 - (new Date().getTime() - startTime)).then(() => {
                    setLoading(false);
                })
            );
    }
    useEffect(() => {
      
      fetchData();
  }, []);

    let gridOptions = {
        paginationPageSize: 25, pagination: true, enableRowGroup: true, columnDefs: [{
            headerName: 'Application ID', field: 'id', width: 'auto', sortable: true, filter: true
        }, {
            headerName: 'Applicant Name', field: 'applicantName', width: 'auto', sortable: true, filter: true
        }, {
            headerName: 'Application Date', field: 'applicationDate', width: 'auto', sortable: true, filter: true
        }, {
            headerName: 'Load Applied', field: 'loadApplied', width: 'auto', sortable: true, filter: true
        }, {headerName: 'Reviewer', field: 'reviewerName', width: 'auto', filter: true},
        {headerName: 'View Details', field: 'view', width: 'auto', filter: true},
        {headerName: 'Edit Details', field: 'edit', width: 'auto', filter: true}
      ]
    };
const handleChange = (value) =>{
  if (value.target.value == ""){
    setFilterRowData(rowData)
  }
  else{
    setFilterRowData(rowData.filter(data => data.id == value.target.value))
  }

}

const handleReset=()=>{
  setFilterRowData(rowData)
}

const handleRegistartion = (data) => {
  let end_date = document.getElementById('end-date').value;
  let start_date = document.getElementById('start-date').value;
  
  console.log(end_date,start_date)
  let start_time = new Date(start_date);
  let end_time = new Date(end_date);
  var diffDays = end_time.getDate() - start_time.getDate(); 

  if (diffDays>0){
    setLoadError(false);
    apiAxios.get('/date_range/applications/?start_time='+ start_date +'&end_time='+end_date)
        .then(response => {
            if (response.status === 200) {
                
                    console.log(response.data.status);
                    setFilterRowData(response.data.status);
                    
                
            }
        })
        .catch((error) => console.log("Failed to fetch Data (" + error + ")"))
  }
  else{
    setLoadError(true);
  }

  


};
    


  return (
    <>
      <HeaderView data={rowData} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
          <Card className="shadow">
              <CardHeader className="border-0" style={{"marginBottom":"10px"}}>
                <h3 className="mb-0">Search Criteria</h3>
              </CardHeader>
              <CardHeader className="border-0" >
              <h3 className="mb-0">Search by Date of Application ID</h3>
              </CardHeader>
              
              <Form >
              <div className="pl-lg-4">
                     

                     <Row>

                       <Col lg="3">
                       <FormGroup>
                            
                            <Input
                              className="form-control-alternative"
                              id="input-pincode"
                             
                              placeholder="Search by Application  ID"
                              type="number"
                              onChange={handleChange}
                            />
                            

                          </FormGroup>
                       </Col>
         
                       
                     </Row>
                     
                   </div>
          </Form>
          <CardHeader className="border-0" style={{"marginBottom":"10px"}}>
                <h3 className="mb-0">Search by Date of Application Range</h3>
              </CardHeader>
              {loadError > 0 && 
                <span className='error' style={{"marginLeft":"25px", "color" :"red"}}>Start Date should be less than End Date</span>}

              <Form >
              <div className="pl-lg-4">
                     

                     <Row>

                       <Col lg="3">
                       <FormGroup>
                       <label
                              className="form-control-label"
                              htmlFor="input-md"
                            >
                              Start Date
                            </label><br></br>
                            <Input
                              className="form-control-alternative"
                              id="start-date"
                             
                              placeholder="YYYY-MM-DD"
                              type="date"
                              
                            />
                            
                          </FormGroup>
                       </Col>
               
                       
                     </Row>
                     <Row>

                       <Col lg="3">
                       <FormGroup>
                       <label
                              className="form-control-label"
                              htmlFor="input-md"
                            >
                              End Date
                            </label><br></br>
                            <Input
                              className="form-control-alternative"
                              id="end-date"
                             
                              placeholder="YYYY-MM-DD"
                              type="date"
                              
                            /><br></br>
                             <button type="button" onClick={handleRegistartion} className="btn btn-info">
                        
                        Search
                        </button>
                      
                             <button type="button" onClick={handleReset} className="btn btn-info">
                        
                        Reset
                        </button>

                          </FormGroup>
                       </Col>
                      
                       
                     </Row>
                     
                     
                   </div>
          </Form>
              </Card>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Applications Details</h3>
              </CardHeader>
              
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {
                      gridOptions.columnDefs.map((data)=>{
                        return (
                          <th scope="col">{data.headerName}</th>
                        );
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {rowFilterData.map((data)=>{
                    return(
                      <tr>
                      <td>{data.id}</td>
                      <td>{data.applicant.name}</td>
                      <td>{data.application_date}</td>
                      <td>{data.load_applied}</td>
                      <td>{data.reviewer.reviewer_name}</td>
                      <td><button type="button" class="btn btn-primary">
                      <Link style={{"color" :"white"}}  to={{
                          pathname:'/admin/view',
                          idProps: {
                            data : data
                          }
                        }}>
                        View
                        </Link></button></td>
                      <td><button type="button" class="btn btn-info">
                        <Link style={{"color" :"white"}}  to={{
                          pathname:'/admin/edit',
                          idProps: {
                            data : data
                          }
                        }}>
                        Edit
                        </Link></button></td>
                    
                    </tr>
                    );
                  })
                    
                  }
                 
                </tbody>
              </Table>
              
              {loading && <LoadingSpinner/>}
              
              
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
        
      </Container>
      <ToastContainer position="bottom-left" hideProgressBar={false}/>
    </>
  );
};

export default Tables;
