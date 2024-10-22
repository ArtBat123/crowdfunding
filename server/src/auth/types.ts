export interface AuthSecurityData {
    ip?: string;
    userAgent?: string;
    fingerprint?: string;
}

export interface JWTPayload {
    userId: number;
}

export interface UserJWTPayload {
    userId: number;
    iat: number;
    exp: number;
}
