import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getActiveSession } from "../actions/sessionActions";
import { Link } from "react-router-dom";

const HomeScreen = ({ history }) => {
  const buttonStyle = {
    minWidth: "100px",
    padding: "16px 32px",
    border: "none",
    borderRadius: "4px",
    background: "primary",
    color: "#fff",
    fontSize: "25px",
    cursor: "pointer",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const sessionActive = useSelector((state) => state.sessionActive);
  const { session: activeSession, loading, error } = sessionActive;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getActiveSession());
    }
  }, [dispatch, history, userInfo]);

  return (
    <div className="justify-content-md-center">
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Container style={containerStyle}>
        <Link to={`/project/createproject`}>
          <Button style={buttonStyle}>
            Apply For Project Fair( {activeSession.name} )
          </Button>
        </Link>
      </Container>
      {/* 
      {!userInfo.isAdmin ? (
        !userInfo.isJudge ? (
          !userInfo.isModerator ? (
            <Container style={containerStyle}>
              <Link to={`/project/createproject`}>
                <Button style={buttonStyle}>
                  Apply For Project Fair( {activeSession.name} )
                </Button>
              </Link>
            </Container>
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default HomeScreen;
