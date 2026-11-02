/** Shared contact-form rules, used by the form (instant feedback) and the API route (authoritative check). */

export const CONTACT_TOPICS = [
  "Collaboration",
  "Educational video production",
  "AI engineering",
  "Other",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export interface ContactPayload {
  name: string;
  email: string;
  organisation: string;
  topic: ContactTopic;
  message: string;
  /** Honeypot: real visitors leave this empty. */
  website: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(
  input: Partial<Record<keyof ContactPayload, unknown>>,
): { ok: true; data: ContactPayload } | { ok: false; errors: ContactErrors } {
  const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

  const data: ContactPayload = {
    name: text(input.name),
    email: text(input.email),
    organisation: text(input.organisation),
    topic: CONTACT_TOPICS.find((topic) => topic === input.topic) ?? "Other",
    message: text(input.message),
    website: text(input.website),
  };

  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Please enter your name (at least 2 characters).";
  else if (data.name.length > 80) errors.name = "Name must be 80 characters or fewer.";

  if (!EMAIL_PATTERN.test(data.email)) errors.email = "Please enter a valid email address.";
  else if (data.email.length > 254) errors.email = "Email must be 254 characters or fewer.";

  if (data.organisation.length > 120) {
    errors.organisation = "Organisation must be 120 characters or fewer.";
  }

  if (data.message.length < 20) errors.message = "Message should be at least 20 characters.";
  else if (data.message.length > 2000) errors.message = "Message must be 2000 characters or fewer.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}
