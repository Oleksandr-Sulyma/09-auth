'use client';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createNote } from '@/lib/api';
import type { NoteFormValues, NoteTag } from '@/types/note';

import { useDraftStore } from '@/lib/store/noteStore';

type FormErrors = Partial<Record<'title' | 'content', string>>;

export default function NoteForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<FormErrors>({});
  const validate = (values: NoteFormValues): FormErrors => {
    const errors: FormErrors = {};

    if (!values.title.trim()) {
      errors.title = 'Title is required';
    } else if (values.title.length < 3) {
      errors.title = 'Min 3 characters';
    } else if (values.title.length > 50) {
      errors.title = 'Max 50 characters';
    }

    if (values.content.length > 500) {
      errors.content = 'Max 500 characters';
    }
    return errors;
  };

  const { draft, setDraft, clearDraft } = useDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setDraft({ ...draft, [name]: value });
  };

  const handleCancel = () => router.back();

  const handleSubmit = (_formData: FormData) => {
    const validationErrors = validate(draft);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    mutate(draft);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
        <span className={css.error}>{errors.title}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
        <span className={css.error}>{errors.content}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
