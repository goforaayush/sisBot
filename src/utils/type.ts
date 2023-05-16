import App from '@slack/bolt/dist/App';
import {KnownEventFromType} from '@slack/bolt/dist/types/events';
import {StringIndexed} from '@slack/bolt/dist/types/helpers';
import {SayFn} from '@slack/bolt/dist/types/utilities';

export type keyPromise = Promise<string | null>;
export type keyValueType = string | null;
export interface batchScore {
  score: number;
  value: string;
}
[];
export type scorePromise = Promise<number | null>;
export type scoreType = number | null;
export type roleType = string | undefined;
export interface AppMessage {
  message: KnownEventFromType<'message'>;
  say: SayFn;
}
export type appInstance = App<StringIndexed>;
