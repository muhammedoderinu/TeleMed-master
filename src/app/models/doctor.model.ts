import { User } from 'src/app/models/user.model';
export interface Doctor{
    specialization: string
    id:string
    updated_at:string
    created_at:string
    user: User

}