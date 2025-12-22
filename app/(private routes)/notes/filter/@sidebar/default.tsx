'use client';

import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NOTE_TAGS } from '@/types/note';

const NotesSidebar = () => {
  const pathname = usePathname();

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/All"
          className={`${css.menuLink} ${pathname === '/notes/filter/All' ? css.active : ''}`}
        >
          All notes
        </Link>
      </li>

      {NOTE_TAGS.map(tag => {
        const isActive = pathname === `/notes/filter/${tag}`;

        return (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={`${css.menuLink} ${isActive ? css.active : ''}`}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NotesSidebar;
