import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Flash,
  Form,
  TextInput,
  Select,
  PrimaryButton,
  TertiaryButton,
} from "waskode";
import { NoteInputType, WordType } from "../types";
import Link from "./Link";
import NoteInput from "./NoteInput";
import useForm from "../hooks/useForm";

interface FormData {
  word?: string;
  translation?: string;
  type?: WordType | "";
  notes: NoteInputType | null;
}

interface EntryFormProps {
  entry?: FormData & { _id: string };
}

const EntryForm = ({ entry }: EntryFormProps) => {
  const initialData: FormData = entry ?? {
    word: "",
    translation: "",
    type: "",
    notes: null,
  };

  const formValidator = (data) => {
    const { word, translation, type, notes } = data;
    if ([word, translation, type].includes("")) return false;
    if (notes) {
      return ![notes.title, notes.content].includes("");
    }
    return true;
  };

  const { errors, formData, status, submit, update, valid } = useForm(
    entry ? "/api/update-word" : "/api/create-word",
    initialData,
    formValidator
  );

  const addNote = (e) => {
    e.preventDefault();
    update({
      name: "notes",
      value: { title: "", content: "" },
    });
  };

  const removeNote = (e) => {
    e.preventDefault();
    update({
      name: "notes",
      value: null,
    });
  };

  const updateNote = (field: string, value: string) => {
    const nextNotes = {
      ...formData.notes,
      [field]: value,
    };
    update({ name: "notes", value: nextNotes });
  };

  const noteAdded = !!formData.notes;

  useEffect(() => {
    if (status === "SUCCESS") {
      window.scrollTo({ top: 0 });
    }
  }, [status]);

  return (
    <>
      {status === "SUCCESS" && (
        <Flash type="success" style={{ width: "80%", margin: "24px auto" }}>
          Entry saved! Go back <Link to="/">here</Link> to see all entries.
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
        {noteAdded && (
          <NoteInput note={formData.notes} updateNote={updateNote} />
        )}
        <ButtonWrapperStyles>
          <TertiaryButton onClick={noteAdded ? removeNote : addNote}>
            {noteAdded ? "Delete Note" : "Add note +"}
          </TertiaryButton>
          <PrimaryButton
            type="submit"
            disabled={!valid || ["PENDING", "SUCCESS"].includes(status)}
          >
            {status === "SUCCESS" ? "Success!" : "Save"}
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
