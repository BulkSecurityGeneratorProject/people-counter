import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICheckInCount } from 'app/shared/model/check-in-count.model';

type EntityResponseType = HttpResponse<ICheckInCount>;
type EntityArrayResponseType = HttpResponse<ICheckInCount[]>;

@Injectable({ providedIn: 'root' })
export class CheckInCountService {
    public resourceUrl = SERVER_API_URL + 'api/check-in-counts';

    constructor(protected http: HttpClient) {}

    create(checkInCount: ICheckInCount): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(checkInCount);
        return this.http
            .post<ICheckInCount>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(checkInCount: ICheckInCount): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(checkInCount);
        return this.http
            .put<ICheckInCount>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICheckInCount>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICheckInCount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(checkInCount: ICheckInCount): ICheckInCount {
        const copy: ICheckInCount = Object.assign({}, checkInCount, {
            countDate: checkInCount.countDate != null && checkInCount.countDate.isValid() ? checkInCount.countDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.countDate = res.body.countDate != null ? moment(res.body.countDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((checkInCount: ICheckInCount) => {
                checkInCount.countDate = checkInCount.countDate != null ? moment(checkInCount.countDate) : null;
            });
        }
        return res;
    }
}
