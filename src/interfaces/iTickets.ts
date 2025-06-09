export type Ticket = {
    id: number;
    purchaseTime: string;
    availabilityTo: string;
    status: string;
    price: number;
    validDurationMinutes: number;
    usedTime: string;
    attractionDetails: {
        name: string;
        description: string;
        imageUrl: string;
        price: number;
        maxPeopleAmount: number;
        currentPeopleAmount: number;
    };
    attractionName: string;
};
