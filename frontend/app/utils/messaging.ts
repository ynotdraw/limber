import { decompressFromEncodedURIComponent } from 'lz-string';

/**
 * NOTE: window's on message handler receives *a lot* of messages
 *   (esp from various browser extensions)
 *
 */
export type Format = 'glimdown' | 'gjs' | 'hbs';

export type NewContent = {
  format: Format;
  content: string;
};

export type Ready = { status: 'ready' };
export type Success = { status: 'success' };
export type CompileBegin = { status: 'compile-begin' };
export type Error =
  | { error: string }
  | { error: string; unrecoverable: true }
  | { error: string; errorLine: number };

export type OutputError = Error;

type FromLimber = { from: 'limber' };
type FromLimberOutput = { from: 'limber-output' };

export type FromParent = FromLimber & ToOutput;
export type ToOutput = NewContent;

export type FromOutput = FromLimberOutput & ToParent;
export type ToParent = Ready | Error | Success | CompileBegin;

export const DEFAULT_FORMAT = 'glimdown' as const;
export const ALLOWED_FORMATS = [DEFAULT_FORMAT, 'gjs', 'hbs'] as const;
export const STATUSES = ['ready', 'error'] as const;

export function isAllowedFormat(x?: string | null): x is Format {
  return Boolean(x && (ALLOWED_FORMATS as readonly string[]).includes(x));
}

export function hasAllowedFormat<T extends { format?: string }>(x: T): x is T & NewContent {
  return isAllowedFormat(x.format);
}

export function formatFrom(x: string | undefined | null): Format {
  if (isAllowedFormat(x)) {
    return x;
  }

  return DEFAULT_FORMAT;
}

export const hasFrom = (x?: object): x is { from: unknown } => Boolean(x && 'from' in x);
export const hasFormat = (x?: object): x is { format: unknown } => Boolean(x && 'format' in x);
export const hasContent = (x?: object): x is { content: unknown } => Boolean(x && 'content' in x);

export function fromOutput<T extends { from?: string }>(x?: T | null): x is T & FromOutput {
  if (!x) return false;

  if ('from' in x && x.from) {
    return x.from === 'limber-output';
  }

  return false;
}

export function fromParent<T extends { from?: string }>(x?: T | null): x is T & FromParent {
  if (!x) return false;

  if ('from' in x && x.from) {
    return x.from === 'limber';
  }

  return false;
}

export function fileFromParams(search: string | object = location.search) {
  let qps = new URLSearchParams(typeof search === 'string' ? search : Object.entries(search));

  return {
    text: getText(qps) ?? null,
    format: formatFrom(qps.get('format')),
  };
}

function getText(qps: URLSearchParams) {
  let c = qps.get('c');

  if (c) {
    return decompressFromEncodedURIComponent(c);
  }

  let t = qps.get('t');

  if (t) {
    return t;
  }

  return;
}
