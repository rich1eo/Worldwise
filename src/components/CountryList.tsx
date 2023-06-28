import styles from './CountryList.module.css';
import { useCities } from '../hooks/useCities';
import { ICity, ICountry } from '../types/types';

import Spinner from './ui/Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

export default function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first City by clicking on a city on the map" />
    );

  const countries = cities.reduce(
    (arr: ICountry[], city: ICity): ICountry[] => {
      if (!arr.map(el => el.country).includes(city.country))
        return [
          ...arr,
          { id: city.id, country: city.country, emoji: city.emoji },
        ];
      else return arr;
    },
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map(country => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}
