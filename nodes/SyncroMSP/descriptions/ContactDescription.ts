import {
	INodeProperties,
} from 'n8n-workflow';

export const contactOperations = [
	{
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: [
                    'contact',
                ],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a contact',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a contact'
            },
            {
				name: 'Delete',
				value: 'delete',
				description: 'Delete a contact',
			},
            {
                name: 'Get',
                value: 'get',
                description: 'Retrieve a contact'
            },
            {
				name: 'Get All',
				value: 'getAll',
                description: 'Retrieve all contacts'
			},
        ],
        default: 'create',
        description: 'The operation to perform',
    },
] as INodeProperties[];

export const contactFields = [
	// ----------------------------------
	//        contact: get
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
                    'contact',
                ],
                operation: [
                    'create',
                ],
            },
        },
        default: "",
        description:'Customer id linked with the contact',
    },
    {
        displayName: 'Customer',
        name: 'customer_id',
        type: 'options',
        typeOptions: {
            loadOptionsMethod: 'getCustomers',
        },
        required: false,
        placeholder: 'Wire LLC',
        displayOptions: {
            show: {
                resource: [
                    'contact',
                ],
                operation: [
                    'update',
                    'getAll',
                ],
            },
        },
        default: "",
        description:'Customer linked with the contact',
    },
    {
        displayName: 'Contact ID',
        name: 'contact_id',
        type: 'string',
        required: false,
        placeholder: '1337',
        displayOptions: {
            show: {
                resource: [
                    'contact',
                ],
                operation: [
                    'get',
                    'update'
                ],
            },
        },
        default:'',
        description:'ID of the contact',
    },
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: false,
        placeholder: 'John Doe',
        displayOptions: {
            show: {
                operation: [
                    'create',
                    'update',
                ],
                resource: [
                    'contact',
                ],
            },
        },
        default:'',
        description:'Name of the contact',
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'contact',
                ],
                operation: [
                    'create',
                    'update',
                ],
            },
        },
        options: [
            {
                displayName: 'Address',
                name: 'address1',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Address2',
                name: 'address2',
                type: 'string',
                default: '',
            },
            {
                displayName: 'City',
                name: 'city',
                type: 'string',
                default: '',
            },
            {
                displayName: 'State',
                name: 'state',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Zip Code',
                name: 'zip',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Phone',
                name: 'phone',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Mobile',
                name: 'mobile',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Notes',
                name: 'notes',
                type: 'string',
                default: '',
            },
        ],
    },
    // ----------------------------------
	//        contact: getAll
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
					'contact',
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
					'contact',
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
	//        contact: delete
	// ----------------------------------
    {
        displayName: 'Contact ID',
        name: 'contact_id',
        type: 'string',
        required: false,
        placeholder: '1337',
        displayOptions: {
            show: {
                resource: [
                    'contact',
                ],
                operation: [
                    'delete',
                ],
            },
        },
        default:'',
        description:'ID of the contact',
    },
] as INodeProperties[];