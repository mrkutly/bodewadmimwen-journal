import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";
import {
  Flash,
  Form,
  TextInput,
  Select,
  PrimaryButton,
  TertiaryButton,
  styleLink,
} from "waskode";
import { NoteInputType, WordType } from "../types";
import NoteInput from "./NoteInput";
import useForm from "../hooks/useForm";

const Link = styleLink(GatsbyLink);

interface FormData {
  word?: string;
  translation?: string;
  type?: WordType | "";
  notes: NoteInputType[];
}

const EntryForm = ({ entry }) => {
  const initialData: FormData = {
    word: "",
    translation: "",
    type: "",
    notes: [] as NoteInputType[],
  };

  const { errors, formData, result, status, submit, update, valid } = useForm(
    "/api/create-word",
    initialData,
    (data) => {
      const { word, translation, type, notes } = data;
      if ([word, translation, type].includes("")) return false;
      if (notes.length > 0) {
        return !notes.some((note) => [note.title, note.content].includes(""));
      }
      return true;
    }
  );

  const addNote = () => {
    update({
      name: "notes",
      value: [{ title: "", content: "" }],
    });
  };

  const removeNote = () => {
    update({
      name: "notes",
      value: [],
    });
  };

  const updateNote = (field: string, value: string, idx: number) => {
    const nextNotes = [...formData.notes];
    nextNotes[idx][field] = value;
    update({ name: "notes", value: nextNotes });
  };

  const noteAdded = formData.notes.length > 0;

  return (
    <>
      {status === "SUCCESS" && (
        <Flash type="success" style={{ width: "80%", margin: "24px auto" }}>
          Entry added! Go back <Link to="/">here</Link> to see all entries.
        </Flash>
      )}
      {status === "REJECTED" && (
        <Flash type="error" style={{ width: "80%", margin: "24px auto" }}>
          <ul>
            {errors.map((err, idx) => (
              <li key={`error-${idx}`}>{err}</li>
            ))}
          </ul>
        </Flash>
      )}
      <Form method="POST" onSubmit={submit} aria-busy={status === "PENDING"}>
        <TextInput
          label="Word"
          name="word"
          value={formData.word}
          onChange={(e) => update(e.target)}
          validationError={!formData.word && "Required"}
        />
        <TextInput
          label="Translation"
          name="translation"
          value={formData.translation}
          onChange={(e) => update(e.target)}
          validationError={!formData.translation && "Required"}
        />
        <Select
          label="Part of speech"
          value={formData.type}
          name="type"
          onChange={(e) => update(e.target)}
          options={[
            { label: "Noun", value: "NOUN" },
            { label: "Verb", value: "VERB" },
            { label: "Phrase", value: "PHRASE" },
          ]}
          validationError={formData.type === "" && "Required"}
        />
        {formData.notes.map((note, idx) => (
          <NoteInput
            key={`note-${idx}`}
            note={note}
            idx={idx}
            updateNote={updateNote}
          />
        ))}
        <ButtonWrapperStyles>
          <TertiaryButton onClick={noteAdded ? removeNote : addNote}>
            {noteAdded ? "Delete Note" : "Add note +"}
          </TertiaryButton>
          <PrimaryButton
            type="submit"
            disabled={!valid || status === "PENDING"}
          >
            Submit
          </PrimaryButton>
        </ButtonWrapperStyles>
      </Form>
    </>
  );
};

const ButtonWrapperStyles = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    margin-left: 12px;
  }
`;

export default EntryForm;
