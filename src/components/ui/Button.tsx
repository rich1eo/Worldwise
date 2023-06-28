import { ReactNode } from 'react';

import { ButtonType } from '../../types/types';

import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  type: ButtonType;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export default function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
