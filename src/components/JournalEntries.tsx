import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Loading, TextInput } from "waskode";
import { Word } from "../types";

type Status = "LOADING" | "IDLE" | "ERROR";

const JournalEntries = () => {
  const [status, setStatus] = useState<Status>("LOADING");
  const [words, setWords] = useState<Word[]>();
  const [filtered, setFiltered] = useState<Word[]>();
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    axios("/api/get-words").then((response) => {
      if (response.data.errors) return setStatus("ERROR");
      setWords(response.data.words);
      setFiltered(response.data.words);
      setStatus("IDLE");
    });
  }, []);

  useEffect(() => {
    const filtered = words?.filter(
      (word) => word.word.includes(query) || word.translation.includes(query)
    );
    setFiltered(filtered ?? []);
  }, [query]);

  if (status === "LOADING") return <Loading />;
  if (status === "ERROR") return <p>error</p>;

  return (
    <>
      <TextInput
        label="Search entries"
        validationError={null}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder={`ex. "maji" or "leave"`}
      />
      <SectionStyles id="entries">
        <ul>
          {filtered.map((word) => (
            <li key={word._id}>
              <h2>
                {word.word} - {word.translation}
              </h2>
              {word.notes.data.map((note) => (
                <Fragment key={note._id}>
                  <h4>
                    {note.title} |{" "}
                    {new Date(note._ts / 1000).toLocaleDateString()}
                  </h4>
                  {note.content.split("\n").map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </Fragment>
              ))}
            </li>
          ))}
        </ul>
      </SectionStyles>
    </>
  );
};

const SectionStyles = styled.section`
  ul {
    padding-left: 0;
    list-style: "✨ ";
  }
`;

export default JournalEntries;
