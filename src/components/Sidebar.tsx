import styles from './Sidebar.module.css';

import AppNav from './AppNav';
import Logo from './Logo';
import { Outlet } from 'react-router-dom';

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
