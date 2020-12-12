import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getProjectDetails,
  updateProjectByModerator,
} from "../actions/projectActions";
import { PROJECT_UPDATE_BY_MODERATOR_RESET } from "../constants/projectConstants";

const ProjectEditScreenForModerator = ({ match, history }) => {
  const projectId = match.params.id;

  const [isApproved, setIsApproved] = useState(false);

  const dispatch = useDispatch();

  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, error, project } = projectDetails;

  const projectUpdateByModerator = useSelector(
    (state) => state.projectUpdateByModerator
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = projectUpdateByModerator;

  useEffect(() => {
    dispatch({ type: PROJECT_UPDATE_BY_MODERATOR_RESET });
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_BY_MODERATOR_RESET });
      history.push("/moderator/projectlist");
    } else {
      if (!project.name || project._id !== projectId) {
        dispatch(getProjectDetails(projectId));
      } else {
        setIsApproved(project.isApproved);
      }
    }
  }, [dispatch, project, projectId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProjectByModerator({
        _id: projectId,
        isApproved,
      })
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h1>
              Project Submission Approval
              <i className="fas fa-hand-point-down"></i>
            </h1>
          </center>
          <hr />
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <center>
              <Form.Group controlId="isApproved">
                <Form.Check
                  type="checkbox"
                  label="Is Approved?"
                  checked={isApproved}
                  onChange={(e) => setIsApproved(e.target.checked)}
                ></Form.Check>
              </Form.Group>
            </center>

            <Button type="submit" size="lg" block variant="success">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectEditScreenForModerator;
