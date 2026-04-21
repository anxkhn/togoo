const CLIENT_API_BASE = "/api/p";

export const clientApi = {
  createEvent: () => CLIENT_API_BASE,
  event: (eventId: string) => `${CLIENT_API_BASE}/${eventId}`,
  participants: (eventId: string) => `${CLIENT_API_BASE}/${eventId}/participants`,
  participant: (eventId: string, participantId: string) =>
    `${CLIENT_API_BASE}/${eventId}/participants/${participantId}`,
  participantToken: (eventId: string, participantId: string) =>
    `${CLIENT_API_BASE}/${eventId}/participants/${participantId}/token`,
  respond: (eventId: string) => `${CLIENT_API_BASE}/${eventId}/respond`,
  recommendations: (eventId: string) => `${CLIENT_API_BASE}/${eventId}/recommendations`,
  finalize: (eventId: string) => `${CLIENT_API_BASE}/${eventId}/finalize`,
  reopen: (eventId: string) => `${CLIENT_API_BASE}/${eventId}/reopen`,
  overrides: (eventId: string) => `${CLIENT_API_BASE}/${eventId}/overrides`,
};
