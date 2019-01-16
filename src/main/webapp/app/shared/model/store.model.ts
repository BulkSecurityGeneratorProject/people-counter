import { ICheckInCount } from 'app/shared/model//check-in-count.model';

export interface IStore {
    id?: number;
    name?: string;
    address?: string;
    checkInCounts?: ICheckInCount[];
}

export class Store implements IStore {
    constructor(public id?: number, public name?: string, public address?: string, public checkInCounts?: ICheckInCount[]) {}
}
