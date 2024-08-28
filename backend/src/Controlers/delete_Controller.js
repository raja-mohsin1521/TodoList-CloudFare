export async function handleDelete(request, env) {
    try {
        const { id } = await request.json();
        console.log('Deleting key with ID:', id);
        await env.NOTES.delete(id);

        return new Response(
            JSON.stringify({
                message: 'Note Deleted Successfully',
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
                    'Pragma': 'no-cache', // For backward compatibility
                    'Expires': '0' // For backward compatibility
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Error processing request' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
                    'Pragma': 'no-cache', // For backward compatibility
                    'Expires': '0' // For backward compatibility
                },
            }
        );
    }
}
