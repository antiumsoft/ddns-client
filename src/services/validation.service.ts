import isValidDomain from "is-valid-domain";
import {red, green} from "chalk";

export default class ValidationService {
    isValidDomain = (text: string): boolean => isValidDomain(text, {
        subdomain: true, // www.domain.tld is valid
        wildcard: false, // es. *.domain.tld is not allowed
        allowUnicode: false // es. はじめよう.みんな is not allowed - you should send punycode domains
    })
    isSubdomainOf = (domain: string, zone: string) => {
        let subdomain = domain.toLowerCase().split(zone.toLowerCase())[0]
        return (subdomain + zone.toLowerCase()) === domain.toLowerCase()
    }

    public validateDomains(zone: string, domains: string[]) {
        if (!this.isValidDomain(zone)) {
            console.log(red('The Zone domain is not valid'), red.bold(zone))
            process.exit(1)
        }
        domains.forEach(domain => {
            if (!this.isValidDomain(domain)) {
                console.log(red('The domain is not valid: '), red.bold(domain))
                process.exit(1)
            }
            if (!this.isSubdomainOf(domain, zone)) {
                console.log(red('The domain'), red.bold(domain), red('is not a subdomain of'), red.bold(zone))
                process.exit(1)
            }
        })
        console.log(green('Validated the zone'), green.bold(zone), green('all domains are subdomains of it'));
    }
}