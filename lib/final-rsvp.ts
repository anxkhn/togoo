export const FINAL_RSVP_STATUS = {
  pending: 0,
  yes: 1,
  no: 2,
} as const;

export type FinalRsvpStatus = keyof typeof FINAL_RSVP_STATUS;
export type FinalRsvpStatusCode = (typeof FINAL_RSVP_STATUS)[FinalRsvpStatus];

const FINAL_RSVP_STATUS_BY_CODE: Record<FinalRsvpStatusCode, FinalRsvpStatus> = {
  [FINAL_RSVP_STATUS.pending]: "pending",
  [FINAL_RSVP_STATUS.yes]: "yes",
  [FINAL_RSVP_STATUS.no]: "no",
};

export function encodeFinalRsvpStatus(status: FinalRsvpStatus): FinalRsvpStatusCode {
  return FINAL_RSVP_STATUS[status];
}

export function decodeFinalRsvpStatus(code: number): FinalRsvpStatus {
  return FINAL_RSVP_STATUS_BY_CODE[code as FinalRsvpStatusCode] ?? "pending";
}
