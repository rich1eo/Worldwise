import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { formatDate } from '../utils/utils';
import { useCities } from '../hooks/useCities';

import styles from './City.module.css';
import Message from './Message';
import Spinner from './ui/Spinner';
import BackButton from './ui/BackButton';

function City() {
  const { id } = useParams();
  const { currentCity, isLoading, getCity } = useCities();

  useEffect(() => {
    if (!id) return;
    getCity(id);
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  if (!currentCity) return <Message message="Current city is not found" />;

  const { emoji, cityName, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
