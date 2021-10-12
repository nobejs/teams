# Teams - Microservice

[![Nobe](https://github.com/nobejs/teams/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/nobejs/teams/actions/workflows/node.js.yml)

[![Docker](https://github.com/nobejs/teams/actions/workflows/docker.js.yml/badge.svg?branch=master)](https://github.com/nobejs/teams/actions/workflows/docker.js.yml)

##### Table of Contents  

[Customers/UserCanCreateCustomer](#Customers-UserCanCreateCustomer)  


## Stories and APIs

<a name="Customers-UserCanCreateCustomer"/>

#### Customers/UserCanCreateCustomer

In order to make stripe purchases a customer should be created for an user under a tenant. It's possible to use same customer_id under all tenants, in that case there is no need to create a customer explicitly, when subscribe api is called, application will check customer is created and a Tenant would be created.


#### Customers/UserCanViewCustomers

User can get customer Ids so that they can proceed during checkout. This API might not be needed, as part of subscription, it check if customer is there and uses that.

#### Teams/UserCanViewTeams

A logged in user can view all the teams they are part of


Rename all the columns

teams -> created_at, updated_at

select(teams.created_at as teams_created_at)

?sort_by=teams_created_at