export async function handleCreate(request, env) {
    try {
   
        const data = await request.json();
         const id = crypto.randomUUID(); 
        const note = { id, ...data };

    
        await env.NOTES.put(id, JSON.stringify(note));

    
        return new Response(JSON.stringify({
            message: 'Data Added Successfully',
            note,}),{
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error in handleCreate:', error);
        return new Response('Error processing request', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
