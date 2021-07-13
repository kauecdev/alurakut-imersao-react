import { useState } from 'react'; 
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import BoxWithImageWrapper from '../src/components/BoxWithImageWrapper';

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img className="profileImageHome" src={`http://github.com/${githubUser}.png`}/>
      <hr/>

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'http://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const githubUser = 'kauecdev';
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ];

  const handleCreateCommunity = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: formData.get('title'),
      image: formData.get('image'),
    }

    setComunidades([...comunidades, comunidade]);
  } 

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={handleCreateCommunity}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>

              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <BoxWithImageWrapper title="Pessoas da comunidade" data={pessoasFavoritas} />

          <BoxWithImageWrapper title="Comunidades" data={comunidades} />
        </div>
      </MainGrid>
    </>
  )
}
