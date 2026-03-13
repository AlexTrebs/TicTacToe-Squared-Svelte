export async function createGame(userId) {
  const res = await fetch('/api/create-game', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  if (!res.ok) throw new Error('Failed to create game');
  return res.json(); // { code, token }
}

export async function joinGame(userId, code) {
  const res = await fetch('/api/join-game', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, code }),
  });
  if (res.status === 404) throw new Error('Game not found');
  if (!res.ok) throw new Error('Failed to join game');
  return res.json(); // { token }
}
