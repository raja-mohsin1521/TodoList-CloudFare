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
                    const value = await env.NOTES.get(key.name);
                    return { key: key.name, value: JSON.parse(value) };
                } catch (e) {
                    console.error(`Error parsing value for key ${key.name}:`, e);
                    return { key: key.name, value: null };
                }
            })
        );

        return new Response(JSON.stringify(values), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.error('Error in handleReadAll:', e);
        return new Response('Internal Server Error', { status: 500 });
    }
}
