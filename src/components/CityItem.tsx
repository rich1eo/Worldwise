import { Link } from 'react-router-dom';

import { ICity } from '../types/types';
import { formatDate } from '../utils/utils';

import { useCities } from '../hooks/useCities';

import styles from './CityItem.module.css';

interface CityItemProps {
  city: ICity;
}

export default function CityItem({ city }: CityItemProps) {
  const { deleteCity } = useCities();
  const { currentCity } = useCities();
  const { id, emoji, cityName, date, position } = city;

  function handleDeleteCity(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    deleteCity(id);
  }

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
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
