import { Role, RoleChangeRequestDto } from '@/interfaces/IUser';

export interface UseRoleChangeRequestsResult {
    requests: RoleChangeRequestDto[];
    loading: boolean;
    error: string | null;
    submitRequest: (role: Role) => Promise<void>;
    refetch: () => Promise<void>;
}
