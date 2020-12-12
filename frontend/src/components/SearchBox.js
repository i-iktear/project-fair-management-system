import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/user/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search projects..."
        className="ml-sm-5 mr-sm-2"
      ></Form.Control>
      <Button type="submit" className="btn btn-success p-2 btn-sm">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
