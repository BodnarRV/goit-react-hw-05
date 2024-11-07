import React from 'react';
import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Page Not Found</h1>
      <p className={s.message}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={s.link}>Go to Home</Link>
    </div>
  );
}
