import {Arguments} from "yargs";
import ConfigService from "../services/config.service";

const configService = new ConfigService()

export default function delZone(params: Arguments) {
    const zoneName: string = params.zoneName as string
    configService.deleteDnsZone(zoneName)
}