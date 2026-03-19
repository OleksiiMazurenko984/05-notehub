import { useId } from 'react';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import type { NoteData, NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
  addNote: (note: NoteData) => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialNoteFormValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const schemaValidation = Yup.object().shape({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().required(),
});

export default function NoteForm({ onClose, addNote }: NoteFormProps) {
  const id = useId();

  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    const noteData: NoteData = {
      title: values.title,
      content: values.content,
      tag: values.tag,
    };

    addNote(noteData);
    actions.resetForm();
    onClose();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialNoteFormValues}
      validationSchema={schemaValidation}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <Field
            className={css.input}
            type="text"
            name="title"
            id={`${id}-title`}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content" id={`${id}-content`}>
            Content
          </label>
          <Field
            as="textarea"
            id={`${id}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag" id={`${id}-tag`}>
            Tag
          </label>
          <Field as="select" id={`${id}-tag`} name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
