import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listSessions,
  deleteSession,
  createSession,
} from "../actions/sessionActions";
import { SESSION_CREATE_RESET } from "../constants/sessionConstants";

const SessionListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const sessionList = useSelector((state) => state.sessionList);
  const { loading, error, sessions } = sessionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sessionDelete = useSelector((state) => state.sessionDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = sessionDelete;

  const sessionCreate = useSelector((state) => state.sessionCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    session: createdSession,
  } = sessionCreate;

  useEffect(() => {
    dispatch({ type: SESSION_CREATE_RESET });
    if (!userInfo || !userInfo.isModerator) {
      history.push("/login");
    } else {
      dispatch(listSessions());
    }

    if (successCreate) {
      history.push(`/moderator/session/${createdSession._id}/edit`);
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdSession,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteSession(id));
    }
  };

  const createSessionHandler = () => {
    dispatch(createSession());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>
            {" "}
            <b>SESSIONS</b>{" "}
          </h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createSessionHandler}>
            <i className="fas fa-plus"></i> Create a Session
          </Button>
        </Col>
      </Row>
      <br />
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete} </Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger"> {errorCreate} </Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover resposnsive="true" className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Active</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id}>
                <td>{session._id}</td>
                <td>{session.name}</td>

                <td>
                  {session.isAvailable ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/moderator/session/${session._id}/edit`}>
                    <Button variant="info" className="btn-sm">
                      <i className="fas fa-edit"> </i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => {
                      deleteHandler(session._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default SessionListScreen;
