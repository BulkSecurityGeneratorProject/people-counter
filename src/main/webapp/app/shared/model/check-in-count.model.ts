import { Moment } from 'moment';
import { IStore } from 'app/shared/model//store.model';

export interface ICheckInCount {
    id?: number;
    personIn?: number;
    personout?: number;
    countDate?: Moment;
    store?: IStore;
}

export class CheckInCount implements ICheckInCount {
    constructor(
        public id?: number,
        public personIn?: number,
        public personout?: number,
        public countDate?: Moment,
        public store?: IStore
    ) {}
}
