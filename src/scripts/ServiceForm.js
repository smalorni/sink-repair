
import { sendRequest } from "./dataAccess.js"

/*
 HTML input fields are how you collect user data. Time for you to define some fields to collect the information from a user that Maude and Merle want about a service request.
 */

export const ServiceForm = () => {
    let html = `

    <div class="container">
        <div class="field_service">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="input" />
        </div>
        <div class="field_address">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="input" />
        </div>
        <div class="field_budget">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="input" />
        </div>
        <div class="field_date">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="input" />
        </div>
        <button class="button" id="submitRequest">Submit Request</button>
    </div>
    `
    
    return html
}

/* Add event listener */

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate
        }
        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
        }
    }
)


