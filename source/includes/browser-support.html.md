# Browser Support

The Bestow application will work with the following browsers. Correct functionality may work in other browsers 
but is not supported or guaranteed.

* Chrome
* Firefox
* Safari
* Microsoft Edge

# Widgets

<br/>

### Quote

**Creating a Quote**

Every insurance policy begins with a quote. You can think of quotes as templates that eventually turn into policies if a user decides to buy. Quotes are used to indicate the terms of the policy and the price (premium) associated with it.

When calculating policy prices, we take many attributes into consideration, such as the user's age, gender, height, weight and status. You’ll need to include this information when creating a quote through the API.

**Url:** https://agent-quote.bestow.com/<agentId>

**Parameters**

| Parameter       | Required | Description                                                                        |
|-----------------|----------|:-----------------------------------------------------------------------------------|
| date_of_birth   | no       | Prefill `Birthdate` field. Total height in inches                                  |
| gender          | no       | Prefill `Gender` field. "male" or "female"                                         |
| height          | no       | Prefill `Height` field. Total height in inches                                     |
| tobacco         | no       | Prefill `Tobacco` field. "yes" or "no"                                             |
| weight          | no       | Prefill `Weight` field. Total weight in lbs                                        |
| zip             | no       | Prefill `Zip Code` field. 5 digit zipcode value                                    |

<br/>

### Enrollment

**Creating an Enrollment**

Enrollment is the application process of purchasing a policy. An application is a collection of data about a customer that is used to determine whether we would like to sell them a life insurance policy. It is a request to be considered for an insurance policy. A customer ***applies*** for a policy. Just because they apply does not mean they will be issued a policy.

Applications are created when a customer creates an account and ends upon an underwriting decision.

**Url:** https://enroll.bestow.com/

**Parameters**

| Parameter       | Required | Description                                                                        |
|-----------------|----------|:-----------------------------------------------------------------------------------|
| date_of_birth   | no       | Prefill `Birthdate` field. Total height in inches                                  |
| gender          | no       | Prefill `Gender` field. "male" or "female"                                         |
| height          | no       | Prefill `Height` field. Total height in inches                                     |
| tobacco         | no       | Prefill `Tobacco` field. "yes" or "no"                                             |
| weight          | no       | Prefill `Weight` field. Total weight in lbs                                        |
| zip             | no       | Prefill `Zip Code` field. 5 digit zipcode value                                    |
| quoteid         | no       | Pass in previous quote id. *date_of_birth, gender, height, tobacco, weight and zip will be prefilled with previous information provided during quote.* |