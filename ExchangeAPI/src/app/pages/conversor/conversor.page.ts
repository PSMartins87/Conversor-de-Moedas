import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular/common';
import { CountriesService } from 'src/app/service/countries.service';

@Component({
    selector: 'app-conversor',
    templateUrl: './conversor.page.html',
    styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {

    targetCurrencyCode: string = '';
    selectedCountryBase: any = null;
    selectedCountryTarget: any = null;
    inputValue!: number;
    convertedValue: number = 0;
    countries: any[] = [];
    filteredCountries: any[] = [];
    searchTermBase: string = '';
    filteredCountriesBase: any[] = [];
    searchTermTarget: string = '';
    filteredCountriesTarget: any[] = [];
    errorMessage!: string;
    constructor(private countriesService: CountriesService) { }

    ngOnInit() {
        this.loadCountries();
    }

    search(target: 'base' | 'target') {
        const searchTerm = target === 'base' ? this.searchTermBase : this.searchTermTarget;
        const countriesArray = target === 'base' ? this.filteredCountriesBase : this.filteredCountriesTarget;
        if (searchTerm.length > 0) {
            const filteredCountries = this.countries.filter(country =>
                country.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (target === 'base') {
                this.filteredCountriesBase = filteredCountries;
            } else {
                this.filteredCountriesTarget = filteredCountries;
            }
        } else {
            if (target === 'base') {
                this.filteredCountriesBase = [];
            } else {
                this.filteredCountriesTarget = [];
            }
        }
    }

    selectCountry(target: 'base' | 'target', country: any) {
        if (target === 'base') {
            this.selectedCountryBase = country;
            this.searchTermBase = '';
        } else {
            this.selectedCountryTarget = country;
            this.searchTermTarget = '';
        }
    }

    async loadCountries() {
        try {
            this.countries = await this.countriesService.getCountries();

            for (const country of this.countries) {
                country.flag = await this.loadImage(await this.getFlag(country.isoCode));
                country.flagLoaded = true;
            }
        } catch (error) {
            console.error('Erro ao obter países:', error);
        }
    }

    loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve(img);
            };
            img.onerror = (error) => {
                reject(error);
            };
            img.src = url;
        });
    }

    getFlag(code: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(`https://flagcdn.com/256x192/${code}.png`);
            img.onerror = reject;
            img.src = `https://flagcdn.com/256x192/${code}.png`;
        });
    }


    convertCurrency() {
        if (
            this.selectedCountryBase &&
            this.selectedCountryTarget &&
            this.inputValue !== undefined
        ) {
            this.errorMessage = '';
            this.countriesService.pairConversion(
                this.selectedCountryBase.currencyCode,
                this.selectedCountryTarget.currencyCode,
                this.inputValue
            ).subscribe(
                value => this.convertedValue = value,
                error => {
                    this.errorMessage = 'Não foi possível converter a moeda. Tente novamente.';
                }
            );
        } else {
            this.errorMessage = 'Preencha todos os campos.';
        }
    }

    invertCurrencies() {
        if (this.selectedCountryBase && this.selectedCountryTarget) {
            const temp = this.selectedCountryBase;
            this.selectedCountryBase = this.selectedCountryTarget;
            this.selectedCountryTarget = temp;
            this.errorMessage = '';
            this.convertCurrency();
        } else {
            this.errorMessage = 'Preencha todos os campos.';
        }
    }

    clearValues() {
        this.selectedCountryBase = null;
        this.selectedCountryTarget = null;
        this.inputValue = 1;
        this.convertedValue = 0;
        this.searchTermBase = '';
        this.searchTermTarget = '';
        this.filteredCountries = [];
        this.targetCurrencyCode = '';
        this.inputValue = 0;
        this.convertedValue = 0;
        this.filteredCountriesBase = [];
        this.filteredCountriesTarget = [];
        this.errorMessage = '';
    }
}
