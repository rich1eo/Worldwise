import { Link } from 'react-router-dom';

import styles from './CityItem.module.css';
import { ICity } from '../types/types';
import { useCities } from '../hooks/useCities';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

interface CityItemProps {
  city: ICity;
}

export default function CityItem({ city }: CityItemProps) {
  const { currentCity } = useCities();
  const { id, emoji, cityName, date, position } = city;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
