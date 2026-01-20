import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
  })
);

const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    // 🔴 Error logs
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),

    // 🟢 Success / Info logs
    new winston.transports.File({
      filename: path.join("logs", "combined.log"),
    }),
  ],
});

// Console logs (for dev)
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      ),
    })
  );
}

export default logger;
