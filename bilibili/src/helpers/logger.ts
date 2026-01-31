type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  timestamp: string;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry = this.formatMessage(level, message, context);
    const output = `[${entry.timestamp}] [${level.toUpperCase()}] ${message} ${
      context ? JSON.stringify(context) : ""
    }`;

    switch (level) {
      case "info":
        console.log(output);
        break;
      case "warn":
        console.warn(output);
        break;
      case "error":
        console.error(output);
        break;
      case "debug":
        console.debug(output);
        break;
    }
  }

  info(message: string, context?: Record<string, any>) {
    this.log("info", message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log("warn", message, context);
  }

  error(message: string, context?: Record<string, any>) {
    this.log("error", message, context);
  }

  reportError(error: Error, context?: Record<string, any>) {
    this.error(error.message, {
      ...context,
      stack: error.stack,
      name: error.name,
    });
    // In a real app, this is where you'd send the error to Sentry, etc.
  }

  debug(message: string, context?: Record<string, any>) {
    this.log("debug", message, context);
  }

  // Helper for tracking durations
  async trackDuration<T>(
    name: string,
    fn: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> {
    const start = performance.now();
    this.info(`Starting ${name}`, context);
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.info(`Completed ${name}`, {
        ...context,
        durationMs: Math.round(duration),
      });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.error(`Failed ${name}`, {
        ...context,
        durationMs: Math.round(duration),
        error: (error as Error).message,
      });
      throw error;
    }
  }
}

export const logger = new Logger();
