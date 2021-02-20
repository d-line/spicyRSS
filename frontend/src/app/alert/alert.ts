export class Alert {
    id: string | undefined;
    type: AlertType | undefined;
    message: string | undefined;
    autoClose: boolean | undefined;
    keepAfterRouteChange: boolean | undefined;
    fade: boolean | undefined;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}

// eslint-disable-next-line no-shadow
export enum AlertType {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Success,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Error,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Info,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Warning
}
