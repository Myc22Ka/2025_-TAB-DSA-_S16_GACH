import { Role } from './IUser';

export type RoleRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface IRoleChangeRequest {
    id: number;
    userLogin: string;
    currentRole: Role;
    requestedRole: Role;
    status: RoleRequestStatus;
}
