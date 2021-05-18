![CI](https://img.shields.io/github/workflow/status/Maelstrom96/n8n-nodes-syncromsp/CI/main) ![NPMV](https://img.shields.io/npm/v/n8n-nodes-syncromsp) 
# n8n-nodes-syncromsp

This package provides nodes for [`n8n`](https://github.com/n8n-io/n8n) to work with [SyncroMSP](https://syncromsp.com).

## Installation

### In a local NPM installation

```bash
npm i n8n-nodes-syncromsp
```

The nodes should be automatically discovered by `n8n`. If not, setting the environment variable as described below should work.

### In a global installation

```bash
npm i -g n8n-nodes-syncromsp
```

You should then set the `N8N_CUSTOM_EXTENSIONS` variable to the path of the modules, e.g. 

- on Ubuntu:
```bash
export N8N_CUSTOM_EXTENSIONS="/usr/local/lib/node_modules/n8n-nodes-syncromsp"
```

- on Windows
```bash
setx N8N_CUSTOM_EXTENSIONS "%appdata%\npm\node_modules\n8n-nodes-syncromsp"
```

### In a Docker image

You'll have to spin your own `Dockerfile` that builds from the official `n8n` image:


```Dockerfile
FROM n8nio/n8n

USER root

RUN npm_config_user=root npm install -g n8n-nodes-syncromsp

ENV N8N_CUSTOM_EXTENSIONS "/usr/local/lib/node_modules/n8n-nodes-syncromsp"

```

## Usage

### Credentials

The credentials uses 2 variables : `API Token` and `API Subdomain`.

- `API Token` : You will need to generate a token using the [API Token menu](https://admin.syncromsp.com/api_tokens) found in the Admin section of Syncro. Make sure that you add the necessary permissions in order for the node actions to work properly.
- `API Subdomain` : This is your SyncroMSP subdomain that was chosen when creating your account. (e.g. `XXXXX.syncromsp.com`, `XXXXX` being your API subdomain)

## Features

The currently supported ressources are :
- [ ] Appointment
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
- [ ] Appointment Type
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
- [ ] Assets
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] ~~Delete~~ (Not supported?)
- [ ] Caller ID
- [x] Contact
  - [x] List/Search
  - [x] Create
  - [x] View Details
  - [x] Edit
  - [x] Delete
- [ ] Contract
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
- [ ] Customer
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
  - [ ] View latest
  - [ ] Autocomplete
- [ ] Estimate
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
  - [ ] Print
  - [ ] Email
  - [ ] Convert to invoice
  - [ ] line Item
    - [ ] Create
    - [ ] Edit
    - [ ] Delete
- [ ] Invoice
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
  - [ ] Get ticket
  - [ ] print
  - [ ] email
  - [ ] Line Item
    - [ ] Create
    - [ ] Edit
    - [ ] Delete
- [ ] Item
  - [ ] List/Search
- [ ] Lead
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
- [ ] Line Item
  - [ ] List/Search
- [ ] New Ticket Form
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
- [ ] Payment Method
  - [ ] List/Search
- [ ] Payment Profile
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
- [ ] Payment
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
- [ ] Phone
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details (Implemented?)
  - [ ] Edit
  - [ ] Delete
- [ ] Portal User
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details (Implemented?)
  - [ ] Edit
  - [ ] Delete
  - [ ] Create invitation
- [ ] Product Serial
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details (Implemented?)
  - [ ] Edit
  - [ ] Delete
- [ ] Product Serial
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
- [ ] Product
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete (Implemented?)
  - [ ] Update Location Quantity
  - [ ] Image
    - [ ] Add
    - [ ] Delete
- [ ] Purchase Order
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Receive
  - [ ] Add product
- [ ] RMM Alert
  - [ ] List/Search
  - [ ] Create
  - [ ] Mute
  - [ ] View Details
  - [ ] Delete
- [ ] Schedule
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
  - [ ] line Item
    - [ ] Create
    - [ ] Edit
    - [ ] Delete
- [ ] Search
- [ ] Settings
  - [ ] List
  - [ ] List Tabs settings
  - [ ] List Printing settings
- [ ] Ticket Timer
  - [ ] List/Search
- [ ] Ticket
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Edit
  - [ ] Delete
  - [ ] Settings
  - [ ] Print
  - [ ] Comment
  - [ ] line Item
    - [ ] Create
    - [ ] Edit
    - [ ] Delete
  - [ ] Timer Entry
    - [ ] Create
    - [ ] Edit
    - [ ] Delete
    - [ ] Charge
  - [ ] Worksheet Result
    - [ ] List
    - [ ] Add
    - [ ] View Details
    - [ ] Update
    - [ ] Delete
- [ ] Timelog
  - [ ] List/Search
  - [ ] Update
  - [ ] View last
- [ ] User
  - [ ] List/Search
  - [ ] View Details
- [ ] Vendor
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Update
  - [ ] Delete (Implemented?)
- [ ] Wiki Page
  - [ ] List/Search
  - [ ] Create
  - [ ] View Details
  - [ ] Update
  - [ ] Delete

Currently supported triggers :

- [ ] API Token
  - [ ] Created
  - [ ] Changed
- [ ] Admin
  - [ ] 10 Snail Mail Stamps Remaining
  - [ ] 15 SMS Credits Remaining
  - [ ] SMS Credits have run out
  - [ ] Snail Mail Credits have run out
- [ ] Appointment
  - [ ] (for me) - due in the next hour
  - [ ] Created
  - [ ] Booking - Created from widgets
  - [ ] (for me) - Created
- [ ] Asset
  - [ ] SNMP was enabled
  - [ ] has a date field 30 days in the future
  - [ ] has a date field 7 days in the future
- [ ] Chat
  - [ ] New unassigned message while I’m offline
  - [ ] New unassigned message while I’m online
  - [ ] New unread message while I’m offline
  - [ ] New unread message while I’m online
- [ ] Contact
  - [ ] Was created
- [ ] Contract
  - [ ] Someone replied
  - [ ] Was created
- [ ] Customer
  - [ ] New Phone Call (caller id system)
  - [ ] Prepay Hour balance reaches zero
  - [ ] Scripting was disabled
  - [ ] Was created
- [ ] Custome Email
  - [ ] Someone replied
- [ ] Employee
  - [ ] Clocked in or out
  - [ ] Edited Time Clock entry
- [ ] Estimate
  - [ ] (of mine) - is approved/declined
  - [ ] is approved/declined
  - [ ] An Estimate was emailed to the customer
  - [ ] email is replied to
  - [ ] is approved/declined in portal
- [ ] Invoice
  - [ ] A late fee was added/increased					
  - [ ] A payment failed on a recurring Invoice
  - [ ] A recurring Invoice was created
  - [ ] A recurring Invoice was skipped due to no line items
  - [ ] An Invoice email was replied to
  - [ ] An Invoice was emailed to the customer
  - [ ] Created (5 minute delay)
- [ ] Lead
  - [ ] Assigned to me
  - [ ] Created
  - [ ] Created via SMS
  - [ ] Replied
- [ ] Parts/Logistics
  - [ ] order was created
  - [ ] order was received any Ticket
  - [ ] order was received for my Ticket
- [ ] Payments
  - [ ] A new card was stored in the Customer Portal					
  - [ ] A payment was made					
  - [ ] A payment was made from a Xero Sync					
  - [ ] A payment was made from the Customer Portal					
  - [ ] A stored card is expiring in 15 days					
  - [ ] A stored card is expiring in 30 days					
  - [ ] A stored card is expiring in 60 days					
  - [ ] A stored card was removed in the Customer Portal					
  - [ ] A stored card was updated in the Customer Portal					
- [ ] Products
  - [ ] pending order was fulfilled					
  - [ ] product or quantity was changed					
- [ ] Purchase Order
  - [ ] Created					
  - [ ] (of any) - Past Due					
  - [ ] (of mine) - Past Due					
- [ ] RMA 
  - [ ] Created					
- [ ] RMM Alert
  - [ ] getting stale (daily rollup)					
  - [ ] was auto-resolved					
  - [ ] was created					
- [ ] RMM Asset 
  - [ ] Approved					
  - [ ] Denied					
  - [ ] Pending Approval					
  - [ ] application installed					
  - [ ] application uninstalled					
  - [ ] application updated					
  - [ ] Created					
- [ ] Reminder
  - [ ] due within the next hour					
- [ ] Return
  - [ ] Created					
- [ ] SLA
  - [ ] Breached on any Ticket					
  - [ ] Breached on my Ticket					
  - [ ] Breaching soon on any Ticket					
  - [ ] Breaching soon on my Ticket					
- [ ] Script
  - [ ] failed					
- [ ] Stock Take 
  - [ ] A recurring Stock Take was created					
  - [ ] A stock take has been assigned to me					
- [ ] Ticket
  - [ ] A hidden comment was added to any Ticket					
  - [ ] A hidden comment was added to my Ticket					
  - [ ] A ticket has been assigned to me					
  - [ ] An Intake Form was emailed to the ticket contact					
  - [ ] An Outtake Form was emailed to the ticket contact					
  - [ ] Automation was triggered					
  - [ ] Billing Status was changed					
  - [ ] Someone replied to any Ticket					
  - [ ] Someone replied to my Ticket					
  - [ ] Status was changed					
  - [ ] created (for anyone)					
  - [ ] created from email					
  - [ ] is due in the next 15 mins					
  - [ ] of yours is due in the next 15 mins					
  - [ ] was resolved

## Donations

If you would like to support this project, you can do so using the link below :

<a href="https://www.buymeacoffee.com/ajjaxnet" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="drawing" height="42"/></a>
