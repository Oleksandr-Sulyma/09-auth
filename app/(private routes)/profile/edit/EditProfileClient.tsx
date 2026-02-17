// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { useAuthStore } from '@/lib/store/authStore';
// import { updateMe } from '@/lib/api/clientApi';
// import { toast } from 'react-hot-toast';
// import css from './EditProfilePage.module.css';

// export default function EditProfileClient() {
//   const router = useRouter();
//   const { user, setUser } = useAuthStore();

//   const [username, setUsername] = useState(user?.username || '');
//   const [isPending, setIsPending] = useState(false);

//   useEffect(() => {
//     if (user?.username) {
//       setUsername(user.username);
//     }
//   }, [user]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsPending(true);

//     try {
//       const updatedUser = await updateMe({ username });
//       setUser(updatedUser);

//       toast.success('Profile updated successfully!');
//       router.push('/profile');
//       router.refresh();
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       toast.error('Failed to update username. Please try again.');
//     } finally {
//       setIsPending(false);
//     }
//   };

//   const handleCancel = () => {
//     router.push('/profile');
//   };

//   if (!user) return null;

//   return (
//     <main className={css.mainContent}>
//       <div className={css.profileCard}>
//         <h1 className={css.formTitle}>Edit Profile</h1>
//         <div className={css.avatarWrapper}>
//           <Image
//             src={user.avatar || 'https://ac.goit.global/fullstack/react/default-avatar.jpg'}
//             alt="User Avatar"
//             width={120}
//             height={120}
//             className={css.}
//             priority
//           />
//         </div>
//         <form className={css.profileInfo} onSubmit={handleSubmit}>
//           <div className={css.usernameWrapper}>
//             <label htmlFor="username">Username:</label>
//             <input
//               id="username"
//               type="text"
//               className={css.input}
//               value={username}
//               onChange={e => setUsername(e.target.value)}
//               required
//               disabled={isPending}
//             />
//           </div>
//           <p>Email: {user.email}</p>
//           <div className={css.actions}>
//             <button type="submit" className={css.saveButton} disabled={isPending}>
//               {isPending ? 'Saving...' : 'Save'}
//             </button>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={handleCancel}
//               disabled={isPending}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }
