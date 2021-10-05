# Table

Epic = [Story1, Story2]

- An User should be able to create a team [Done]
- An User should be able to update a team [Done]
- An User should be able to invite members to a team
- An User should be able to remove a member from the team
- An User should be able to get their teams
- An User should be able to get their team members [Done]
- An User should be able to leave a team

- An User should be able to subscribe a team to a Stripe Plan
- An User should be able to unsubscribe a team from a Stripe Plan
- An User should be able to cancel a team from a Stripe Plan
- An User should be able to change a team to a different Stripe Plan
- An User should be able to change the team name and profile picture

## An User should be able to create a team

### Prepare

- tenant
- name
- slug
- creator_user_uuid

### Authorize

- Any user can create a Team

### Handle

- Slug should be unique
- Add user to team members as a owner

### Respond

- team uuid

---

## An User should be able to update a team

### Prepare

- name
- slug

### Authorize

- Only owner can update the name and slug

### Handle

- Team name and Slug should be unique

### Respond

- team uuid

---

## An User should be able to invite members to a team

Right now we support only Invite user by email

### Prepare

- team_uuid
- email

### Authorize

- Only team owner can invite

### Handle

- email already shouldn't have been invited
- Add member

### Respond

- success

---

## An User should be able to remove a member from the team

### Prepare

- member_uuid

### Authorize

- Only team owner can remove

### Handle

- Remove member

### Respond

- success

---

## An User should be able to get their teams

### Prepare

- tenant
- user_uuid
- status: part_of, invited_to

### Authorize

- Any user

### Handle

- Find teams where user_uuid is part_of || invited_to

### Respond

- collection of teams

---

## An User should be able to get their team members

### Prepare

- team_uuid

### Authorize

- Team member

### Handle

- Find members of the team along with invited to

### Respond

- collection of members

---

## An User should be able to leave a team

### Prepare

- team_uuid

### Authorize

- Team member

### Handle

- Remove current user from selected Team

### Respond

- success

---

## A Team Can Subscribe to Stripe Plan

We will be using Stripe Checkout flow for this feature, essentially it required two important steps:

1. Create a Checkout Session
   - Which returns an URL in response
   - User should be redirected to that url
2. Then after the redirection to your portal, get the checkout session and update the subscription accordingly

---

## An User should be able to unsubscribe a team from a Stripe Plan

## An User should be able to cancel a team from a Stripe Plan

## An User should be able to change a team to a different Stripe Plan

## An User should be able to change the team name and profile picture

---

DB Tables:

### teams

- uuid
- tenant
- name
- slug
- creator_user_uuid
- created_at
- updated_at
- deleted_at

### team_members

- uuid
- team_uuid
- user_uuid
- email
- status (invited, accepted, rejected)
- role (member, owner)
- created_at
- updated_at
- deleted_at

### subscriptions

- uuid
- team_uuid
- gateway (stripe)
- status
- ends_on
- subscription_id
- created_at
- updated_at
- deleted_at

https://github.com/laravel/cashier-stripe/blob/13.x/src/Http/Controllers/WebhookController.php

- https://stripe.com/docs/api/events/types#event_types-customer.subscription.created
- https://stripe.com/docs/api/events/types#event_types-customer.subscription.updated
- https://stripe.com/docs/api/events/types#event_types-customer.subscription.deleted
- https://stripe.com/docs/api/events/types#event_types-invoice.payment_action_required
