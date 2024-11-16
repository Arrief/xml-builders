import { AutocrmFields, CatchFields, DealerdeskFields } from '../xml-types';

export class XmlBasicFormat<Fields extends AutocrmFields | CatchFields | DealerdeskFields> {
    protected encoding: string;
    protected fields: Fields;
    protected formData;
    protected unknownFields: string[];

    protected addUnknownFieldsToMessage(message: string): string {
        if (this.unknownFields.length > 0) {
            const unknownFieldsText = this.unknownFields.join(',\n');

            if (message !== '') {
                message = `${message}\n${unknownFieldsText}`;
            } else {
                message = unknownFieldsText;
            }
            return message;
        }
    }

    public getEncoding(): string {
        return this.encoding;
    };

    protected getFieldNames(fields: Record<string, string>): string[] {
        return Object.keys(fields)
    };

    public getXmlDataObject(): Fields {
        return this.fields;
    };
}

