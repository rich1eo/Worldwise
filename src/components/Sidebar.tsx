import { Outlet } from 'react-router-dom';

import styles from './Sidebar.module.css';

import AppNav from './navs/AppNav';
import Logo from './ui/Logo';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      {/* TODO: Import from External Footer Component */}
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
