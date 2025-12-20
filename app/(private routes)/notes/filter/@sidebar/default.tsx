import css from './SidebarNotes.module.css';

import Link from 'next/link';

import { NOTE_TAGS } from '@/types/note';

const NotesSidebar = () => {
  return (
    <div>
      <ul className={css.menuList}>
        <li key="all" className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {NOTE_TAGS.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSidebar;
