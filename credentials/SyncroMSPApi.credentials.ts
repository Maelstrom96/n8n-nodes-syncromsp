import {
    ICredentialType,
    NodePropertyTypes,
} from 'n8n-workflow';

export class SyncroMSPApi implements ICredentialType {
    name = 'syncroMSPApi';
    displayName = 'SyncroMSP API';
    documentationUrl = 'https://api-docs.syncromsp.com/';
    properties = [
        {
            displayName: 'API Token',
            name: 'apiToken',
            type: 'string' as NodePropertyTypes,
            default: '',
            required: true,
            placeholder: 'Txxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxx',
        },
        {
            displayName: 'API Subdomain',
            name: 'subdomain',
            type: 'string' as NodePropertyTypes,
            default: '',
            required: true,
            placeholder:'my-company',
        },
    ];
}