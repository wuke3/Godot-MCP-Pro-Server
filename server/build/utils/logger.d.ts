export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
}
declare class Logger {
    private level;
    setLevel(level: LogLevel): void;
    debug(message: string, ...args: unknown[]): void;
    info(message: string, ...args: unknown[]): void;
    warn(message: string, ...args: unknown[]): void;
    error(message: string, ...args: unknown[]): void;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map