import {CommandModule} from "yargs";
import { run} from "../commands";

export default {
    command: "run [zones...]",
    aliases: ["r"],
    describe: "Runs the update",
    handler: run,
    builder: {
        zones: {
            describe: "List of zones to run the update on",
            alias: 'z',
            array: true
        }
    }
} as CommandModule