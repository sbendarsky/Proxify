// Importing BehaviorSubject from rxjs
import { BehaviorSubject } from 'rxjs';

// Creating a BehaviorSubject for alerts with an initial value of null
const alertSubject = new BehaviorSubject(null);

// Exporting the alertService object
export const alertService = {
    alert: alertSubject.asObservable(), // The alert as an observable
    success, // Function to display a success alert
    error, // Function to display an error alert
    clear // Function to clear alerts
};

// Function to display a success alert
function success(message, showAfterRedirect = false) {
    // Pushing a new alert to the alertSubject
    alertSubject.next({
        type: 'alert-success', // The type of the alert
        message, // The message to display
        showAfterRedirect // Whether to show the alert after a redirect
    });
}

// Function to display an error alert
function error(message, showAfterRedirect = false) {
    // Pushing a new alert to the alertSubject
    alertSubject.next({
        type: 'alert-danger', // The type of the alert
        message, // The message to display
        showAfterRedirect // Whether to show the alert after a redirect
    });
}

// Function to clear alerts
function clear() {
    // If the showAfterRedirect flag is true, the alert is not cleared for one route change
    // This is useful for displaying alerts after a successful registration, for example
    let alert = alertSubject.value;
    if (alert?.showAfterRedirect) {
        alert.showAfterRedirect = false;
    } else {
        alert = null;
    }
    // Pushing the updated or cleared alert to the alertSubject
    alertSubject.next(alert);
}