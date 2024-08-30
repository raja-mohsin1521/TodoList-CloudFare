// src/index.js

import { handleCreate } from './Controlers/create_Controller.js';
import { handleDelete } from './Controlers/delete_Controller.js';
import { handleReadAll } from './Controlers/read_Controller.js';
import { handleUpdate } from './Controlers/update_Controller.js';

const routes = {
    '/add': handleCreate,
    '/read': handleReadAll,
    '/delete': handleDelete,
    '/update': handleUpdate,
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const pathname = url.pathname;

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                },
            });
        }

        const routeHandler = routes[pathname];

        if (routeHandler) {
            try {
                const response = await routeHandler(request, env, ctx);
                const modifiedResponse = new Response(response.body, response);
                modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
                modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                return modifiedResponse;
            } catch (error) {
                return new Response('Internal Server Error', { status: 500 });
            }
        }

        return new Response('Not Found', { status: 404 });
    }
};
