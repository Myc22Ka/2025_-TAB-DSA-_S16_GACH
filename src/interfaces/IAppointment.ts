export type Appointment = {
    instructorName: string;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
};

export const dayOrder: Record<string, number> = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
};
