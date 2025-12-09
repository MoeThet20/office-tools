import type { LogEntry } from '../types';

export function parseLogInput(input: string): LogEntry[] {
  const data: LogEntry[] = [];

  // Strategy 1: Try to parse as single JSON object or array
  try {
    const singleObj = JSON.parse(input);
    return Array.isArray(singleObj) ? singleObj : [singleObj];
  } catch (e) {
    // Strategy 2: Character-by-character parsing for concatenated objects
    let depth = 0;
    let current = '';
    let inString = false;
    let escapeNext = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (escapeNext) {
        current += char;
        escapeNext = false;
        continue;
      }

      if (char === '\\') {
        escapeNext = true;
        current += char;
        continue;
      }

      if (char === '"') {
        inString = !inString;
      }

      if (!inString) {
        if (char === '{') {
          depth++;
        } else if (char === '}') {
          depth--;
        }
      }

      current += char;

      // Complete object found
      if (depth === 0 && current.trim().length > 0 && current.trim().endsWith('}')) {
        try {
          const obj = JSON.parse(current.trim());
          data.push(obj);
          current = '';
        } catch (e) {
          console.error('Failed to parse:', current.substring(0, 100));
        }
      }
    }
  }

  return data;
}

export function extractLogs(data: LogEntry[]): string[] {
  const logs: string[] = [];

  for (const item of data) {
    if (item && typeof item === 'object') {
      // Check for 'log' field
      if ('log' in item && typeof item.log === 'string') {
        logs.push(item.log);
      }
      // Also check if the whole object might be nested
      else if (item.kubernetes && typeof item.kubernetes === 'object' && 'log' in item.kubernetes) {
        const kubeLog = (item.kubernetes as { log?: string }).log;
        if (kubeLog) {
          logs.push(kubeLog);
        }
      }
    }
  }

  return logs;
}
