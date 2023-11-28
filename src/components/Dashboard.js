import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

class Dashboard extends Component {
  // Dummy data for the charts
  monthlySalesData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  salesCategoryData = {
    labels: ["Frames", "Lenses", "Accessories"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  averageSaleValueData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Average Sale Value",
        data: [500, 400, 300, 400, 500, 600],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  inventoryData = {
    labels: ["Frames", "Lenses", "Accessories"],
    datasets: [
      {
        label: "Inventory",
        data: [200, 300, 150],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  customerDemographicsData = {
    labels: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55+"],
    datasets: [
      {
        data: [300, 500, 100, 400, 700, 200],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#AA6384",
          "#2A9D8F",
          "#E9C46A",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#AA6384",
          "#2A9D8F",
          "#E9C46A",
        ],
      },
    ],
  };

  render() {
    return (
      <div style={{ margin: "20px", padding: "20px" }}>
        <div class="ui doubling two column centered grid">
          <div class="four column centered row">
            <div class="column">
              <Card>
                <Card.Header>Monthly Sales</Card.Header>
                <Card.Body>
                  <Bar data={this.monthlySalesData} />
                </Card.Body>
              </Card>
            </div>
            <div class="column">
              <Card>
                <Card.Header>Average Sale Value</Card.Header>
                <Card.Body>
                  <Line data={this.averageSaleValueData} />
                </Card.Body>
              </Card>
            </div>
          </div>
          <div class="four column centered row">
            <div class="column">
              <Card>
                <Card.Header>Sales by Category</Card.Header>
                <Card.Body>
                  <Pie data={this.salesCategoryData} />
                </Card.Body>
              </Card>

            </div>
            <div class="column">
              <Card>
                <Card.Header>Customer Demographics</Card.Header>
                <Card.Body>
                  <Doughnut data={this.customerDemographicsData} />
                </Card.Body>
              </Card>
            </div>
          </div>
          <div class="four column centered row">
            <div class="column">
              <Card>
                <Card.Header>Inventory Levels</Card.Header>
                <Card.Body>
                  <Bar data={this.inventoryData} />
                </Card.Body>
              </Card>

            </div>
            <div class="column">
            </div>
          </div>
        </div>
        {/* <Container style={{ margin: "20px", padding: "20px" }}> */}
        {/* Row 1: Three smaller charts */}
        {/* <Row>
            <Col>
              <Card>
                <Card.Header>Monthly Sales</Card.Header>
                <Card.Body>
                  <Bar data={this.monthlySalesData} />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Sales by Category</Card.Header>
                <Card.Body>
                  <Pie data={this.salesCategoryData} />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Header>Average Sale Value</Card.Header>
                <Card.Body>
                  <Line data={this.averageSaleValueData} />
                </Card.Body>
              </Card>
            </Col>
          </Row> */}

        {/* Row 2: Inventory chart */}
        {/* <Row>
            <Col>
              <Card>
                <Card.Header>Inventory Levels</Card.Header>
                <Card.Body>
                  <Bar data={this.inventoryData} />
                </Card.Body>
              </Card>
            </Col>
          </Row> */}

        {/* Row 3: Customer demographics chart */}
        {/* <Row>
            <Col>
              <Card>
                <Card.Header>Customer Demographics</Card.Header>
                <Card.Body>
                  <Doughnut data={this.customerDemographicsData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
}

export default Dashboard;
