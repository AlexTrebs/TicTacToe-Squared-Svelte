import { json, error } from '@sveltejs/kit';
import { GAME_SERVER_URL } from '$env/static/private';

export async function POST({ request }) {
  const body = await request.json();
  const res = await fetch(`${GAME_SERVER_URL}/join-game`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.status === 404) throw error(404, 'Game not found');
  if (!res.ok) throw error(500, 'Failed to join game');
  return json(await res.json());
}
