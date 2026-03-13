import { json, error } from '@sveltejs/kit';
import { GAME_SERVER_URL } from '$env/static/private';

export async function POST({ request }) {
  const body = await request.json();
  const res = await fetch(`${GAME_SERVER_URL}/create-game`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw error(500, 'Failed to create game');
  return json(await res.json());
}
