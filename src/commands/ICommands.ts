import { Command } from "./Comands";
import {Telegraf,Markup} from "telegraf";
import { IBotContext } from "../context/IContext";
import { send } from "process";

export class StartCommand extends Command{
    constructor(public bot: Telegraf<IBotContext>){
        super(bot);
    }
    handle(): void{
        this.bot.start((context) => {
            console.log(context.session);
            context.reply("Что ты хочешь?", Markup.inlineKeyboard([
                Markup.button.callback("Анекдот", "joke" ),
                Markup.button.callback("Мем", "meme" ),
                Markup.button.callback("Ничего", "No")
            ]))
        })

        this.bot.action("joke", (context) => {
            context.session.tellJoke = true;
            context.session.sendMeme=false;
            context.editMessageText("Лёше сказали что фистинг, это не больно."+ " \r\n" +"Обманули дурака на четыре кулака :D")
        })
        this.bot.action("No", (context) => {
           context.session.sendMeme = false;
           context.session.tellJoke=false;
            context.editMessageText("Ну и ладно...")
        })
        this.bot.action("meme",(context) =>{
            context.session.sendMeme=true;
            context.session.tellJoke=false
            context.editMessageText("Я пока что не умею присылать мемы, сори")
            ;
        })
    }
}