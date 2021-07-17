import { SiteClient } from 'datocms-client';

export default async function createCommunity(request, response) {

    if (request.method === 'POST') {
        const TOKEN = '7a08fed895bd5a34b6e9c6b7c55db1';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: '975669',
            ...request.body,
        });
    
        response.json({
            registroCriado,
        });
        
        return;
    }

    response.status(404).json({
        message: 'Nothing to GET.'
    })
}