import { Context } from "telegraf";

export interface SessionData {
    tellJoke: boolean;
    sendMeme: boolean;
}

export interface IBotContext extends Context {
    session: SessionData;
}