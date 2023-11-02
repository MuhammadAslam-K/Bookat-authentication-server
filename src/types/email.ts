export interface rideConfirmEmailData {
    userName: string;
    pickUpLocation: string;
    pickUpTime: string;
    dropOffLocation: string;
    driverName: string;
    vehicleType: string;
    vehicleNo: string;
    amount: string
}

export interface emailInfo {
    to: string;
    subject: string;
    message: string;
}