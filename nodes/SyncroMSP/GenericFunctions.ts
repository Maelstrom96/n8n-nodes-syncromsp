import {
	OptionsWithUri,
} from 'request';

import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject, NodeApiError,
} from 'n8n-workflow';

export async function syncroApiRequest(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, resource: string, body: any = {}, query: IDataObject = {}, uri?: string, option: IDataObject = {}): Promise<any> { // tslint:disable-line:no-any

	const credentials = this.getCredentials('syncroMSPApi') as IDataObject;

	try {
		let options: OptionsWithUri = {
			headers: {
				'Accept': 'application/json',
				'Authorization': `bearer ${credentials.apiKey}`,
			},
			method,
			body,
			qs: query,
			uri: uri || `https://${credentials.subdomain}.syncromsp.com/api/v1${resource}`,
			json: true,
		};
		if (Object.keys(body).length === 0) {
			delete options.body;
		}
		if (!Object.keys(query).length) {
			delete options.qs;
		}
		options = Object.assign({}, options, option);
	
		return await this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function syncroApiRequestAllItems(this: IExecuteFunctions | ILoadOptionsFunctions, method: string, endpoint: string, body: any = {}, query: IDataObject = {}, dataString: string): Promise<any> { // tslint:disable-line:no-any

	let returnData: IDataObject[] = [];

	let responseData;
	dataString = dataString || "data";
	body.page = 1;
	let limit = Infinity;

	try {
		limit = this.getNodeParameter('limit', 0) as number;
		limit = limit === 0 ? Infinity : limit;
	} catch (error) {}

	do {
		responseData = await syncroApiRequest.call(this, method, endpoint, body, query);
		if (responseData.meta !== undefined) {
			if (!responseData[dataString]) throw new NodeApiError(this.getNode(), {message: `No data under ${dataString}`});
			returnData.push.apply(returnData, responseData[dataString]);
			body.page++;
		}
		else {
			throw new NodeApiError(this.getNode(), {message: 'Bad return value'});
		}
	} while (
		responseData.meta !== undefined &&
		responseData.meta.total_pages > responseData.meta.page &&
		limit > returnData.length
	);

	if (limit !== Infinity) {
		returnData = returnData.slice(0, limit);
	}

	return returnData;
}
