
export interface UserSchema {
    id: number;
    username: string;
    password: string;
    status: "ONLINE" | "OFFLINE";
}

export interface MessageSchema {
    id: number | undefined,
    roomId: number | undefined,
    sender: UserSchema,
    receiver: UserSchema | undefined,
    content: string,
    createdAt: string | undefined,
}