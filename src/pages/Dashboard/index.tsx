import {useRef, FormEvent, ReactElement, useEffect, useState} from 'react';
import {FiChevronRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import {Error, Form, Repositories, Title} from './styles';

type RepositoryData = {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export function Dashboard(): ReactElement {
  const [newRepo, setNewRepo] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const [repositories, setRepositories] = useState<RepositoryData[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories);
    }

    return [];
  });

  const ref = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<RepositoryData>(`repos/${newRepo}`);

      setRepositories([...repositories, response.data]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <Title>Explore repositórios no GitHub</Title>
      <p ref={ref} className="teste">
        ola
      </p>
      <Form hasError={false} onSubmit={handleAddRepository}>
        <input
          type="text"
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link to="/repositories/facebook/react" key={repository.full_name}>
            <img src={repository.owner.avatar_url} alt="Imagem" />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
}
