import chalk from "chalk";
import boxen from "boxen";

const boxenOptions: boxen.Options = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green"
};

const message = chalk.green(
    "____________ _   _  _____ _____ _ _            _   \n" +
    "|  _  \\  _  \\ \\ | |/  ___/  __ \\ (_)          | |  \n" +
    "| | | | | | |  \\| |\\ `--.| /  \\/ |_  ___ _ __ | |_ \n" +
    "| | | | | | | . ` | `--. \\ |   | | |/ _ \\ '_ \\| __|\n" +
    "| |/ /| |/ /| |\\  |/\\__/ / \\__/\\ | |  __/ | | | |_ \n" +
    "|___/ |___/ \\_| \\_/\\____/ \\____/_|_|\\___|_| |_|\\__|\n")

export default boxen(message, boxenOptions)