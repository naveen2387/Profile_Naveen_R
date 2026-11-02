"use client";

import { useId, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT_TOPICS, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: ContactPayload = {
  name: "",
  email: "",
  organisation: "",
  topic: "Collaboration",
  message: "",
  website: "",
};

const FIELD_CLASS =
  "w-full rounded-2xl border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/60";

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const ids = {
    name: useId(),
    email: useId(),
    organisation: useId(),
    topic: useId(),
    message: useId(),
    feedback: useId(),
  };

  const update = (field: keyof ContactPayload, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submittedOnce) {
      const result = validateContact(next);
      setErrors(result.ok ? {} : result.errors);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedOnce(true);

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("error");
      setMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: ContactErrors;
      };

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "Thanks, your message has been sent.");
        setValues(EMPTY_VALUES);
        setSubmittedOnce(false);
        return;
      }

      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setMessage(data.message ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Network error: your message was not sent. Check your connection and try again.");
    }
  };

  const fieldClass = (field: keyof ContactErrors) =>
    cn(FIELD_CLASS, errors[field] ? "border-warning/60" : "border-border focus:border-accent-soft");

  return (
    <form onSubmit={onSubmit} noValidate className="glass space-y-6 rounded-3xl p-6 sm:p-8" aria-describedby={ids.feedback}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={ids.name} className="text-sm font-medium text-foreground">
            Name <span className="text-warning" aria-hidden="true">*</span>
          </label>
          <input
            id={ids.name}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            placeholder="Your name"
            className={fieldClass("name")}
          />
          {errors.name && <FieldError id={`${ids.name}-error`} message={errors.name} />}
        </div>

        <div className="space-y-2">
          <label htmlFor={ids.email} className="text-sm font-medium text-foreground">
            Email <span className="text-warning" aria-hidden="true">*</span>
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            placeholder="you@example.com"
            className={fieldClass("email")}
          />
          {errors.email && <FieldError id={`${ids.email}-error`} message={errors.email} />}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={ids.organisation} className="text-sm font-medium text-foreground">
            Organisation <span className="text-subtle">(optional)</span>
          </label>
          <input
            id={ids.organisation}
            name="organisation"
            autoComplete="organization"
            value={values.organisation}
            onChange={(event) => update("organisation", event.target.value)}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={errors.organisation ? `${ids.organisation}-error` : undefined}
            placeholder="Company or school"
            className={fieldClass("organisation")}
          />
          {errors.organisation && <FieldError id={`${ids.organisation}-error`} message={errors.organisation} />}
        </div>

        <div className="space-y-2">
          <label htmlFor={ids.topic} className="text-sm font-medium text-foreground">
            Topic
          </label>
          <select
            id={ids.topic}
            name="topic"
            value={values.topic}
            onChange={(event) => update("topic", event.target.value)}
            className={cn(fieldClass("topic"), "border-border focus:border-accent-soft cursor-pointer")}
          >
            {CONTACT_TOPICS.map((topic) => (
              <option key={topic} value={topic} className="bg-surface">
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={ids.message} className="text-sm font-medium text-foreground">
          Message <span className="text-warning" aria-hidden="true">*</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={6}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${ids.message}-error` : undefined}
          placeholder="Tell me about the idea, the project or the collaboration you have in mind."
          className={cn(fieldClass("message"), "resize-y")}
        />
        <div className="flex items-start justify-between gap-4">
          {errors.message ? <FieldError id={`${ids.message}-error`} message={errors.message} /> : <span />}
          <span className="shrink-0 text-xs text-subtle">{values.message.trim().length}/2000</span>
        </div>
      </div>

      {/* Honeypot: hidden from people and screen readers, filled only by automated form fillers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${ids.name}-website`}>Website</label>
        <input
          id={`${ids.name}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div id={ids.feedback} role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
          {status === "success" && (
            <p className="inline-flex items-start gap-2 text-success">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {message}
            </p>
          )}
          {status === "error" && (
            <p className="inline-flex items-start gap-2 text-warning">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-gradient inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="text-xs text-warning">
      {message}
    </p>
  );
}
