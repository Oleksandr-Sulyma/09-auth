'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { createNote } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/store/noteStore';
import { NOTE_TAGS } from '@/types/note';
import type { NoteFormValues, NoteTag } from '@/types/note';

import css from './NoteForm.module.css';

type FormErrors = Partial<Record<'title' | 'content', string>>;
interface ApiErrorResponse {
  message: string;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<FormErrors>({});
  const { draft, setDraft, clearDraft } = useDraftStore();

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

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
      clearDraft();
      router.push('/notes/filter/All');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Failed to create note');
    },
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setDraft({ ...draft, [name]: value });

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (formData: FormData) => {
    const values: NoteFormValues = {
      title: ((formData.get('title') as string) || '').trim(),
      content: ((formData.get('content') as string) || '').trim(),
      tag: formData.get('tag') as NoteTag,
    };

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter note title..."
          className={css.input}
          value={draft.title}
          onChange={handleChange}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          placeholder="Write your thoughts here..."
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
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
          {NOTE_TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
