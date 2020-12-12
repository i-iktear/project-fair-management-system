import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getProjectDetails, updateProject } from "../actions/projectActions";
import { PROJECT_UPDATE_RESET } from "../constants/projectConstants";

const ProjectEditScreenMy = ({ match, history }) => {
  const projectId = match.params.id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [teammembers, setTeammembers] = useState("");
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [database, setDatabase] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const projectDetails = useSelector((state) => state.projectDetails);
  const { loading, error, project } = projectDetails;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = projectUpdate;

  useEffect(() => {
    dispatch({ type: PROJECT_UPDATE_RESET });
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET });
      history.push("/mysubmissions");
    } else {
      if (!project.name || project._id !== projectId) {
        dispatch(getProjectDetails(projectId));
      } else {
        setName(project.name);
        setCategory(project.category);
        setTeammembers(project.teammembers);
        setFrontend(project.frontend);
        setBackend(project.backend);
        setDatabase(project.database);
        setDescription(project.description);
      }
    }
  }, [dispatch, project, projectId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        _id: projectId,
        name,
        category,
        teammembers,
        frontend,
        backend,
        database,
        description,
      })
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h1>
              Edit Submission
              <i className="fas fa-hand-point-down"></i>
            </h1>
          </center>
          <hr />
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Project name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose...</option>
                  <option value="Web App">Web App</option>
                  <option value="Android App">Android App</option>
                  <option value="Ios App">Ios App</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="teammembers">
                <Form.Label>Total team Members (Max - 5 people)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Total Team Members Count"
                  value={teammembers}
                  onChange={(e) => setTeammembers(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="frontend">
                <Form.Label>Frontend</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Frontend Stacks"
                  value={frontend}
                  onChange={(e) => setFrontend(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="backend">
                <Form.Label>Backend</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Backend Stacks"
                  value={backend}
                  onChange={(e) => setBackend(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="database">
                <Form.Label>Database</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Database details"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                placeholder="Enter project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" size="lg" block variant="success">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectEditScreenMy;
