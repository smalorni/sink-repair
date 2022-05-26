import { Requests } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

/*Invoke the two functions from requests and service form */
export const SinkRepair = () => {
    return `
    <div class="form">
        <h1>Maude and Merle's Sink Repair</h1>
            <section class="serviceForm">
                ${ServiceForm()}
             </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
                ${Requests()}
        </section>
    </div>
    `
}
