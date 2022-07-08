export type User = {
    id: string;
    google_id: string;
    birthday: string;
    gender: string;
    first_name: string;
    last_name: string;
    email: string;
    profile: Profile;
    createdAt: Date;
}

export type Profile = {
    id: number;
    username: string;
    image_url: string;
    level: number;
    experience: number;
    reports?: Array<Report>;
    ratings: any;
}

export type Post = {
    title: string,
    id: number,
    redactor: Admin,
    content: string
    category: string,
    createdAt: Date,
    views: number,
    pinned: boolean,
    published: boolean,
    lastEditedAt: string | Date,
}

export type Admin = {
    id: string,
    createdAt: Date,
    email: string,
    image_url: string,
    first_name: string,
    last_name: string,
    role: string,

    posts: Array<Post>
}

export type Report = {
    profile: Profile,
    id: number,
    createdAt: Date,
    address: string,
    coordinates: Array<string>,
    images_urls: Array<string>,
    image_deleteHash: string,
    tags: string,
    suggestion: string,
    hasTrashBins: boolean,

    profile_id: number,

    note1: number,
    note2: number,
    note3: number,
    note4: number,
    note5: number,

    resolved: boolean,
    approved: boolean,
    comments: Array<Comment>,
}

export type Comment = {
    id: number;
    content: string;
    profile: Profile;
    Report: Report;
    createdAt: Date;
}

export type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}