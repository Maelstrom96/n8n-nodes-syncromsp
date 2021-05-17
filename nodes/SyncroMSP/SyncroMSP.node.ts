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
                ],
                default: 'contact',
                required: true,
                description: 'Resource to consume',
            },
            ...contactOperations,
            ...contactFields,
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
                        const customer_id = this.getNodeParameter('customer_id', i) as number;
                        const name = this.getNodeParameter('name', i) as string;
                        // get additional fields input
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        const body: IDataObject = {
                            customer_id,
                            name,
                        };
            
                        Object.assign(body, additionalFields);
            
                        responseData = await syncroApiRequest.call(this, 'POST', `/contacts`, body);
                        
                    }
                    if (operation === 'update') {
                        const contact_id = this.getNodeParameter('contact_id', i) as number;
                        const customer_id = this.getNodeParameter('customer_id', i) as string;
                        const name = this.getNodeParameter('name', i) as string;
                        // get additional fields input
                        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                        const body: IDataObject = {};

                        if (customer_id !== "") {
                            body.customer_id = customer_id;
                        }
                        if (name !== "") {
                            body.name = name;
                        }

                        Object.assign(body, additionalFields);
            
                        responseData = await syncroApiRequest.call(this, 'PUT', `/contacts/${contact_id}`, body);
                    }
                    if (operation === 'get') {
                        const contact_id = this.getNodeParameter('contact_id', i) as number;           
                        responseData = await syncroApiRequest.call(this, 'GET', `/contacts/${contact_id}`);
                    }
                    if (operation === 'getAll') {
                        const customer_id = this.getNodeParameter('customer_id', i) as number;           
                        responseData = await syncroApiRequestAllItems.call(this, 'GET', `/contacts`, {customer_id}, undefined, 'contacts');
                    }
                    if (operation === 'delete') {
                        const contact_id = this.getNodeParameter('contact_id', i) as number;           
                        responseData = await syncroApiRequest.call(this, 'DELETE', `/contacts/${contact_id}`);
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