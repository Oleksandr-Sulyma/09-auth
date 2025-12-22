import type { Metadata } from 'next';
import { SITE_NAME, BASE_URL, OG_IMAGE } from '@/lib/constants/seo';
import EditProfileClient from './EditProfileClient';

export const metadata: Metadata = {
  title: `Edit Profile | ${SITE_NAME}`,
  description: 'Edit your profile information in NoteHub, including your username.',
  openGraph: {
    title: `Edit Profile | ${SITE_NAME}`,
    description: 'Edit your profile information in NoteHub, including your username.',
    url: `${BASE_URL}/profile/edit`,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'NoteHub - Edit Profile',
      },
    ],
    type: 'profile',
  },
};

export default function EditProfilePage() {
  return <EditProfileClient />;
}
