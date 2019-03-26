import React from "react";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

class Navbars extends React.Component {
  render() {
    return (
      <div className="section section-navbars">
        <img alt="..." className="path" src={require("assets/img/path3.png")} />
        <Container id="menu-dropdown">
          <Row>
            <Col md="6">
              <h4>Menu</h4>
              <Navbar className="bg-primary" expand="lg">
                <Container>
                  <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                    Menu
                  </NavbarBrand>
                  <button className="navbar-toggler" aria-expanded={false}>
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </button>
                  <Collapse navbar isOpen={false}>
                    <Nav navbar>
                      <NavItem className="active">
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <p>Link</p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <p>Link</p>
                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav>
                        <DropdownToggle
                          aria-expanded={false}
                          aria-haspopup={true}
                          caret
                          color="default"
                          data-toggle="dropdown"
                          href="http://example.com"
                          id="navbarDropdownMenuLink"
                          nav
                        >
                          <p>Dropdown</p>
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>
            </Col>
            <Col md="6">
              <h4>Menu with Icons</h4>
              <Navbar className="bg-info" expand="lg">
                <Container>
                  <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                    Icons
                  </NavbarBrand>
                  <button className="navbar-toggler" aria-expanded={false}>
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </button>
                  <Collapse navbar isOpen={false}>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="tim-icons icon-send"
                          />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="tim-icons icon-single-02"
                          />
                        </NavLink>
                      </NavItem>
                      <UncontrolledDropdown nav>
                        <DropdownToggle
                          caret
                          color="default"
                          data-toggle="dropdown"
                          href="#pablo"
                          id="navbarDropdownMenuLink"
                          nav
                          onClick={e => e.preventDefault()}
                        >
                          <i
                            aria-hidden={true}
                            className="tim-icons icon-settings-gear-63"
                          />
                        </DropdownToggle>
                        <DropdownMenu
                          aria-labelledby="navbarDropdownMenuLink"
                          right
                        >
                          <DropdownItem header>Dropdown header</DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                          <div className="divider" />
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Separated link
                          </DropdownItem>
                          <div className="divider" />
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            One more separated link
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>
            </Col>
          </Row>
		  </Container>
        <div id="navbar">
          <div className="navigation-example">
          </div>
        </div>
      </div>
    );
  }
}

export default Navbars;
