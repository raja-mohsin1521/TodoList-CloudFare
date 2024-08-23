// Import your handler functions
import { handleCreate } from './Controlers/create_Controller.js';
import { handleDelete } from './Controlers/delete_Controller.js';
import { handleReadAll } from './Controlers/read_controller.js';
import { handleUpdate } from './Controlers/update_Controller.js';


const routes = {
    '/add': handleCreate,
 '/read':handleReadAll,
 '/delete':handleDelete,
 '/update':handleUpdate
    
};

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const pathname = url.pathname;

        
        const routeHandler = routes[pathname];

        if (routeHandler) {
            
            return routeHandler(request, env, ctx);
        }

      
        return new Response('Not Found', { status: 404 });
    }
};
