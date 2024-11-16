import { CatchFields } from '../xml-types';
import { checkUndefinedNullOrEmpty } from '../check';
import { XmlBasicFormat } from './xmlBasicFormat';

export class CatchXmlFormat extends XmlBasicFormat<CatchFields> {
    constructor(fd) {
        super();
        this.encoding = 'UTF-8';
        this.fields = {
            lead: { // Initialize all available fields, send as empty if no data
                vehicle: {
                    internalId: '',
                    make: '',
                    model: '',
                    firstRegistration: '',
                    mileage: '',
                    price: '',
                    conditionType: '',
                    type: '',
                    vin: '',
                },
                potentialBuyer: {
                    company: '',
                    salutation: '',
                    title: '',
                    firstname: '',
                    lastname: '',
                    street: '',
                    zip: '',
                    city: '',
                    email: '',
                    additionalData: '',
                    phone: {
                        internationalPrefix: '',
                        prefix: '',
                        number: '',
                    },
                    message: '',
                    add_fields: [], // multiple objects allowed, format: { field: { key: '', value: '' } }
                },
                subject: fd.formBetreff || '',
                url: fd.referrerUrl || '',
            },
        };
        this.formData = fd;
        this.unknownFields = [];
    };

    // Add XML properties according to available form data, otherwise store key-value pairs that fit no property in lead.potentialBuyer.add_fields
    private mapFormDataToCatchFields(): void {
        const lead = this.fields.lead;
        const potentialBuyer = lead.potentialBuyer;
        const vehicle = lead.vehicle;

        Object.entries(this.formData).forEach(([key, value]) => {
            const normalizedKey = key.toLocaleLowerCase();

            if (normalizedKey === 'adresse1') {
                potentialBuyer.street = value; // form asks for "Straße, Hausnummer"
            } else if (normalizedKey === 'adresse2') {
                const addressSplit = value.replace(',', '').split(' '); // form asks for "PLZ, Ort"
                potentialBuyer.city = addressSplit[1];
                potentialBuyer.zip = addressSplit[0];
            } else if (normalizedKey === 'betreff') {
                lead.subject = `${lead.subject} (${value})`;
            } else if (normalizedKey === 'erstzulassung' || normalizedKey === 'ez') {
                vehicle.firstRegistration = value;
            } else if (normalizedKey === 'fahrgestellnummer_VIN' || normalizedKey === 'FIN') {
                vehicle.vin = value;
            } else if (key === 'Fahrzeughalter') { // ACHTUNG: "fahrzeughalter" kleingeschrieben = Anzahl Vorbesitzer!
                const nameSplit = value.replace(',', '').split(' '); // form asks for "Fahrzeughalter / Name, Vorname"
                potentialBuyer.lastname = nameSplit[0] || '';
                potentialBuyer.firstname = nameSplit[1] || '';
            } else if (normalizedKey === 'firma' || normalizedKey === 'leasingnehmer' || normalizedKey === 'taetig_fuer') {
                potentialBuyer.company = value;
            } else if (normalizedKey === 'hausnummer' || normalizedKey === 'nummer') { // Catch wants street & nr. combined
                potentialBuyer.street = `${this.formData.strasse} ${value}`;
            } else if (normalizedKey === 'laufleistung_in_km') {
                vehicle.mileage = value;
            } else if (normalizedKey.includes('mail')) {
                potentialBuyer.email = value;
            } else if (normalizedKey === 'marke') {
                vehicle.make = value;
            } else if (normalizedKey === 'mobil'
                && checkUndefinedNullOrEmpty(this.formData.tel)
                && checkUndefinedNullOrEmpty(this.formData.telefon)
                && checkUndefinedNullOrEmpty(this.formData.Telefon)
            ) {
                potentialBuyer.phone.number = value;
            } else if (normalizedKey === 'model' || normalizedKey === 'modell') {
                vehicle.model = value;
            } else if (normalizedKey === 'nachname') {
                potentialBuyer.lastname = value;
            } else if (normalizedKey === 'nachricht' || normalizedKey === 'ihre_nachricht') {
                potentialBuyer.message = value;
            } else if (normalizedKey === 'ort') {
                potentialBuyer.city = value;
            } else if (normalizedKey === 'plz') {
                potentialBuyer.zip = value;
            } else if (normalizedKey === 'preis') {
                vehicle.price = value;
            } else if (normalizedKey === 'telefon' || normalizedKey === 'tel') {
                potentialBuyer.phone.number = value;
            } else if (normalizedKey === 'vorname') {
                potentialBuyer.firstname = value;
            } else {
                potentialBuyer.add_fields.push({ field: { ['key']: key, ['value']: value } })
            }
        });
    };

    public getXmlDataObject(): CatchFields {
        this.mapFormDataToCatchFields();
        return this.fields;
    };
}

