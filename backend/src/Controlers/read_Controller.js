// src/Controlers/read_Controller.js

export async function handleReadAll(request, env) {
    let cursor;
    const allKeys = [];

    try {
        do {
            const listResponse = await env.NOTES.list({ cursor });
            allKeys.push(...listResponse.keys);
            cursor = listResponse.cursor;
        } while (cursor);

        const values = await Promise.all(
            allKeys.map(async (key) => {
                try {
                    const note = JSON.parse(await env.NOTES.get(key.name));
                    const imageUrl = `${note.imageUrl}`;
                    return { id: key.name, note: { ...note, imageUrl } };
                } catch (e) {
                    return { id: key.name, note: null };
                }
            })
        );

        return new Response(JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        return new Response(`Internal Server Error: ${e.message}`, { status: 500 });
    }
}
