import { useSearchParams } from 'react-router-dom';
import { PositionArr } from '../types/types';

export function useUrlPosition(): PositionArr {
  const [searchParams] = useSearchParams();

  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));

  return [lat, lng];
}
