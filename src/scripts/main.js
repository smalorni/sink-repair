import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers, fetchCompletion } from "./dataAccess.js"

/* You need to fetch the data from the API and store it in application state before you can convert the data structures to HTML representations. */

const mainContainer = document.querySelector("#container")

/* Then update your main.js to request both resources using the following syntax. Notice the new .then() method which, in turn, invokes the fetchPlumbers function. */

export const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletion())
        .then(
            () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()
