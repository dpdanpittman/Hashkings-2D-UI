import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Badge,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";

class PaginationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1
    };
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    return (
      <div className="section section-pagination">
        <img alt="..." className="path" src={require("assets/img/path4.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path5.png")}
        />
        <Container>
          <Row>
            <Col md="6">
              <h3 className="mb-4">Daily Progress</h3>
              <div className="progress-container">
                <span className="progress-badge">Time until next watering</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container progress-info">
                <span className="progress-badge">Time until Harvest</span>
                <Progress max="100" value="10">
                  <span className="progress-value">10%</span>
                </Progress>
              </div>
              <br />
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}

export default PaginationSection;
