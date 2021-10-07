import {ReactElement, useCallback} from 'react';
import {DefaultTheme, ThemeProvider} from 'styled-components';
import {BrowserRouter} from 'react-router-dom';
import {Header} from './components/Header';

import GlobalStyle from './global';
import {Routes} from './routes';

import light from './global/themes/light';
import dark from './global/themes/dark';
import {usePersistedState} from './usePersistedState';

function App(): ReactElement {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [setTheme, theme.title]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header
          toggleTheme={toggleTheme}
          title={theme.title}
          primary={theme.colors.primary}
          secundary={theme.colors.secundary}
        />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
