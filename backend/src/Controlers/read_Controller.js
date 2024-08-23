export async function handleReadAll(request, env) {
    let cursor;
    const allKeys = [];

    do {
        const listResponse = await env.NOTES.list({ cursor });
        allKeys.push(...listResponse.keys);
        cursor = listResponse.cursor;
    } while (cursor);

    const values = await Promise.all(
        allKeys.map(async (key) => {
            const value = await env.NOTES.get(key.name);
            return { key: key.name, value: JSON.parse(value) };
        })
    );

    return new Response(JSON.stringify(values), {
        headers: { 'Content-Type': 'application/json' },
    });
}