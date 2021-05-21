import {
    IExecuteFunctions,
} from 'n8n-core';

import {
    IDataObject,
    ILoadOptionsFunctions,
    INodeExecutionData,
    INodePropertyOptions,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

import {
    contactFields,
    contactOperations,
    customerFields,
    customerOperations,
} from './descriptions';

import {
    OptionsWithUri,
} from 'request';

import {
    syncroApiRequest,
    syncroApiRequestAllItems,
} from './GenericFunctions';

export class SyncroMSP implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'SyncroMSP',
        name: 'SyncroMSP',
        icon: 'file:syncromsp.png',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
        description: 'Consume SyncroMSP API',
        defaults: {
            name: 'SyncroMSP',
            color: '#1ba4aa',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'syncroMSPApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                options: [
                    {
                        name: 'Contact',
                        value: 'contact',
                    },
                    {
                        name: 'Customer',
                        value: 'customer',
                    },
                ],
                default: 'contact',
                required: true,
                description: 'Resource to consume',
            },
            ...contactOperations,
            ...contactFields,
            ...customerOperations,
            ...customerFields,
        ],
    };

    methods = {
        loadOptions: {
            // Get all the companies to display them to user so that he can
            // select them easily
            async getCustomers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const returnData: INodePropertyOptions[] = [];
                const customers = await syncroApiRequestAllItems.call(this, 'GET', '/customers', {}, undefined, 'customers');

                for (const customer of customers) {
                    const customerName = customer.business_and_full_name;
                    const customerId = customer.id;

                    returnData.push({
                        name: customerName,
                        value: customerId,
                    });
                }
                return returnData;
            },
            async getContacts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
                const returnData: INodePropertyOptions[] = [];
                const contacts = await syncroApiRequestAllItems.call(this, 'GET', '/contacts', {}, undefined, 'contacts');

                for (const contact of contacts) {
                    const contactName = contact.name;
                    const contactId = contact.id;

                    returnData.push({
                        name: contactName,
                        value: contactId,
                    });
                }
                return returnData;
            },
        },
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        let responseData;
        const returnData: IDataObject[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                if (resource === 'contact') {
                    if (operation === 'create') {
                        const customerID = this.getNodeParameter('customer_id', i) as number;
                        const name = this.getNodeParameter('name', i) as string;
                        // get additional fields input
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        const body: IDataObject = {
                            customer_id: customerID,
                            name,
                        };

                        Object.assign(body, additionalFields);

                        responseData = await syncroApiRequest.call(this, 'POST', `/contacts`, body);

                    }
                    if (operation === 'update') {
                        const contactID = this.getNodeParameter('contact_id', i) as number;
                        const customerID = this.getNodeParameter('customer_id', i) as string;
                        const name = this.getNodeParameter('name', i) as string;
                        // get additional fields input
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        let body: IDataObject = {};

                        if (customerID !== "") {
                            body.customer_id = customerID;
                        }
                        if (name !== "") {
                            body.name = name;
                        }

                        body = Object.assign(body, additionalFields);

                        responseData = await syncroApiRequest.call(this, 'PUT', `/contacts/${contactID}`, body);
                    }
                    if (operation === 'get') {
                        const contactID = this.getNodeParameter('contact_id', i) as number;
                        responseData = await syncroApiRequest.call(this, 'GET', `/contacts/${contactID}`);
                    }
                    if (operation === 'getAll') {
                        const customerID = this.getNodeParameter('customer_id', i) as number;
                        responseData = await syncroApiRequestAllItems.call(this, 'GET', `/contacts`, { customer_id: customerID }, undefined, 'contacts');
                    }
                    if (operation === 'delete') {
                        const contactID = this.getNodeParameter('contact_id', i) as number;
                        responseData = await syncroApiRequest.call(this, 'DELETE', `/contacts/${contactID}`);
                    }
                }
                if (resource === 'customer') {
                    if (operation === 'get') {
                        const customerID = this.getNodeParameter('customer_id', i) as number;
                        responseData = await syncroApiRequest.call(this, 'GET', `/customers/${customerID}`);
                        responseData = responseData.customer;
                    }
                    if (operation === 'getAll') {
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        let qs: IDataObject = {};
                        qs = Object.assign(qs, additionalFields);
                        responseData = await syncroApiRequestAllItems.call(this, 'GET', `/customers`, {}, qs, 'customers');
                    }
                    if (operation === 'delete') {
                        const customerID = this.getNodeParameter('customer_id', i) as number;
                        responseData = await syncroApiRequest.call(this, 'DELETE', `/customers/${customerID}`);
                    }
                    if (operation === 'latest') {
                        responseData = await syncroApiRequest.call(this, 'GET', `/customers/latest`);
                        responseData = responseData.customer;
                    }
                }
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ error: error.toString() });
                    continue;
                }

                throw error;
            }

            if (Array.isArray(responseData)) {
                returnData.push.apply(returnData, responseData as IDataObject[]);
            } else {
                if (responseData === undefined) {
                    responseData = {
                        success: true,
                    };
                }

                returnData.push(responseData as IDataObject);
            }
        }

        // Map data to n8n data
        return [this.helpers.returnJsonArray(returnData)];
    }
}