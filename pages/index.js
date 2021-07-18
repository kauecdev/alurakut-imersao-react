import { useEffect, useState } from 'react'; 
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
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

export default function Home({ githubUser }) {
  const [comunidades, setComunidades] = useState([]);
  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ];

  const [seguidores, setSeguidores] = useState([]);

  useEffect(() => {
    fetch(`http://api.github.com/users/${githubUser}/followers`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      setSeguidores(response);
    });

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7a08fed895bd5a34b6e9c6b7c55db1',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then(response => response.json())
    .then(response => setComunidades(response.data.allCommunities));
  }, []);

  const handleCreateCommunity = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const comunidade = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade),
    })
    .then(async(response) => {
      const data = await response.json();
      const comunidade = data.registroCriado;
      setComunidades([...comunidades, comunidade]);
    });

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

          <BoxWithImageWrapper title="Seguidores" data={seguidores} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token,
    }
  })
  .then(response => response.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    },
  }
}
