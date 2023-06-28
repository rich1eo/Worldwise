import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ButtonType, ICityPost, IFetchCountry } from '../types/types';
import { convertToEmoji } from '../utils/utils';

import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../hooks/useCities';

import styles from './Form.module.css';
import Button from './ui/Button';
import BackButton from './ui/BackButton';
import Message from './Message';
import Spinner from './ui/Spinner';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const navigate = useNavigate();

  const { isLoading, createCity } = useCities();
  const [mapLat, mapLng] = useUrlPosition();

  // TODO: Convert to useReducer
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryEmoji, setCountryEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState('');

  useEffect(() => {
    if (!mapLat || !mapLng) return;

    async function fetchCityData() {
      try {
        setGeocodingError('');
        setIsLoadingGeocoding(true);

        const res = await fetch(
          `${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`
        );
        if (!res.ok)
          throw new Error('Something went wrong during fetching country name');

        const data: IFetchCountry = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That's doesn't seem to be a city. Click somewhere else 😉"
          );

        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setCountryEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        if (err instanceof Error) setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [mapLat, mapLng]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!cityName || !date) return;

    const newCity: ICityPost = {
      cityName,
      country,
      date: date.toDateString(),
      emoji: countryEmoji,
      notes,
      position: {
        lat: mapLat,
        lng: mapLng,
      },
    };

    createCity(newCity);
    navigate('/app/cities');
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!mapLat && !mapLng)
    return <Message message="Start by clicking somewhere on the map!" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={e => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={date => {
            if (!date) return;
            setDate(date);
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={ButtonType.Primary}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
