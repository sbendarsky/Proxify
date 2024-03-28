import { BehaviorSubject } from 'rxjs';

// Initialize a BehaviorSubject to manage alerts
const alertSubject = new BehaviorSubject(null);

// Expose methods to interact with the alert service
export const alertService = {
    alert: alertSubject.asObservable(), // Observable for subscribing to alerts
    success, // Method to show success alert
    error, // Method to show error alert
    clear // Method to clear alerts
};

// Method to show success alert
function success(message, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-success', // Type of alert (success)
        message, // Message to display
        showAfterRedirect // Flag to control whether to clear the alert after a route change
    });
}

// Method to show error alert
function error(message, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-danger', // Type of alert (error)
        message, // Message to display
        showAfterRedirect // Flag to control whether to clear the alert after a route change
    });
}

// Method to clear alerts
function clear() {
    // If showAfterRedirect flag is true, do not clear the alert immediately
    let alert = alertSubject.value;
    if (alert?.showAfterRedirect) {
        alert.showAfterRedirect = false;
    } else {
        alert = null; // Clear the alert
    }
    alertSubject.next(alert); // Update the alert subject
}
