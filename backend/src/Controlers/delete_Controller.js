export async function handleDelete(request, env) {
    try {
        const { id } = await request.json();
        console.log('Deleting note with ID:', id);

        // Get the note from the KV store using the ID
        const note = await env.NOTES.get(id, { type: 'json' });

        if (!note) {
            return new Response(
                JSON.stringify({ message: 'Note not found' }),
                {
                    status: 404,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache, no-store, must-revalidate', 
                        'Pragma': 'no-cache', 
                        'Expires': '0' 
                    },
                }
            );
        }

        // Extract the image path from the note
        const imagePath = note.imageurl;

        if (imagePath) {
            // Construct the image key
            const imageKey = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
            console.log('Deleting image with key:', imageKey);

            // Check if R2_BUCKET is defined
            if (!env.R2_BUCKET) {
                throw new Error('R2_BUCKET binding is not defined');
            }

            // Attempt to delete the image from R2
            const deleteResult = await env.R2_BUCKET.delete(imageKey);
            if (deleteResult === true) {
                console.log('Successfully deleted image from R2 with key:', imageKey);
            } else {
                console.error('Failed to delete image from R2 with key:', imageKey);
            }
        } else {
            console.log('No image URL found for the note.');
        }

        // Delete the note from the KV store
        await env.NOTES.delete(id);

        return new Response(
            JSON.stringify({ message: 'Note and associated image deleted successfully' }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate', 
                    'Pragma': 'no-cache', 
                    'Expires': '0' 
                },
            }
        );
    } catch (error) {
        console.error('Error processing delete request:', error);
        return new Response(
            JSON.stringify({ message: 'Error processing request' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate', 
                    'Pragma': 'no-cache', 
                    'Expires': '0' 
                },
            }
        );
    }
}
