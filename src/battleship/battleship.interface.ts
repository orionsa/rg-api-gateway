export interface IJoinMatchRes {
  socketId: string;
  matchId: string;
  playerId: string;
}

type TJsonValue = string | number | boolean | IJsonObject | IJsonArray;

export interface IJsonObject {
  [x: string]: TJsonValue;
}

export interface IJsonArray extends Array<TJsonValue> {}
