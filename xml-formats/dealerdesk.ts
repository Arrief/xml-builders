import { DealerdeskFields } from '../xml-types';
import { checkUndefinedNullOrEmpty } from '../check';
import { XmlBasicFormat } from './xmlBasicFormat';

export class DealerdeskXmlFormat extends XmlBasicFormat<DealerdeskFields> {
    constructor(fd) {
        super();
        this.encoding = 'UTF-8';
        this.fields = {
            dealerdeskLead: { // All fields optional, only standard ones are initialized here, others added as needed in mapping func
                generalInformation: {
                    type: 'OPPORTUNITY',
                    subject: fd.formBetreff || '',
                    channel: 'WEBSITE',
                },
                contact: {
                    type: 'BUSINESS',
                    fullName: fd.name || '',
                    phone: '',
                    email: '',
                },
                contactVehicle: {},
                requestedVehicle: {},
                acquisition: {},
                link: {
                    url: fd.referrerUrl,
                },
            }
        };
        this.formData = fd;
        this.unknownFields = [];
    };

    // Add XML properties according to available form data, otherwise store key-value pairs that fit no property as string in array
    private mapFormDataToDealerdeskFields(): void {
        // const acquisition = this.fields.dealerdeskLead.acquisition; // currently not needed
        const contact = this.fields.dealerdeskLead.contact;
        const contactVehicle = this.fields.dealerdeskLead.contactVehicle;
        const generalInfo = this.fields.dealerdeskLead.generalInformation;
        const requestedVehicle = this.fields.dealerdeskLead.requestedVehicle;

        const formDataFields = this.getFieldNames(this.formData);
        const isSchadensmeldung = formDataFields?.includes('Regulierung') || formDataFields?.includes('Versicherung') || formDataFields?.includes('Zeitpunkt_Schaden');

        const phone = (!checkUndefinedNullOrEmpty(this.formData.tel)
            ? this.formData.tel
            : !checkUndefinedNullOrEmpty(this.formData.telefon)
                ? this.formData.telefon
                : !checkUndefinedNullOrEmpty(this.formData.Telefon)
                    ? this.formData.Telefon
                    : this.formData.mobil
        );

        Object.entries(this.formData).forEach(([key, value]) => {
            const normalizedKey = key.toLocaleLowerCase();

            if (normalizedKey === 'adresse1') {
                contact.address2 = value; // form asks for "Straße, Hausnummer"
            } else if (normalizedKey === 'adresse2') {
                const addressSplit = value.replace(',', '').split(' '); // form asks for "PLZ, Ort"
                contact.city = addressSplit[1];
                contact.zip = addressSplit[0];
            } else if (normalizedKey === 'erstzulassung' || normalizedKey === 'ez') {
                if (isSchadensmeldung) {
                    contactVehicle.firstRegistration = value;
                } else {
                    requestedVehicle.firstRegistration = value;
                }
            } else if (normalizedKey === 'fahrgestellnummer_VIN' || normalizedKey === 'FIN') {
                if (isSchadensmeldung) {
                    contactVehicle.vin = value;
                } else {
                    requestedVehicle.vin = value;
                }
            } else if (key === 'Fahrzeughalter') { // ACHTUNG: "fahrzeughalter" kleingeschrieben = Anzahl Vorbesitzer!
                const nameSplit = value.replace(',', '').split(' '); // form asks for "Fahrzeughalter / Name, Vorname"
                contact.familyName = nameSplit[0] || '';
                contact.fullName = value;
                contact.givenName = nameSplit[1] || '';
            } else if (key === 'fahrzeughalter') {
                contactVehicle.previousOwners = value;
            } else if (normalizedKey === 'firma' || normalizedKey === 'leasingnehmer' || normalizedKey === 'taetig_fuer') {
                contact.companyName = value;
            } else if (normalizedKey === 'geburtsdatum' || normalizedKey === 'geburtstag') {
                contact.dateOfBirth = value;
            } else if (normalizedKey === 'hausnummer' || normalizedKey === 'nummer') { // dealerdesk wants street & nr. combined
                contact.address2 = `${this.formData.strasse} ${value}`;
            } else if (normalizedKey === 'kennzeichen' || normalizedKey === 'kfz_kennzeichen') {
                contactVehicle.licensePlate = value;
            } else if (normalizedKey === 'laufleistung_in_km') {
                if (isSchadensmeldung) {
                    contactVehicle.mileage = value;
                } else {
                    requestedVehicle.mileage = value;
                }
            } else if (normalizedKey.includes('mail')) {
                contact.email = value;
            } else if (normalizedKey === 'marke') {
                if (isSchadensmeldung) {
                    contactVehicle.make = value;
                } else {
                    requestedVehicle.make = value;
                }
            } else if (normalizedKey === 'mobil'
                && checkUndefinedNullOrEmpty(this.formData.tel)
                && checkUndefinedNullOrEmpty(this.formData.telefon)
                && checkUndefinedNullOrEmpty(this.formData.Telefon)
            ) {
                contact.phone = value;
            } else if (normalizedKey === 'model' || normalizedKey === 'modell') {
                if (isSchadensmeldung) {
                    contactVehicle.model = value;
                } else {
                    requestedVehicle.model = value;
                }
            } else if (normalizedKey === 'nachname') {
                contact.familyName = value;
            } else if (normalizedKey === 'nachricht' || normalizedKey === 'ihre_nachricht') {
                generalInfo.subject = `${generalInfo.subject}\n${value}`;
            } else if (normalizedKey === 'ort') {
                contact.city = value;
            } else if (normalizedKey === 'plz') {
                contact.zip = value;
            } else if (normalizedKey === 'preis') {
                if (isSchadensmeldung) {
                    contactVehicle.priceSuggestion = value;
                } else {
                    requestedVehicle.price = value;
                }
            } else if (normalizedKey === 'rueckruf') {
                generalInfo.preferredContactMethod = 'PHONE';
                generalInfo.preferredContactDetails = phone;
            } else if (normalizedKey === 'telefon' || normalizedKey === 'tel') {
                contact.phone = value;
            } else if (normalizedKey === 'vorname') {
                contact.givenName = value;
            } else {
                this.unknownFields.push(`${key}: ${value}`); // original key as it is in the form
            }
        });

        // Add content of all unknown fields to generalInformation.subject
        generalInfo.subject = this.addUnknownFieldsToMessage(generalInfo.subject);
    };

    public getXmlDataObject(): DealerdeskFields {
        this.mapFormDataToDealerdeskFields();
        return this.fields;
    };
}

