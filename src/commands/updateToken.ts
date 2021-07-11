import {Arguments} from "yargs";
import ConfigService from "../services/config.service";

const configService = new ConfigService();

export default function updateToken(params: Arguments) {
    const {zoneName, apiToken} = params
    configService.updateToken(zoneName as string, apiToken as string)
}