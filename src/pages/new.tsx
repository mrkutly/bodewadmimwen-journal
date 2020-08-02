import React from "react";
import styled from "styled-components";
import EntryForm from "../components/EntryForm";
import Layout from "../components/Layout";

const New = () => {
  return (
    <Layout title="New Entry">
      <NewStyles>
        <EntryForm />
      </NewStyles>
    </Layout>
  );
};

const NewStyles = styled.div`
  form {
    width: 80%;
    margin: 0 auto;

    &[aria-busy] {
      opacity: 0.8;
    }
  }
  input {
    width: 100%;
  }
  textarea {
    width: 100%;
    min-height: 300px;
  }
`;

export default New;
