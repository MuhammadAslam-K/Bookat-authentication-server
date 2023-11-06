export interface rideConfirmEmailData {
    userName: string | undefined;
    pickUpLocation: any;
    dropOffLocation: any;
    driverName: any;
    vehicleType: any;
    vehicleNo: any;
    amount: any;
}

export interface emailInfo {
    to: string | undefined;
    subject: string;
    message: string;
}