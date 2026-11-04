export const placeCategories = {
    school: {
        label: "Escuelas",
        color: "#2563EB",
        icon: "/icons/school.svg"
    },

    hospital: {
        label: "Hospitales",
        color: "#DC2626",
        icon: "/icons/hospital.svg"
    },

    museum: {
        label: "Museos",
        color: "#9333EA",
        icon: "/icons/museum.svg"
    },

    airport: {
        label: "Aeropuertos",
        color: "#D97706",
        icon: "/icons/airport.svg"
    },

    plaza: {
        label: "Plazas",
        color: "#0891B2",
        icon: "/icons/plaza.svg"
    }, 

    hotel: {
        label: "Hoteles",
        color: "#DB2777",
        icon: "/icons/hotel.svg"
    },

    park: {
        label: "Parques",
        color: "#059669",
        icon: "/icons/park.svg"
    },

    landmark: {
        label: "Lugares importantes",
        color: "#475569",
        icon: "/icons/landmark.svg"
    },
} as const;

export type PlaceCategory = keyof typeof placeCategories;