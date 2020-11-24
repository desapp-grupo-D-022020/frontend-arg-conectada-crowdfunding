import { User } from './user';

export class JwtModel {
    token: string;
    type: string;
    userName: string;
    userId: number;
    authorities: string[];
}