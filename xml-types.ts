export interface AutocrmFields {
    lead: {
        potentialBuyer: {
            kundennummer: string;
            titel: string;
            anrede: string;
            vorname: string;
            nachname: string;
            name: string;
            firma: string;
            KfzKennzeichen: string;
            strasse: string;
            plz: string;
            ort: string;
            landIso: string;
            email: string;
            phone: string;
            mobil: string;
            fax: string;
            message: string;
        };
        erstkontakt: string;
        quelle: string;
        kategorie: string;
        bearbeiter: string;
        leadid: string;
    };
}

export interface CatchFields {
    lead: {
        vehicle: {
            internalId: string;
            make: string;
            model: string;
            firstRegistration: string;
            mileage: string;
            price: string;
            conditionType: 'NEW' | 'USED' | '';
            type: string;
            vin: string;
        };
        potentialBuyer: {
            company: string;
            salutation: string;
            title: string;
            firstname: string;
            lastname: string;
            street: string;
            zip: string;
            city: string;
            email: string;
            additionalData: string;
            phone: {
                internationalPrefix: string;
                prefix: string;
                number: string;
            };
            message: string;
            /**
            * @description Beliebig viele Wert-Paare ,müssen zwingend <key> und <value> enthalten.
            */
            add_fields: {
                field: {
                    key: string;
                    value: string;
                };
            }[];
        };
        subject: string;
        /**
        * @description Bezeichnung des Lagerortes, der für die Zuordnung benötigt wird.
        */
        crm_dealercode?: string;
        /**
        * @description Integer, spiegelt die Mandanten/Lagerort-ID des CRM Systems wider.
        */
        crm_dealerid?: string;
        /**
        * @description Bezeichnung des Dealercodes des DMS Systems. Im CRM kann dieser Wert in der Mandantenpflege im Feld Dealernummer gepflegt werden
        */
        dms_dealercode?: string;
        /**
        * @description Wird der Nachricht angehangen und dient der Anzeige für den Benutzer in der Oberfläche.
        */
        locationString?: string;
        /**
        * @description <lead_source> und <campaign_name> = Zusammensetzung der Lead-Kampagne. Theoretisch reicht ein Wert in <campaign_name>
        */
        campaignName?: string;
        /**
        * @description <lead_source> und <campaign_name> = Zusammensetzung der Lead-Kampagne. Theoretisch reicht ein Wert in <campaign_name>
        */
        lead_source?: string;
        lead_source2?: string;
        lead_type?: string;
        lead_channel?: string;
        /**
        * @description Die Möglichkeit die Anfragen unter einer Kampagne zu führen, aber für Auswertungen im CATCH unter einer eigenen Marketing-Kampagne zu führen. 
        * <campaign_name> ist weiterhin ein Pflichtfeld.
        */
        marketing_campaign?: string;
        /**
        * @description Unter <files/> können auch Anhänge mit dem Lead ans Catch gesendet werden.
        */
        files?: { 'filename': string }[];
        url: string;
    };
}

export interface DealerdeskFields {
    dealerdeskLead: { // Alle Felder sind optional
        generalInformation: {
            /**
            * @description OPPORTUNITY = Verkaufschance; CASE = Fall; Standard: OPPORTUNITY.
            */
            type?: 'OPPORTUNITY' | 'CASE';
            /**
            * @description dealerdesk ID, die den Standort setzt. Um die IDs zu erfahren, wenden Sie sich an csm@dealerdesk.de
            */
            dealerid?: string;
            /**
            * @deprecated
            */
            contextLink?: string;
            /**
            * @description Betreff der Anfrage
            */
            subject?: string;
            /**
            * @description FAX; EMAIL; WEBSITE; PHONE_INTERNAL; PHONE_BDC; SMS; LIVE_CHAT; PERSONAL_APPEARANCE
            */
            channel?: 'FAX' | 'EMAIL' | 'WEBSITE' | 'PHONE_INTERNAL' | 'PHONE_BDC' | 'SMS' | 'LIVE_CHAT' | 'PERSONAL_APPEARANCE';
            /**
            * @description Fall-Typ bei type = CASE; siehe Typdefinition für die möglichen Werte
            */
            caseType?: string;
            /**
            * @description dealerdesk ID, die die Quelle setzt. Um die IDs zu erfahren, wenden Sie sich an csm@dealerdesk.de
            */
            sourceId?: string;
            /**
            * @description Stimmung mit den Werten: -10 = unglücklich, 0 = neutral, 10 = glücklich
            */
            sentiment?: string;
            /**
            * @description NORMAL; HIGH; PERSONAL_APPEARANCE
            */
            urgency?: 'NORMAL' | 'HIGH' | 'PERSONAL_APPEARANCE';
            /**
            * @description Termin bei urgency = PERSONAL_APPEARANCE
            */
            appointmentTime?: string;
            /**
            * @description EMAIL; PHONE; SMS
            */
            preferredContactMethod?: 'EMAIL' | 'PHONE' | 'SMS';
            /**
            * @description E-Mail-Adresse oder Telefonnummer (entsprechend der präferierten Kontaktmethode)
            */
            preferredContactDetails?: string;
            /**
            * @description Zeitstempel der frühstmöglichen Kontaktaufnahme-Zeit
            */
            earliestContactTime?: Date;
            /**
            * @description Zeitstempel der letztmöglichen Kontaktaufnahme-Zeit
            */
            latestContactTime?: Date;
            /**
            * @description Optional: Eine eindeutige ID, die in der REST API wieder gefunden werden kann. Dient der Identifizierung des erstellten Vorgangs.
            */
            externalReference?: string;
            /**
            * @description Optional: Eine dealerdesk ID (beliebige Anzahl möglich), die die entsprechende Eskalationsgruppe als Empfängergruppe auswählt. Um die IDs zu erfahren, wenden Sie sich an csm@dealerdesk.de
            */
            escalationGroupId?: string;
            /**
            * @description Optional: Eine dealerdesk ID (beliebige Anzahl möglich), die das entsprechende Verkäuferteam als Empfängergruppe auswählt. Um die IDs zu erfahren, wenden Sie sich an csm@dealerdesk.de
            */
            opportunityTeamId?: string;
        };
        contact: {
            /**
            * @description PROSPECT = Interessent; CLIENT = Kunde
            */
            status?: 'PROSPECT' | 'CLIENT';
            /**
            * @description PRIVATE = Privat; BUSINESS = Geschäftlich; CAR_DEALER = Autohändler
            */
            type?: 'PRIVATE' | 'BUSINESS' | 'CAR_DEALER';
            /**
            * @description Anrede MR; MS; MRS; FAMILY; MARRIED_COUPLE; MR_AND_MRS
            */
            salutation?: string;
            /**
            * @description Kontakt bekannt/Kunde seit; Gängige Datumsformate werden unterstützt
            */
            knownSince?: string;
            dateOfBirth?: string;
            companyName?: string;
            department?: string;
            position?: string;
            fullName?: string,
            /**
            * @description Titel, z.B. Dr.
            */
            namePrefix?: string;
            givenName?: string;
            middleName?: string;
            familyName?: string;
            /**
            * @description Namensnachsatz z.B. Sr.
            */
            nameSuffix?: string;
            /**
            * @description Adresszusatz
            */
            address1?: string;
            /**
            * @description Straße und Hausnummer
            */
            address2?: string;
            zip?: string;
            city?: string;
            state?: string;
            country?: string;
            phone?: string;
            email?: string;
            /**
            * @description DMS Nummer bzw. Nummer des Vorsystems
            */
            externalReference?: string;
        };
        /**
        * @description Fahrzeug des Kontakts
        */
        contactVehicle: {
            /**
            * @description Hersteller
            */
            make?: string;
            /**
            * @description Modell, z.B. Golf
            */
            model?: string;
            /**
            * @description Modellbeschreibung, z.B. VII Variant
            */
            modelDescription?: string;
            modelYear?: string;
            licensePlate?: string;
            /**
            * @description FIN
            */
            vin?: string;
            /**
            * @description Laufleistung
            */
            mileage?: string;
            /**
            * @description Erstzulassung; Tag und Monat ist optional; Gängige Datumsformate werden unterstützt
            */
            firstRegistration?: string;
            /**
            * @description Leistung in kW!
            */
            power?: string | number;
            color?: string;
            /**
            * @description Getriebeart
            */
            transmission?: string;
            /**
            * @description Ausstattung
            */
            features?: string;
            /**
            * @description Anzahl der Vorbesitzer
            */
            previousOwners?: string | number;
            /**
            * @description Kreditablöse gewünscht? Boolean 0 oder 1
            */
            loanRedemption?: 0 | 1;
            priceSuggestion?: string;
        };
        /**
        * @description Angefragtes Fahrzeug
        */
        requestedVehicle: {
            /**
            * @description Interne Fahrzeugnummer
            */
            internalId?: string;
            /**
            * @description Link zum Fahrzeug
            */
            link?: string;
            /**
            * @description CAR; MOTORBIKE; MOTORHOME; TRUCK;
            */
            vehicleClass?: 'CAR' | 'MOTORBIKE' | 'MOTORHOME' | 'TRUCK';
            /**
            * @description Hersteller
            */
            make?: string;
            /**
            * @description Modell, z.B. Golf
            */
            model?: string;
            /**
            * @description Modellbeschreibung, z.B. VII Variant
            */
            modelDescription?: string;
            /**
            * @description FIN
            */
            vin?: string;
            /**
            * @description Fahrzeugstand: NEW; USED; PRE_REGISTRATION; EMPLOYEES_CAR; CLASSIC; DEMONSTRATION
            */
            usageType?: 'NEW' | 'USED' | 'PRE_REGISTRATION' | 'EMPLOYEES_CAR' | 'CLASSIC' | 'DEMONSTRATION';
            /**
            * @description Laufleistung
            */
            mileage?: string;
            price?: string;
            /**
            * @description Erstzulassung; Tag und Monat ist optional; Gängige Datumsformate werden unterstützt
            */
            firstRegistration?: string;
            /**
            * @description Kraftstoffart PETROL; DIESEL; LPG; CNG; GAS; ELECTRICITY; HYBRID; HYDROGENIUM; ETHANOL; HYBRID_DIESEL; HYBRID_ALL; OTHER
            */
            fuel?: 'PETROL' | 'DIESEL' | 'LPG' | 'CNG' | 'GAS' | 'ELECTRICITY' | 'HYBRID' | 'HYDROGENIUM' | 'ETHANOL' | 'HYBRID_DIESEL' | 'HYBRID_ALL' | 'OTHER';
            /**
            * @description Leistung in kW!
            */
            power?: string;
            exteriorColor?: string;
            /**
            * @description Hubraum in ccm, z.B. 2998
            */
            cubicCapacity?: string;
            /**
            * @description Vorlauffahrzeug? Boolean 0 oder 1
            */
            preOffer?: 0 | 1;
        };
        /**
        * @description Details zum Erwerb
        */
        acquisition: {
            /**
            * @description Inzahlungnahme gewünscht? Boolean 0 oder 1
            */
            tradeInRequested?: 0 | 1;
            /**
            * @description Zulassung durch den Händler gewünscht? Boolean 0 oder 1
            */
            registrationRequested?: 0 | 1;
            /**
            * @description Versicherungsberatung gewünscht? Boolean 0 oder 1
            */
            insuranceRequested?: 0 | 1;
            /**
            * @description Lieferung gewünscht? Boolean 0 oder 1
            */
            deliveryRequested?: 0 | 1;
            /**
            * @description Probefahrt gewünscht? Boolean 0 oder 1
            */
            testdriveRequested?: 0 | 1;
            preferredTimeOfTestdrive?: string;
            /**
            * @description Gegenangebot des Kontakts
            */
            counterOffer?: string;
            /**
            * @description Name der Aktion
            */
            dealName?: string;
            /**
            * @description CASH = Bar/Überweisung; LEASE = Leasing; FINANCE = Finanzierung; SUBSCRIPTION = Abbonement/Abo
            */
            acquisitionType?: 'CASH' | 'LEASE' | 'FINANCE' | 'SUBSCRIPTION';
            bank?: string;
            /**
            * @description Laufzeit der Finanzierung bzw. des Leasings in Monaten
            */
            paybackPeriodMonths?: string;
            /**
            * @description Jährliche Laufleistung der Finanzierung bzw. des Leasings in Kilometer
            */
            totalMileage?: string;
            /**
            * @description Anzahlung
            */
            firstInstallment?: string;
            /**
            * @description Monatsrate
            */
            monthlyInstallment?: string;
            /**
            * @description Schlussrate
            */
            finalInstallment?: string;
        };
        /**
        * @description Optional und beliebig viele Link-Objekte sind möglich
        */
        link?: {
            url?: string;
            /**
            * @description Optional: Ist der Key eines Links und wird zur Identifizierung verwendet. Bei Wiederverwendung wird der vorherige Link überschrieben. Alle Zeichen sind erlaubt außer %
            */
            key?: string;
            /**
            * @description Optional: Eine Beschreibung des Links. Wird in der Oberfläche als Alternative angezeigt
            */
            description?: string;
        };
    };
}

export enum XmlFormats {
    Autocrm = 1,
    Catch = 2,
    Dealerdesk = 3,
}

