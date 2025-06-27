

export function logEvent(type, message, extra = {}) {
  const log = {
    timestamp: new Date().toISOString(),
    type,
    message,
    ...extra,
  };

  console.log(`[${log.timestamp}] [${log.type}] ${log.message}`);

}
