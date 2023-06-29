import { useEffect } from 'react';

import styles from './AppLayout.module.css';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import User from '../components/User';

function AppLayout() {
  useEffect(() => {
    document.title = 'Map | WorldWise';

    return () => {
      document.title = 'WorldWise';
    };
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
