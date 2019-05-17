/* eslint-disable */
import { stores } from '@sapper/app';

export async function attemptCharge(body) {
  const { session } = stores();
  try {
    const response = await fetch('/api/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw response;
    }
    const output = await response.json();
    session.update(sessionObj => ({
      user: { ...sessionObj.user, credits: output.credits },
    }));
  } catch (error) {
    console.error('Purchase failed: ', error);
  }
}
