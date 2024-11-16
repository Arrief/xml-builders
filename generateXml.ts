import { XMLBuilder } from 'fast-xml-parser';
import { XmlFormats } from './xml-types';
import { AutocrmXmlFormat } from './xml-formats/autocrm';
import { CatchXmlFormat } from './xml-formats/catchLeads';
import { DealerdeskXmlFormat } from './xml-formats/dealerdesk';

export default function generateXMLFromForm(formData, lmsFormat: XmlFormats) {
    const xmlBuilder = new XMLBuilder({ format: true, indentBy: '    ' });

    let xmlFormat: AutocrmXmlFormat | CatchXmlFormat | DealerdeskXmlFormat;
    switch (lmsFormat) {
        case XmlFormats.Autocrm:
            xmlFormat = new AutocrmXmlFormat(formData);
            break;
        case XmlFormats.Catch:
            xmlFormat = new CatchXmlFormat(formData);
            break;
        case XmlFormats.Dealerdesk:
            xmlFormat = new DealerdeskXmlFormat(formData);
            break;
        default:
            break;
    }

    const xmlString = `<?xml version="1.0" encoding="${xmlFormat.getEncoding()}"?>\n${xmlBuilder.build(xmlFormat.getXmlDataObject())}`;
    return xmlString;
};

