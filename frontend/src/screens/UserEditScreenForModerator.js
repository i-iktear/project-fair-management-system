import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetailsByModerator,
  updateUserByModerator,
} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreenForModerator = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [isJudge, setIsJudge] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateByModerator = useSelector(
    (state) => state.userUpdateByModerator
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateByModerator;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/moderator/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetailsByModerator(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setUniversityId(user.universityId);
        setIsJudge(user.isJudge);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserByModerator({
        _id: userId,
        name,
        email,
        universityId,
        isJudge,
      })
    );
  };

  return (
    <>
      <FormContainer>
        <center>
          <h1>
            Edit User <i className="fas fa-user-edit"> </i>
          </h1>
        </center>
        <br />
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="universityid">
                <Form.Label>University ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your University ID"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group  controlId="isjudge">
              <Form.Check
                type="checkbox"
                label="Is Judge?"
                checked={isJudge}
                onChange={(e) => setIsJudge(e.target.checked)}
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

export default UserEditScreenForModerator;
