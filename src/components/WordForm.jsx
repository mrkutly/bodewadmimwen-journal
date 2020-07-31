import React, { Fragment } from 'react';
import {
  Form,
  TextArea,
  TextInput,
  PrimaryButton,
  TertiaryButton,
} from 'waskode';
import useForm from '../hooks/useForm';

const WordForm = () => {
  const { errors, formData, result, status, submit, update } = useForm(
    '/api/create-word',
    {
      word: '',
      definition: '',
      type: 'VERB',
      notes: [],
    }
  );

  return (
    <>
      <Form
        style={{
          width: '80vw',
        }}
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <TextInput
          label="Word"
          name="word"
          value={formData.word}
          onChange={e => update(e.target)}
        />
        <TextInput
          label="Definition"
          name="definition"
          value={formData.definition}
          onChange={e => update(e.target)}
        />
        <h2>Notes:</h2>
        {formData.notes.map(({ title, content }, idx) => (
          <Fragment key={`note-${idx}`}>
            <TextInput
              label={`Note ${idx + 1} title`}
              name={`note-${idx + 1}-title`}
              value={title}
              onChange={e => {
                const nextNotes = [...formData.notes];
                nextNotes[idx].title = e.target.value;
                update({ name: 'notes', value: nextNotes });
              }}
            />
            <TextArea
              label={`Note ${idx + 1} content`}
              name={`note-${idx + 1}-content`}
              value={content}
              onChange={e => {
                const nextNotes = [...formData.notes];
                nextNotes[idx].content = e.target.value;
                update({ name: 'notes', value: nextNotes });
              }}
            />
          </Fragment>
        ))}
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </Form>

      <TertiaryButton
        onClick={() =>
          update({
            name: 'notes',
            value: [...formData.notes, { title: '', content: '' }],
          })
        }
      >
        Add note +
      </TertiaryButton>
    </>
  );
};

export default WordForm;
