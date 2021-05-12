import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const [searched, setSearched] = useState(false);
  const { searchRepositories } = useActions();
  const { data, loading, error } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearched(true);
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
        <button type='submit'>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      <div className='results'>
        {!error &&
          !loading &&
          data.map((repository) => (
            <div className='result-item'>
              <a href={repository.link} key={repository.name} target='_blank'>
                {repository.name}
              </a>
            </div>
          ))}
        {!error && !loading && data.length === 0 && searched && (
          <h3>No results found</h3>
        )}
      </div>
    </div>
  );
};

export default RepositoriesList;
