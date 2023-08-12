import moment from "moment";

import { memoizeOnce } from "./utils/memoizeOnce.js";

const SEPARATOR = " - ";

export class LogLineParser {
  // ParseLogLine parses log line of the following format: `<ISO Date> - <Log Level> - <JSON Payload>`.
  // Parsing is done in lazy manner, to avoid unnecessary parsing, if not all fields are used.
  // Throws if the described format is not met.
  static parseLogLine(line) {
    const sep0 = line.indexOf(SEPARATOR);
    if (sep0 === -1) {
      throw new Error("LogLineParser: missing separator");
    }
    const sep1 = line.indexOf(SEPARATOR, sep0 + SEPARATOR.length);
    if (sep1 === -1) {
      throw new Error("LogLineParser: missing separator");
    }

    return {
      level: memoizeOnce(() => line.slice(sep0 + SEPARATOR.length, sep1)),

      time: memoizeOnce(() => {
        const s = line.slice(0, sep0);
        if (!s) {
          throw new Error("LogLineParser: empty date");
        }

        const date = moment(s, moment.ISO_8601, true);
        if (!date.isValid()) {
          throw new Error(`LogLineParser: failed to parse date`);
        }
        return date;
      }),

      payload: memoizeOnce(() => {
        const s = line.slice(sep1 + SEPARATOR.length);
        if (!s) {
          throw new Error("LogLineParser: empty JSON payload");
        }
        try {
          return JSON.parse(s);
        } catch (e) {
          throw new Error(`LogLineParser: failed to parse JSON payload, ${e}`);
        }
      }),
    };
  }
}
