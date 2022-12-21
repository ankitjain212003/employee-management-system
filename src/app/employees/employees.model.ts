// TODO: Replace this with your own data model type
export interface Employ {
    designation: null | 'Engineer'| 'Lead' | 'Manager'| 'Director' | 'CEO';
    location: null | 'Delhi' | 'Mumbai' | 'Chennai' | 'Kolkatta';
    name: string;
    dob: null | Date;
    id: number;
}