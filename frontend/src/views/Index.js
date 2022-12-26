import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import apiAxios from "utils/apiAxios";

// Colors
var colors = {
  gray: {
    100: "#f6f9fc",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#8898aa",
    700: "#525f7f",
    800: "#32325d",
    900: "#212529"
  },
  theme: {
    default: "#172b4d",
    primary: "#5e72e4",
    secondary: "#f4f5f7",
    info: "#11cdef",
    success: "#2dce89",
    danger: "#f5365c",
    warning: "#fb6340"
  },
  black: "#12263F",
  white: "#FFFFFF",
  transparent: "transparent"
};



const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [rowData, setRowData] = useState([]);
  const [approved, setApprovedData] = useState([]);
  const [pending, setPendingData] = useState([]);
  const [rejected, setRejectedData] = useState([]);
  const [released, setReleasedData] = useState([]);
  const [labels, setLabels] = useState(['JAN-2021', 'FEB-2021','MAR-2021', 'APR-2021', 'MAY-2021', 'JUN-2021', 'JUL-2021', 'AUG-2021', 'SEP-2021', 'OCT-2021' ,'NOV-2021', 'DEC-2021','JAN-2022']);
  const [count, setCount] = useState([116,79,92,103,98, 114,95,86,102,116,89,108,2]);
  const [approvedcount, setApprovedCount] = useState([54,29,41,38,32,50,38,40,42,41,39,45,1]);
  const [pendingcount, setPendingCount] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [rejectedcount, setRejectedCount] = useState([27,25,30,33,34,30,22,18,35,36,29,29,0]);
  const [releasedcount, setReleasedCount] = useState([31,23,20,30,31,34,35,26,23,27,21,34,1]);

  const fetchData = () => {
      
    
    apiAxios.get('/chartData/')
        .then(response => {
            if (response.status === 200) {
                
                    console.log(response.data);
                    setRowData(response.data.total);
                    setApprovedData(response.data.approved);
                    setPendingData(response.data.pending)
                    setRejectedData(response.data.rejected)
                    setReleasedData(response.data.connection_released)
               
                
            }
        })
        .catch((error) => console.log("Failed to fetch Data (" + error + ")"))
       
       
}
useEffect(() => {
  
  fetchData();
  rowData.map((data)=>{
    let date = new Date(data.month)
    setLabels(...labels, date.getMonth + "-" + date.getYear)
    setCount(...count, data.total)
    
  })
  console.log(labels)
 
}, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  let chartExample3 = {
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: colors.gray[900],
              zeroLineColor: colors.gray[900]
            },
            ticks: {
              callback: function (value) {
                if (!(value % 10)) {
                  return  value ;
                }
              }
            }
          }
        ]
      },
      tooltips: {
        callbacks: {
          label: function (item, data) {
            var label = data.datasets[item.datasetIndex].label || "";
            var yLabel = item.yLabel;
            var content = "";
  
            if (data.datasets.length > 1) {
              content += label;
            }
  
            content += yLabel ;
            return content;
          }
        }
      }
    },
    data1: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            label: "Total",
            data: count
          }
        ]
      };
    },
    data2: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            label: "Approved",
            data: approvedcount
          }
        ]
      };
    },
    data3: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            label: "Pending",
            data: pendingcount
          }
        ]
      };
    },
    data4: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            label: "Rejected",
            data: rejectedcount
          }
        ]
      };
    },
    data5: (canvas) => {
      return {
        labels: labels,
        datasets: [
          {
            label: "Connection Released",
            data: rejectedcount
          }
        ]
      };
    },
    
  };
  const handleChange =(data)=>{
    console.log(data.target.value)
    setChartExample1Data(data.target.value);
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Applications Count</h2>
                  </div>
                  <div className="col">
                    
                  <select onChange={handleChange} class="rounded form-control-alternative" style={{"height":"42px", "width":"50%"}} value={chartExample1Data} aria-label="Default select example">
                    <option value="data1">Total</option>
                    <option value="data2">Approved</option>
                    <option value="data3">Pending</option>
                    <option value="data4">Rejected</option>
                    <option value="data5">Released</option>
                  </select>
                        
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample3[chartExample1Data]}
                    options={chartExample3.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        
      </Container>
    </>
  );
};

export default Index;
