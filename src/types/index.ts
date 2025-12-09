export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface LogEntry {
  log?: string;
  kubernetes?: {
    log?: string;
  };
  [key: string]: unknown;
}

export interface LogStats {
  totalCount: number;
  charCount: number;
}
