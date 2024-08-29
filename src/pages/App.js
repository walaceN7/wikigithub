import { useState } from 'react';

import gitLogo from '../assets/github-mark-white.png'
import Input from '../components/Input';

import { Container } from './styles';
import ItemRepo from './../components/ItemRepo/index';
import Button from './../components/Button/index';
import { api } from './../services/api';
import { filter } from './../../node_modules/stylis/src/Utility';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    try {
      const {data} = await api.get(`repos/${currentRepo}`);

      if(data.id){
        const isExist = repos.find(repo => repo.id === data.id);

        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        }     
      }
      alert('Repositório já está sendo mostrado');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado');        
      }
      else {
        alert('Ocorreu um erro na requisição');
      }      
    }      
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter(repo => repo.id !== id));
    setCurrentRepo('');
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt='GitHub logo'/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}      
    </Container>
  );
}

export default App;
