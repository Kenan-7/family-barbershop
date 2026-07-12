export type ContactFormPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDay: string;
  preferredTime: string;
  message: string;
  website?: string;
};

export type ContactApiResponse = {
  ok: boolean;
  message: string;
};
