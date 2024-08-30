// src/Controlers/create_Controller.js

export async function handleCreate(request, env) {
    try {
        const formData = await request.formData();
        const imageFile = formData.get('image');
        const title = formData.get('title') || 'No title provided';
        const message = formData.get('message') || 'No message provided';

        if (!imageFile) {
            return new Response('No image provided', { status: 400 });
        }

        const imageKey = `${crypto.randomUUID()}-${imageFile.name}`;
        await env.MY_BUCKET.put(imageKey, imageFile.stream(), {
            httpMetadata: {
                contentType: imageFile.type,
            },
        });

        const note = {
            id: crypto.randomUUID(),
            imageUrl: imageKey,
            title,
            message,
            date: new Date().toISOString(), // Add the current date
        };

        await env.NOTES.put(note.id, JSON.stringify(note));

        return new Response(JSON.stringify({ message: 'Note Added Successfully', note }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error processing request', {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
