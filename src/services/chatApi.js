/**
 * Chat API Service
 * Handles all communication with the RAG backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Configuration
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Make API request with timeout
 */
async function makeRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - backend took too long to respond');
    }
    throw error;
  }
}

/**
 * Send chat message to backend
 * @param {string} message - User message
 * @param {string} conversationId - Conversation ID (optional, generates new if not provided)
 * @returns {Promise<Object>} Chat response with answer, sources, and metrics
 */
export async function sendChatMessage(message, conversationId = null) {
  const payload = {
    message,
    conversation_id: conversationId,
  };

  return makeRequest('/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Get health status of backend
 * @returns {Promise<Object>} Health status
 */
export async function getHealth() {
  return makeRequest('/health', {
    method: 'GET',
  });
}

/**
 * Get pipeline statistics
 * @returns {Promise<Object>} Pipeline stats
 */
export async function getStats() {
  return makeRequest('/stats', {
    method: 'GET',
  });
}

/**
 * Reingest data and rebuild vector stores
 * @returns {Promise<Object>} Reingest status
 */
export async function reingестData() {
  return makeRequest('/reingest', {
    method: 'POST',
  });
}

/**
 * Check if backend is available
 * @returns {Promise<boolean>} True if backend is healthy
 */
export async function isBackendAvailable() {
  try {
    const response = await getHealth();
    return response?.status === 'healthy';
  } catch {
    return false;
  }
}

export default {
  sendChatMessage,
  getHealth,
  getStats,
  reingестData,
  isBackendAvailable,
};
