import {
	INodeProperties,
} from 'n8n-workflow';

export const customerOperations = [
	{
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'customer',
                ],
            },
        },
        options: [
            {
				name: 'Delete',
				value: 'delete',
				description: 'Delete a customer',
			},
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a customer'
            },
            {
				name: 'Get All',
				value: 'getAll',
                description: 'Retrieve all customer'
			},
            {
				name: 'Latest',
				value: 'latest',
                description: 'Retrieve the last created customer'
			},
        ],
        default: 'getAll',
        description: 'The operation to perform',
    },
] as INodeProperties[];

export const customerFields = [
	// ----------------------------------
	//        customer: get
	// ----------------------------------
    {
        displayName: 'Customer',
        name: 'customer_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getCustomers',
        },
        required: true,
        placeholder: 'Wire LLC',
        displayOptions: {
            show: {
                resource: [
                    'customer',
                ],
                operation: [
                    'get',
                ],
            },
        },
        default: "",
        description:'Customer ID',
    },
    // ----------------------------------
	//        customer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Return all results.',
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 5,
		description: 'The number of results to return.',
		typeOptions: {
			minValue: 1,
			maxValue: 10000,
		},
		displayOptions: {
			show: {
				resource: [
					'customer',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
	},
    // ----------------------------------
	//        customer: delete
	// ----------------------------------
    {
        displayName: 'Customer',
        name: 'customer_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getCustomers',
        },
        required: true,
        placeholder: 'Wire LLC',
        displayOptions: {
            show: {
                resource: [
                    'customer',
                ],
                operation: [
                    'delete',
                ],
            },
        },
        default:'',
        description:'ID of the customer',
    },
] as INodeProperties[];