import {ReactElement} from 'react';
import Switch from 'react-switch';
import {shade} from 'polished';
import {Container} from './styles';

import logoImg from '../../assets/logo.svg';

type HeaderProps = {
  toggleTheme: () => void;
  title: string;
  primary: string;
  secundary: string;
};

export function Header({
  toggleTheme,
  title,
  primary,
  secundary,
}: HeaderProps): ReactElement {
  return (
    <Container>
      <img src={logoImg} alt="GitHub Explorer" />
      <Switch
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={10}
        width={40}
        handleDiameter={20}
        offColor={shade(0.15, primary)}
        onColor={secundary}
      />
    </Container>
  );
}
