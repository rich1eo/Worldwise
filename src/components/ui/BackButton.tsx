import { useNavigate } from 'react-router-dom';

import { ButtonType } from '../../types/types';

import Button from './Button';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type={ButtonType.Back}
      onClick={e => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      Back
    </Button>
  );
}
