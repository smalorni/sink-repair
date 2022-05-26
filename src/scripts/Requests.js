import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
        }
    }
)

/* Define a function with one parameter that will be passed to .map() method. Goal of function is to convert each service request object to HTML. Each service request should be wrapped by <li> tag. */

export const Requests = () => {

    const serviceRequests = getRequests()
    const plumbers = getPlumbers()

       let htmlString = "<ul>"
        //use .map method to convert objects to string
      const requestItem = serviceRequests.map((serviceRequest) => {
            return `
                <li>
                    ${serviceRequest.description}
                        <button class="request__delete"id="request--${serviceRequest.id}">Delete</button>
                </li>
                     
                <select class="plumbers" id="plumbers"><option value="">Choose</option>
                 ${plumbers.map(plumber => {
                        return `<option value="${serviceRequest.id}--${plumber.id}">${plumber.name}</option>`}).join("")
    }
                </select>
                `
        }).join("")
        //.join method
        htmlString += requestItem
        htmlString += "</ul>"
        
        return htmlString
    
}

/* DELETE BUTTON ADDED- Now that you have a function that can send a DELETE request to the API, you can add a button for the user to click and initiate that process. Add the button element right next to the text of each request. */

/* Now add an event listener to the main container. When the user clicks on any of the delete buttons, invoke the deleteRequest() function you just made above. Make sure you pass the id of the service request to the deleteRequest() function as an argument. */

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

           console.log(requestId)
           console.log(plumberId)
        
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId), 
                plumberId: parseInt(plumberId),
                date_created: Date.now()
             }
                saveCompletion(completion)
            }
        }
)