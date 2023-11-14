import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    currencies = [
        { currencyCode: 'AED', name: 'UAE Dirham', pais: 'United Arab Emirates', isoCode: 'ae', flag: '' },
        { currencyCode: 'AFN', name: 'Afghan Afghani', pais: 'Afghanistan', isoCode: 'af', flag: '' },
        { currencyCode: 'ALL', name: 'Albanian Lek', pais: 'Albania', isoCode: 'al', flag: '' },
        { currencyCode: 'AMD', name: 'Armenian Dram', pais: 'Armenia', isoCode: 'am', flag: '' },
        { currencyCode: 'AOA', name: 'Angolan Kwanza', pais: 'Angola', isoCode: 'ao', flag: '' },
        { currencyCode: 'ARS', name: 'Argentine Peso', pais: 'Argentina', isoCode: 'ar', flag: '' },
        { currencyCode: 'AUD', name: 'Australian Dollar', pais: 'Australia', isoCode: 'au', flag: '' },
        { currencyCode: 'AWG', name: 'Aruban Florin', pais: 'Aruba', isoCode: 'aw', flag: '' },
        { currencyCode: 'AZN', name: 'Azerbaijani Manat', pais: 'Azerbaijan', isoCode: 'az', flag: '' },
        { currencyCode: 'BAM', name: 'Bosnia and Herzegovina Mark', pais: 'Bosnia and Herzegovina', isoCode: 'ba', flag: '' },
        { currencyCode: 'BBD', name: 'Barbados Dollar', pais: 'Barbados', isoCode: 'bb', flag: '' },
        { currencyCode: 'BDT', name: 'Bangladeshi Taka', pais: 'Bangladesh', isoCode: 'bd', flag: '' },
        { currencyCode: 'BGN', name: 'Bulgarian Lev', pais: 'Bulgaria', isoCode: 'bg', flag: '' },
        { currencyCode: 'BHD', name: 'Bahraini Dinar', pais: 'Bahrain', isoCode: 'bh', flag: '' },
        { currencyCode: 'BIF', name: 'Burundian Franc', pais: 'Burundi', isoCode: 'bi', flag: '' },
        { currencyCode: 'BMD', name: 'Bermudian Dollar', pais: 'Bermuda', isoCode: 'bm', flag: '' },
        { currencyCode: 'BND', name: 'Brunei Dollar', pais: 'Brunei', isoCode: 'bn', flag: '' },
        { currencyCode: 'BOB', name: 'Bolivian Boliviano', pais: 'Bolivia', isoCode: 'bo', flag: '' },
        { currencyCode: 'BRL', name: 'Brazilian Real', pais: 'Brazil', isoCode: 'br', flag: '' },
        { currencyCode: 'BSD', name: 'Bahamian Dollar', pais: 'Bahamas', isoCode: 'bs', flag: '' },
        { currencyCode: 'BTN', name: 'Bhutanese Ngultrum', pais: 'Bhutan', isoCode: 'bt', flag: '' },
        { currencyCode: 'BWP', name: 'Botswana Pula', pais: 'Botswana', isoCode: 'bw', flag: '' },
        { currencyCode: 'BYN', name: 'Belarusian Ruble', pais: 'Belarus', isoCode: 'by', flag: '' },
        { currencyCode: 'BZD', name: 'Belize Dollar', pais: 'Belize', isoCode: 'bz', flag: '' },
        { currencyCode: 'CAD', name: 'Canadian Dollar', pais: 'Canada', isoCode: 'ca', flag: '' },
        { currencyCode: 'CDF', name: 'Congolese Franc', pais: 'Democratic Republic of the Congo', isoCode: 'cd', flag: '' },
        { currencyCode: 'CHF', name: 'Swiss Franc', pais: 'Switzerland', isoCode: 'ch', flag: '' },
        { currencyCode: 'CLP', name: 'Chilean Peso', pais: 'Chile', isoCode: 'cl', flag: '' },
        { currencyCode: 'CNY', name: 'Chinese Renminbi', pais: 'China', isoCode: 'cn', flag: '' },
        { currencyCode: 'COP', name: 'Colombian Peso', pais: 'Colombia', isoCode: 'co', flag: '' },
        { currencyCode: 'CRC', name: 'Costa Rican Colon', pais: 'Costa Rica', isoCode: 'cr', flag: '' },
        { currencyCode: 'CUP', name: 'Cuban Peso', pais: 'Cuba', isoCode: 'cu', flag: '' },
        { currencyCode: 'CVE', name: 'Cape Verdean Escudo', pais: 'Cape Verde', isoCode: 'cv', flag: '' },
        { currencyCode: 'CZK', name: 'Czech Koruna', pais: 'Czech Republic', isoCode: 'cz', flag: '' },
        { currencyCode: 'DJF', name: 'Djiboutian Franc', pais: 'Djibouti', isoCode: 'dj', flag: '' },
        { currencyCode: 'DKK', name: 'Danish Krone', pais: 'Denmark', isoCode: 'dk', flag: '' },
        { currencyCode: 'DOP', name: 'Dominican Peso', pais: 'Dominican Republic', isoCode: 'do', flag: '' },
        { currencyCode: 'DZD', name: 'Algerian Dinar', pais: 'Algeria', isoCode: 'dz', flag: '' },
        { currencyCode: 'EGP', name: 'Egyptian Pound', pais: 'Egypt', isoCode: 'eg', flag: '' },
        { currencyCode: 'ERN', name: 'Eritrean Nakfa', pais: 'Eritrea', isoCode: 'er', flag: '' },
        { currencyCode: 'ETB', name: 'Ethiopian Birr', pais: 'Ethiopia', isoCode: 'et', flag: '' },
        { currencyCode: 'EUR', name: 'Euro', pais: 'European Union', isoCode: 'eu', flag: '' },
        { currencyCode: 'FJD', name: 'Fiji Dollar', pais: 'Fiji', isoCode: 'fj', flag: '' },
        { currencyCode: 'FKP', name: 'Falkland Islands Pound', pais: 'Falkland Islands', isoCode: 'fk', flag: '' },
        { currencyCode: 'FOK', name: 'Faroese Króna', pais: 'Faroe Islands', isoCode: 'fo', flag: '' },
        { currencyCode: 'GBP', name: 'Pound Sterling', pais: 'United Kingdom', isoCode: 'gb', flag: '' },
        { currencyCode: 'GEL', name: 'Georgian Lari', pais: 'Georgia', isoCode: 'ge', flag: '' },
        { currencyCode: 'GGP', name: 'Guernsey Pound', pais: 'Guernsey', isoCode: 'gg', flag: '' },
        { currencyCode: 'GHS', name: 'Ghanaian Cedi', pais: 'Ghana', isoCode: 'gh', flag: '' },
        { currencyCode: 'GIP', name: 'Gibraltar Pound', pais: 'Gibraltar', isoCode: 'gi', flag: '' },
        { currencyCode: 'GMD', name: 'Gambian Dalasi', pais: 'The Gambia', isoCode: 'gm', flag: '' },
        { currencyCode: 'GNF', name: 'Guinean Franc', pais: 'Guinea', isoCode: 'gn', flag: '' },
        { currencyCode: 'GTQ', name: 'Guatemalan Quetzal', pais: 'Guatemala', isoCode: 'gt', flag: '' },
        { currencyCode: 'GYD', name: 'Guyanese Dollar', pais: 'Guyana', isoCode: 'gy', flag: '' },
        { currencyCode: 'HKD', name: 'Hong Kong Dollar', pais: 'Hong Kong', isoCode: 'hk', flag: '' },
        { currencyCode: 'HNL', name: 'Honduran Lempira', pais: 'Honduras', isoCode: 'hn', flag: '' },
        { currencyCode: 'HRK', name: 'Croatian Kuna', pais: 'Croatia', isoCode: 'hr', flag: '' },
        { currencyCode: 'HTG', name: 'Haitian Gourde', pais: 'Haiti', isoCode: 'ht', flag: '' },
        { currencyCode: 'HUF', name: 'Hungarian Forint', pais: 'Hungary', isoCode: 'hu', flag: '' },
        { currencyCode: 'IDR', name: 'Indonesian Rupiah', pais: 'Indonesia', isoCode: 'id', flag: '' },
        { currencyCode: 'ILS', name: 'Israeli New Shekel', pais: 'Israel', isoCode: 'il', flag: '' },
        { currencyCode: 'IMP', name: 'Manx Pound', pais: 'Isle of Man', isoCode: 'im', flag: '' },
        { currencyCode: 'INR', name: 'Indian Rupee', pais: 'India', isoCode: 'in', flag: '' },
        { currencyCode: 'IQD', name: 'Iraqi Dinar', pais: 'Iraq', isoCode: 'iq', flag: '' },
        { currencyCode: 'IRR', name: 'Iranian Rial', pais: 'Iran', isoCode: 'ir', flag: '' },
        { currencyCode: 'ISK', name: 'Icelandic Króna', pais: 'Iceland', isoCode: 'is', flag: '' },
        { currencyCode: 'JEP', name: 'Jersey Pound', pais: 'Jersey', isoCode: 'je', flag: '' },
        { currencyCode: 'JMD', name: 'Jamaican Dollar', pais: 'Jamaica', isoCode: 'jm', flag: '' },
        { currencyCode: 'JOD', name: 'Jordanian Dinar', pais: 'Jordan', isoCode: 'jo', flag: '' },
        { currencyCode: 'JPY', name: 'Japanese Yen', pais: 'Japan', isoCode: 'jp', flag: '' },
        { currencyCode: 'KES', name: 'Kenyan Shilling', pais: 'Kenya', isoCode: 'ke', flag: '' },
        { currencyCode: 'KGS', name: 'Kyrgyzstani Som', pais: 'Kyrgyzstan', isoCode: 'kg', flag: '' },
        { currencyCode: 'KHR', name: 'Cambodian Riel', pais: 'Cambodia', isoCode: 'kh', flag: '' },
        { currencyCode: 'KID', name: 'Kiribati Dollar', pais: 'Kiribati', isoCode: 'ki', flag: '' },
        { currencyCode: 'KMF', name: 'Comorian Franc', pais: 'Comoros', isoCode: 'km', flag: '' },
        { currencyCode: 'KRW', name: 'South Korean Won', pais: 'South Korea', isoCode: 'kr', flag: '' },
        { currencyCode: 'KWD', name: 'Kuwaiti Dinar', pais: 'Kuwait', isoCode: 'kw', flag: '' },
        { currencyCode: 'KYD', name: 'Cayman Islands Dollar', pais: 'Cayman Islands', isoCode: 'ky', flag: '' },
        { currencyCode: 'KZT', name: 'Kazakhstani Tenge', pais: 'Kazakhstan', isoCode: 'kz', flag: '' },
        { currencyCode: 'LAK', name: 'Lao Kip', pais: 'Laos', isoCode: 'la', flag: '' },
        { currencyCode: 'LBP', name: 'Lebanese Pound', pais: 'Lebanon', isoCode: 'lb', flag: '' },
        { currencyCode: 'LKR', name: 'Sri Lankan Rupee', pais: 'Sri Lanka', isoCode: 'lk', flag: '' },
        { currencyCode: 'LRD', name: 'Liberian Dollar', pais: 'Liberia', isoCode: 'lr', flag: '' },
        { currencyCode: 'LSL', name: 'Lesotho Loti', pais: 'Lesotho', isoCode: 'ls', flag: '' },
        { currencyCode: 'LYD', name: 'Libyan Dinar', pais: 'Libya', isoCode: 'ly', flag: '' },
        { currencyCode: 'MAD', name: 'Moroccan Dirham', pais: 'Morocco', isoCode: 'ma', flag: '' },
        { currencyCode: 'MDL', name: 'Moldovan Leu', pais: 'Moldova', isoCode: 'md', flag: '' },
        { currencyCode: 'MGA', name: 'Malagasy Ariary', pais: 'Madagascar', isoCode: 'mg', flag: '' },
        { currencyCode: 'MKD', name: 'Macedonian Denar', pais: 'North Macedonia', isoCode: 'mk', flag: '' },
        { currencyCode: 'MMK', name: 'Myanmar Kyat', pais: 'Myanmar (Burma)', isoCode: 'mm', flag: '' },
        { currencyCode: 'MNT', name: 'Mongolian Tugrik', pais: 'Mongolia', isoCode: 'mn', flag: '' },
        { currencyCode: 'MOP', name: 'Macau Pataca', pais: 'Macau', isoCode: 'mo', flag: '' },
        { currencyCode: 'MRU', name: 'Mauritanian Ouguiya', pais: 'Mauritania', isoCode: 'mr', flag: '' },
        { currencyCode: 'MRU', name: 'Mauritanian Ouguiya (pre-2018)', pais: 'Mauritania', isoCode: 'mr', flag: '' },
        { currencyCode: 'MUR', name: 'Mauritian Rupee', pais: 'Mauritius', isoCode: 'mu', flag: '' },
        { currencyCode: 'MVR', name: 'Maldivian Rufiyaa', pais: 'Maldives', isoCode: 'mv', flag: '' },
        { currencyCode: 'MWK', name: 'Malawian Kwacha', pais: 'Malawi', isoCode: 'mw', flag: '' },
        { currencyCode: 'MXN', name: 'Mexican Peso', pais: 'Mexico', isoCode: 'mx', flag: '' },
        { currencyCode: 'MYR', name: 'Malaysian Ringgit', pais: 'Malaysia', isoCode: 'my', flag: '' },
        { currencyCode: 'MZN', name: 'Mozambican Metical', pais: 'Mozambique', isoCode: 'mz', flag: '' },
        { currencyCode: 'NAD', name: 'Namibian Dollar', pais: 'Namibia', isoCode: 'na', flag: '' },
        { currencyCode: 'NGN', name: 'Nigerian Naira', pais: 'Nigeria', isoCode: 'ng', flag: '' },
        { currencyCode: 'NIO', name: 'Nicaraguan Córdoba', pais: 'Nicaragua', isoCode: 'ni', flag: '' },
        { currencyCode: 'NOK', name: 'Norwegian Krone', pais: 'Norway', isoCode: 'no', flag: '' },
        { currencyCode: 'NPR', name: 'Nepalese Rupee', pais: 'Nepal', isoCode: 'np', flag: '' },
        { currencyCode: 'NZD', name: 'New Zealand Dollar', pais: 'New Zealand', isoCode: 'nz', flag: '' },
        { currencyCode: 'OMR', name: 'Omani Rial', pais: 'Oman', isoCode: 'om', flag: '' },
        { currencyCode: 'PAB', name: 'Panamanian Balboa', pais: 'Panama', isoCode: 'pa', flag: '' },
        { currencyCode: 'PEN', name: 'Peruvian Nuevo Sol', pais: 'Peru', isoCode: 'pe', flag: '' },
        { currencyCode: 'PGK', name: 'Papua New Guinean Kina', pais: 'Papua New Guinea', isoCode: 'pg', flag: '' },
        { currencyCode: 'PHP', name: 'Philippine Peso', pais: 'Philippines', isoCode: 'ph', flag: '' },
        { currencyCode: 'PKR', name: 'Pakistani Rupee', pais: 'Pakistan', isoCode: 'pk', flag: '' },
        { currencyCode: 'PLN', name: 'Polish Złoty', pais: 'Poland', isoCode: 'pl', flag: '' },
        { currencyCode: 'PYG', name: 'Paraguayan Guarani', pais: 'Paraguay', isoCode: 'py', flag: '' },
        { currencyCode: 'QAR', name: 'Qatari Riyal', pais: 'Qatar', isoCode: 'qa', flag: '' },
        { currencyCode: 'RON', name: 'Romanian Leu', pais: 'Romania', isoCode: 'ro', flag: '' },
        { currencyCode: 'RSD', name: 'Serbian Dinar', pais: 'Serbia', isoCode: 'rs', flag: '' },
        { currencyCode: 'RUB', name: 'Russian Ruble', pais: 'Russia', isoCode: 'ru', flag: '' },
        { currencyCode: 'RWF', name: 'Rwandan Franc', pais: 'Rwanda', isoCode: 'rw', flag: '' },
        { currencyCode: 'SAR', name: 'Saudi Riyal', pais: 'Saudi Arabia', isoCode: 'sa', flag: '' },
        { currencyCode: 'SBD', name: 'Solomon Islands Dollar', pais: 'Solomon Islands', isoCode: 'sb', flag: '' },
        { currencyCode: 'SCR', name: 'Seychellois Rupee', pais: 'Seychelles', isoCode: 'sc', flag: '' },
        { currencyCode: 'SDG', name: 'Sudanese Pound', pais: 'Sudan', isoCode: 'sd', flag: '' },
        { currencyCode: 'SEK', name: 'Swedish Krona', pais: 'Sweden', isoCode: 'se', flag: '' },
        { currencyCode: 'SGD', name: 'Singapore Dollar', pais: 'Singapore', isoCode: 'sg', flag: '' },
        { currencyCode: 'SHP', name: 'Saint Helena Pound', pais: 'Saint Helena', isoCode: 'sh', flag: '' },
        { currencyCode: 'SLL', name: 'Sierra Leonean Leone', pais: 'Sierra Leone', isoCode: 'sl', flag: '' },
        { currencyCode: 'SOS', name: 'Somali Shilling', pais: 'Somalia', isoCode: 'so', flag: '' },
        { currencyCode: 'SRD', name: 'Surinamese Dollar', pais: 'Suriname', isoCode: 'sr', flag: '' },
        { currencyCode: 'SSP', name: 'South Sudanese Pound', pais: 'South Sudan', isoCode: 'ss', flag: '' },
        { currencyCode: 'STN', name: 'São Tomé and Príncipe Dobra', pais: 'São Tomé and Príncipe', isoCode: 'st', flag: '' },
        { currencyCode: 'STN', name: 'São Tomé and Príncipe Dobra (pre-2018)', pais: 'São Tomé and Príncipe', isoCode: 'st', flag: '' },
        { currencyCode: 'SYP', name: 'Syrian Pound', pais: 'Syria', isoCode: 'sy', flag: '' },
        { currencyCode: 'SZL', name: 'Swazi Lilangeni', pais: 'Eswatini', isoCode: 'sz', flag: '' },
        { currencyCode: 'THB', name: 'Thai Baht', pais: 'Thailand', isoCode: 'th', flag: '' },
        { currencyCode: 'TJS', name: 'Tajikistani Somoni', pais: 'Tajikistan', isoCode: 'tj', flag: '' },
        { currencyCode: 'TMT', name: 'Turkmenistani Manat', pais: 'Turkmenistan', isoCode: 'tm', flag: '' },
        { currencyCode: 'TND', name: 'Tunisian Dinar', pais: 'Tunisia', isoCode: 'tn', flag: '' },
        { currencyCode: 'TOP', name: 'Tongan Paʻanga', pais: 'Tonga', isoCode: 'to', flag: '' },
        { currencyCode: 'TRY', name: 'Turkish Lira', pais: 'Turkey', isoCode: 'tr', flag: '' },
        { currencyCode: 'TTD', name: 'Trinidad and Tobago Dollar', pais: 'Trinidad and Tobago', isoCode: 'tt', flag: '' },
        { currencyCode: 'TVD', name: 'Tuvaluan Dollar', pais: 'Tuvalu', isoCode: 'tv', flag: '' },
        { currencyCode: 'TWD', name: 'New Taiwan Dollar', pais: 'Taiwan', isoCode: 'tw', flag: '' },
        { currencyCode: 'TZS', name: 'Tanzanian Shilling', pais: 'Tanzania', isoCode: 'tz', flag: '' },
        { currencyCode: 'UAH', name: 'Ukrainian Hryvnia', pais: 'Ukraine', isoCode: 'ua', flag: '' },
        { currencyCode: 'UGX', name: 'Ugandan Shilling', pais: 'Uganda', isoCode: 'ug', flag: '' },
        { currencyCode: 'USD', name: 'United States Dollar', pais: 'United States', isoCode: 'us', flag: '' },
        { currencyCode: 'UYU', name: 'Uruguayan Peso', pais: 'Uruguay', isoCode: 'uy', flag: '' },
        { currencyCode: 'UZS', name: 'Uzbekistan Som', pais: 'Uzbekistan', isoCode: 'uz', flag: '' },
        { currencyCode: 'VES', name: 'Venezuelan Bolívar', pais: 'Venezuela', isoCode: 've', flag: '' },
        { currencyCode: 'VND', name: 'Vietnamese Đồng', pais: 'Vietnam', isoCode: 'vn', flag: '' },
        { currencyCode: 'VUV', name: 'Vanuatu Vatu', pais: 'Vanuatu', isoCode: 'vu', flag: '' },
        { currencyCode: 'WST', name: 'Samoan Tala', pais: 'Samoa', isoCode: 'ws', flag: '' },
        { currencyCode: 'XAF', name: 'Central African CFA franc', pais: 'Central African Republic, Chad, Republic of the Congo, Equatorial Guinea, Gabon', isoCode: 'cf', flag: '' },
        { currencyCode: 'XCD', name: 'East Caribbean Dollar', pais: 'Anguilla, Antigua and Barbuda, Dominica, Grenada, Montserrat, Saint Kitts and Nevis, Saint Lucia, Saint Vincent and the Grenadines', isoCode: 'ai', flag: '' },
        { currencyCode: 'XOF', name: 'West African CFA franc', pais: 'Benin, Burkina Faso, Ivory Coast, Guinea-Bissau, Mali, Niger, Senegal, Togo', isoCode: 'bj', flag: '' },
        { currencyCode: 'XPF', name: 'CFP Franc', pais: 'French Polynesia, New Caledonia, Wallis and Futuna', isoCode: 'pf', flag: '' },
        { currencyCode: 'YER', name: 'Yemeni Rial', pais: 'Yemen', isoCode: 'ye', flag: '' },
        { currencyCode: 'ZAR', name: 'South African Rand', pais: 'South Africa', isoCode: 'za', flag: '' },
        { currencyCode: 'ZMW', name: 'Zambian Kwacha', pais: 'Zambia', isoCode: 'zm', flag: '' },
        { currencyCode: 'ZWL', name: 'Zimbabwean Dollar', pais: 'Zimbabwe', isoCode: 'zw', flag: '' }
    ];



    getCountries() {
        return this.currencies;
    }
    private convertedValue: number = 0;
    private base_code!: string;
    private target_code!: string;
    private conversion_rate!: number[];

    url = 'https://v6.exchangerate-api.com/v6/';
    apiKey = 'cdfe58154698096f55d84b26';

    constructor(private http: HttpClient) { }

    pairConversion(baseCountryCode: string, targetCountryCode: string, inputValue: number): Observable<number> {
        if (baseCountryCode && targetCountryCode) {
            const apiUrl = `${this.url}${this.apiKey}/pair/${baseCountryCode}/${targetCountryCode}`;

            return this.http.get(apiUrl).pipe(
                map((data: any) => {
                    if (data.result === 'success') {
                        const conversionRate = data.conversion_rate;
                        this.convertedValue = inputValue * conversionRate;
                        this.base_code = data.base_code;
                        this.target_code = data.target_code;
                        this.conversion_rate = data.conversion_rate;
                        return this.convertedValue;
                    } else {
                        throw new Error('Erro na solicitação da taxa de câmbio');
                    }
                }),
                catchError(error => {
                    console.error('Erro na solicitação HTTP:', error);
                    return throwError('Erro na solicitação HTTP');
                })
            );
        } else {
            throw new Error('Códigos de país inválidos');
        }
    }
}
