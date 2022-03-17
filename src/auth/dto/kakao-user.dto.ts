export class KakaoUser {
    // appUserId 값과 동일하게 사용
    id: number;
    connected_at: Date;
    synched_at: Date;
    properties: KakaoUserProperties;
    kakao_account: KakaoUserAccountDetail;
}

export class KakaoUserProperties {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
}

export class KakaoUserAccountDetail {
    profile_needs_agreement: boolean;
    profile: KakaoUserAccountProfile;
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
    has_phone_number: boolean;
    phone_number_needs_agreement: boolean;
    phone_number: string;
}

export class KakaoUserAccountProfile {
    nickname: string;
    thumbnail_image_url: string;
    profile_image_url: string;
    is_default_image: boolean;
}