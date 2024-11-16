import { AutocrmFields } from '../xml-types';
import { checkUndefinedNullOrEmpty } from '../check';
import { XmlBasicFormat } from './xmlBasicFormat';

export class AutocrmXmlFormat extends XmlBasicFormat<AutocrmFields> {
    constructor(fd) {
        super();
        this.encoding = 'iso-8859-1';
        this.fields = {
            lead: { // Initialize all available fields, send as empty if no data
                potentialBuyer: {
                    kundennummer: '',
                    titel: '',
                    anrede: '',
                    vorname: '',
                    nachname: '',
                    name: '',
                    firma: '',
                    KfzKennzeichen: '',
                    strasse: '',
                    plz: '',
                    ort: '',
                    landIso: '',
                    email: '',
                    phone: '',
                    mobil: '',
                    fax: '',
                    message: '',
                },
                erstkontakt: 'E-Mail',
                quelle: 'Homepage',
                kategorie: '',
                bearbeiter: '',
                leadid: '',
            }
        };
        this.formData = fd;
        this.unknownFields = [];
    };

    private mapFormDataToAutocrmFields(): void {
        const potentialBuyer = this.fields.lead.potentialBuyer;
        const fieldNamesPotentialBuyer = this.getFieldNames(potentialBuyer);

        // Add form values to XML object where keys match with format keys, otherwise store unknown key-value pairs as string in array
        Object.entries(this.formData).forEach(([key, value]) => {
            const normalizedKey = key.toLocaleLowerCase();

            if (fieldNamesPotentialBuyer.includes(normalizedKey)) {
                potentialBuyer[normalizedKey] = value;
            } else if (normalizedKey === 'adresse1') {
                potentialBuyer.strasse = value; // form asks for "Straße, Hausnummer"
            } else if (normalizedKey === 'adresse2') {
                const addressSplit = value.replace(',', '').split(' '); // form asks for "PLZ, Ort"
                potentialBuyer.ort = addressSplit[1];
                potentialBuyer.plz = addressSplit[0];
            } else if (normalizedKey === 'anfrageart') {
                this.fields.lead.kategorie = value;
            } else if (normalizedKey === 'ansprechpartner') {
                this.fields.lead.bearbeiter = value;
            } else if (key === 'Fahrzeughalter') { // ACHTUNG: "fahrzeughalter" kleingeschrieben = Anzahl Vorbesitzer!
                const nameSplit = value.replace(',', '').split(' '); // form asks for "Fahrzeughalter / Name, Vorname"
                potentialBuyer.nachname = nameSplit[0] || '';
                potentialBuyer.vorname = nameSplit[1] || '';
                potentialBuyer.name = value;
            } else if (normalizedKey === 'hausnummer' || normalizedKey === 'nummer') {
                potentialBuyer.strasse = `${this.formData.strasse} ${value}`;
            } else if (normalizedKey === 'kennzeichen' || normalizedKey === 'kfz-Kennzeichen') { // dont use .includes(), there is also "kundennummer_kennzeichen" 
                potentialBuyer.KfzKennzeichen = value;
            } else if (normalizedKey.includes('kundennummer') || normalizedKey === 'kdNr') {
                potentialBuyer.kundennummer = value;
            } else if (normalizedKey.includes('mail')) {
                potentialBuyer.email = value;
            } else if (normalizedKey === 'mobil'
                && checkUndefinedNullOrEmpty(this.formData.tel)
                && checkUndefinedNullOrEmpty(this.formData.telefon)
                && checkUndefinedNullOrEmpty(this.formData.Telefon)
            ) {
                potentialBuyer.phone = value;
            } else if (normalizedKey === 'nachricht' || normalizedKey === 'ihre_nachricht') {
                potentialBuyer.message = value;
            } else if (normalizedKey.includes('telefon') || normalizedKey === 'tel') {
                potentialBuyer.phone = value;
            } else {
                this.unknownFields.push(`${key}: ${value}`); // original key as it is in the form
            }
        });

        // Add content of all unknown fields to <message>
        potentialBuyer.message = this.addUnknownFieldsToMessage(potentialBuyer.message);
    };

    public getXmlDataObject(): AutocrmFields {
        this.mapFormDataToAutocrmFields();
        return this.fields;
    };
}

