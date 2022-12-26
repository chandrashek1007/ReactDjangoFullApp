
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
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
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
import HeaderView from "components/Headers/HeaderView";
      
  
  const Reviewers = () => {
    const [grid, setGrid] = useState(null);
      const [rowData, setRowData] = useState([]);
      const [loading, setLoading] = useState(false);
  
      const sleep = (ms) => {
          return new Promise(r => setTimeout(r, ms));
      }
  
      const fetchData = () => {
        
          let startTime = new Date().getTime();
          setLoading(true);
          apiAxios.get('/reviewers/')
              .then(response => {
                  if (response.status === 200) {
                      
                          console.log(response.data);
                          setRowData(response.data);
                          setLoading(false);
                      
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
              headerName: 'Reviewer ID', field: 'id', width: 'auto', sortable: true, filter: true
          }, {
              headerName: 'Reviewer Name', field: 'applicantName', width: 'auto', sortable: true, filter: true
          },
          {headerName: 'View Details', field: 'view', width: 'auto', filter: true},
        {headerName: 'Edit Details', field: 'edit', width: 'auto', filter: true}
          
        ]
      };
  
      
  
  
    return (
      <>
        <HeaderView />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Reviewer Details</h3>
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
                    {rowData.map((data)=>{
                      return(
                        <tr>
                        <td>{data.reviewer_id}</td>
                        <td>{data.reviewer_name}</td>
                        <td><button type="button" class="btn btn-primary">
                      <Link style={{"color" :"white"}}  to={{
                          pathname:'/admin/viewReviewers',
                          idProps: {
                            data : data
                          }
                        }}>
                        View
                        </Link></button></td>
                      <td><button type="button" class="btn btn-info">
                        <Link style={{"color" :"white"}}  to={{
                          pathname:'/admin/editReviewers',
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
  
  export default Reviewers;
  