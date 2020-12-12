import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listJudgeProjects } from "../actions/projectActions";

const ProjectListScreenForJudge = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectListForJudge = useSelector((state) => state.projectListForJudge);
  const {
    loading: loadingProjects,
    error: errorprojects,
    projects,
  } = projectListForJudge;

  useEffect(() => {
    if (userInfo) {
      dispatch(listJudgeProjects());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <center>
        <h2>
          Approved projects <i className="fas fa-hand-point-down"></i>{" "}
        </h2>
      </center>
      <br />

      {loadingProjects ? (
        <Loader />
      ) : errorprojects ? (
        <Message variant="danger">{errorprojects}</Message>
      ) : (
        <Table striped hover resposnsive="true" className="table-sm">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Category</th>
              <th>TeamMembers</th>
              <th>Frontend</th>
              <th>Backend</th>
              <th>database</th>
              <th>Approved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.category}</td>
                <td>{project.teammembers}</td>
                <td>{project.frontend}</td>
                <td>{project.backend}</td>
                <td>{project.database}</td>

                <td>
                  {project.isApproved ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/projects/${project._id}`}>
                    <Button className="btn-sm" variant="info">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProjectListScreenForJudge;
