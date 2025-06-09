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
