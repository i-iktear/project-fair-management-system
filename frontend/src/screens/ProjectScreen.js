import React, { useEffect } from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProjectDetails } from "../actions/projectActions";

const ProjectScreen = ({ match, history }) => {
  const projectId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectDetails = useSelector((state) => state.projectDetails);
  const { project, loading, error } = projectDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    dispatch(getProjectDetails(projectId));
  }, [dispatch, history, userInfo, projectId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <center>
            <h1>
              Submission Details
              <i className="fas fa-hand-point-down"></i>
            </h1>
          </center>
          <hr />
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <center>
                  {" "}
                  <h1>
                    {" "}
                    <strong> Project Name: </strong> {project.name}
                  </h1>
                </center>
                <hr />
                <ListGroup.Item>
                  <p>
                    <strong> Project Category: </strong> {project.category}
                  </p>
                  <hr />

                  <p>
                    <strong> Teammembers: </strong> {project.teammembers}
                  </p>
                  <hr />
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    <strong> Frontend Details: </strong> {project.frontend}
                  </p>
                  <hr />

                  <p>
                    <strong> Backend Details: </strong> {project.backend}
                  </p>
                  <hr />

                  <p>
                    <strong> Database Details: </strong> {project.database}
                  </p>
                  <hr />
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h4>
                    {" "}
                    <strong>Description:</strong> {project.description}{" "}
                  </h4>
                </ListGroup.Item>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        {/* <Col md={3}>
          <Card>
            <ListGroup variant="flush"></ListGroup>
          </Card>
        </Col> */}
      </Row>
    </>
  );
};

export default ProjectScreen;
