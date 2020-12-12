import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header >
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect >
        <Container > 
          <LinkContainer to="/">
            <Navbar.Brand><i>PFMS</i> </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id={"username"}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/mysubmissions">
                    <NavDropdown.Item eventKey="4.1">
                      My Submissions
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user "></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/projecttlist">
                    <NavDropdown.Item>Projects</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo && userInfo.isModerator && (
                <NavDropdown title="Moderator" id="moderatormenu">
                  <LinkContainer to="/moderator/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/moderator/sessionlist">
                    <NavDropdown.Item>Sessions</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/moderator/projectlist">
                    <NavDropdown.Item>Project Fair Submissions</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo && userInfo.isJudge && (
                <NavDropdown title="Judge Panel" id="judgemenu">
                  <LinkContainer to="/judge/projectlist">
                    <NavDropdown.Item>Approved submissions</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    </header>

  );
};

export default Header;
