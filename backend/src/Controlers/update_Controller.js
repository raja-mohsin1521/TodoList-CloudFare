export async function handleUpdate(request, env) {
    try {
        const data = await request.json();
        await env.NOTES.put(data.id, JSON.stringify(data));
         return new Response(JSON.stringify({
            message: 'Data Updated Successfully',
             data,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
   return new Response('Error processing request', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
