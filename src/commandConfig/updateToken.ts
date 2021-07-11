import {updateToken} from "../commands";
import {CommandModule} from "yargs";

export default {
    command: "updateToken <zoneName> [apiToken]",
    aliases: ["u"],
    describe: "Updates the token for a zone",
    handler: updateToken,
    builder: {
        zoneName: {
            describe: "Name of the DNS Zone",
            demand: true,
        },
        apiToken: {
            describe: "API Token to edit the zone",
            alias: 'k',
            demand: true,
        },
    }
} as CommandModule