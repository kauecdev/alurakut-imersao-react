import { typeOf } from "react-is";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

const BoxWithImageWrapper = ({ title='', data=[] }) => {
    const topSixData = data.slice(0, 6);

    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                {title} ({data.length})
            </h2>
            
            <ul>
                {topSixData.map(item => (
                    typeof item === 'string'
                    ?   
                        <li key={item}>
                            <a href={`/users/${item}`}>
                                <img src={`http://github.com/${item}.png`} />
                                <span>{item}</span>
                            </a>
                        </li>
                        
                    :  
                        <li key={item.id}>
                            <a href={`/users/${item.title}`}>
                                <img src={item.image} />
                                <span>{item.title}</span>
                            </a>
                        </li>
                    
                ))}
            </ul>
        </ProfileRelationsBoxWrapper>
    );
}

export default BoxWithImageWrapper;