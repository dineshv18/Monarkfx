export interface CourseData {
    id: string;
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    salePrice?: number;
    paid: boolean;
    isBestseller?: boolean;
    isTrending?: boolean;
    isPopular?: boolean;
    isFeatured?: boolean;
    language?: string;
    category?: {
        id: string;
        name: string;
    };
    categoryId: string;
    userId: string;
    validityDays?: number;
    courseProgress?: {
        percentage: number;
        completedChapters: number;
        totalChapters: number;
    };
}

export interface CourseCardProps {
    course: CourseData;
    hidePrice?: boolean;
    expiryDate?: string;
    isExpired?: boolean;
    daysLeft?: number;
}

export interface Enrollment {
    id: string;
    course: CourseData;
    userId: string;
    expiryDate: string;
    isExpired: boolean;
    daysLeft: number | null;
    enrolledAt: string;
}

export interface RawPurchase {
    id: string;
    course: CourseData;
    userId: string;
    expiryDate: string;
    purchasedAt: string;
}

export interface Purchase extends RawPurchase {
    isExpired: boolean;
    daysLeft: number | null;
}
