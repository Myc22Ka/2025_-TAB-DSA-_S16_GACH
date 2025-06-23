export interface Instructor {
    id: number;
    login: string;
    firstname: string;
    lastname: string;
    photoUrl: string;
    phoneNumber: string;
}

export interface HourSlot {
    fromTime: string;
    toTime: string;
    bookedCount: number;
    maxCount: number;
}

export interface Availability {
    dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    hours: HourSlot[];
}

export interface InstructorWithAvailability {
    instructor: Instructor;
    availability: Availability[];
}

export const daysOfWeek = [
    { label: 'Monday', value: 'MONDAY' },
    { label: 'Tuesday', value: 'TUESDAY' },
    { label: 'Wednesday', value: 'WEDNESDAY' },
    { label: 'Thursday', value: 'THURSDAY' },
    { label: 'Friday', value: 'FRIDAY' },
    { label: 'Saturday', value: 'SATURDAY' },
    { label: 'Sunday', value: 'SUNDAY' },
];
