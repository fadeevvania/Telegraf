import { session,Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { Command } from "./commands/Comands";
import { StartCommand } from "./commands/ICommands";
import { ConfigService } from "./config/ConfigService";
import { IConfigService } from "./config/IConfigService";
import { IBotContext } from "./context/IContext";

class Bot{
    bot:Telegraf<IBotContext>;
    commands:Command[] = [];

    constructor (private readonly configServise: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configServise.getKey("TOKEN"))
        this.bot.use((new LocalSession({database: 'jokebotsessions.json'})).middleware())
    }
    init(){
        this.commands = [new StartCommand(this.bot)]
        for(const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}
const bot = new Bot(new ConfigService())
    bot.init();