/**
 * API Service Layer for communication with FastAPI Backend
 */

// Uses relative path to leverage Vite development proxy or custom base
const BASE_URL = '/api';

/**
 * Checks backend server connectivity
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) {
      return { online: false, message: `Server error: ${res.status}` };
    }
    const data = await res.json();
    return { online: true, data };
  } catch (err) {
    return { online: false, message: 'Backend unreachable. Ensure FastAPI server is running.' };
  }
}

/**
 * Sends two questions to the backend to compute similarity
 */
export async function checkDuplicate(question1, question2, threshold = 0.70) {
  try {
    const res = await fetch(`${BASE_URL}/check-duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        question1,
        question2,
        threshold: parseFloat(threshold)
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Failed to calculate question similarity.');
    }

    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Unable to connect to the backend service. Check network or server status.'
    };
  }
}

/**
 * Fetches sample question pairs from backend
 */
export async function fetchSamples() {
  try {
    const res = await fetch(`${BASE_URL}/samples`);
    if (!res.ok) {
      throw new Error('Failed to load sample questions');
    }
    return await res.json();
  } catch (err) {
    console.error('Error fetching sample questions:', err);
    return [];
  }
}
