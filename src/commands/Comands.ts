import {Telegraf} from "telegraf";
import { IBotContext } from "../context/IContext";

export abstract class Command {
    constructor(public bot:Telegraf<IBotContext>){}

    abstract handle():void;
}