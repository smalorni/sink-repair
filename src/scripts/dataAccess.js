/*Client: Maude and Merle owns Sink repair and plumbing service business.
Goal: Web app that will let customers submit service requests that can be viewed. 
Idea: Form that allows a person to enter description of job, address of work location, spending limit for job, date the work should be completed by. 

Once job is completed, Maude and Merle wants a way to track who worked on the service request and reflect whether job was completed or not. If Maude and Merle is unable to work on request due to time constraints, they want the ability to delete it. */

import { render } from "./main.js"

/* Store external data in application state (object) when you fetch it. */
const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

/********** HTTP GET Request with Fetch ****************/
const API = "http://localhost:8088"
/* Retrieve all existing requests and list them in UI. */
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then((serviceRequests) => {
                // Store the external state in application state
                //Question: where serviceRequests come from? New variable name?
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const fetchCompletion = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


/* Export function getRequests that returns a copy of the request state. */
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}
/* User typing in form field, changing the state to transient state because the person hasn't committed to service request until button is clicked. When the button is clicked, convert from transient state to permanent by storing it in database.json file by using fetch() call.

The POST method on HTTP request means "API...create something new" - you are sending the request */
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

/* Remember that every time state changes, you have to generate new HTML representations of the state which means you need to implement the stateChanged custom action again to generate new state and store it permanently in API. */

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

/* When you the DELETE method of an HTTP request, you must identify a single resource. You can't delete an entire collection w/ single HTTP request. This function whose responsibility it is to initiate the fetch request for DELETE must have primary key sent to it as an argument. */

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(() => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
/* Function that saved data - when a job is completed and who completed the job was assigned */
export const saveCompletion = (completedJobs) => {
    const fetchCompletion = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedJobs)
    }
    return fetch(`${API}/completions`, fetchCompletion)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) 
            }
        )
}

/* You need the const mainContainer from main, needs to be defined */
const mainContainer = document.querySelector("#container")
/* Main need to listen for custom event and invoke render() function to build all HTML again */

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

