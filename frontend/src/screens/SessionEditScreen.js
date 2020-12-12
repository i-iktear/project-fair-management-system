import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getSessionDetails, updateSession } from "../actions/sessionActions";
import FormContainer from "../components/FormContainer";
import { SESSION_UPDATE_RESET } from "../constants/sessionConstants";

const SessionEditScreen = ({ match, history }) => {
  const sessionId = match.params.id;

  const [name, setName] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const dispatch = useDispatch();

  const sessionDetails = useSelector((state) => state.sessionDetails);
  const { loading, error, session } = sessionDetails;

  const sessionUpdate = useSelector((state) => state.sessionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = sessionUpdate;

  useEffect(() => {
    dispatch({ type: SESSION_UPDATE_RESET });
    if (successUpdate) {
      dispatch({ type: SESSION_UPDATE_RESET });
      history.push("/moderator/sessionlist");
    } else {
      if (!session.name || session._id !== sessionId) {
        dispatch(getSessionDetails(sessionId));
      } else {
        setName(session.name);
        setIsAvailable(session.isAvailable);
      }
    }
  }, [dispatch, session, sessionId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSession({
        _id: sessionId,
        name,
        isAvailable,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <center>
          <h1>
            Edit session Details <i className="fas fa-user-edit"> </i>
          </h1>
        </center>
        <hr />
        <br />
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isavailable">
              <Form.Check
                type="checkbox"
                label="Is Active?"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" size="lg" block variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SessionEditScreen;
