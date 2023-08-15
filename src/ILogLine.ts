import moment from "moment/moment";

export interface ILogLine {
  level: () => string;
  time: () => moment.Moment;
  payload: () => any;
}
