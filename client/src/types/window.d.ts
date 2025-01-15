interface Window {
    smartCaptcha: {
        render(
            container: HTMLElement | string,
            params: {
                sitekey: string;
                callback?: (token: string) => void;
                hl?: 'ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr';
                test?: boolean;
                webview?: boolean;
                invisible?: boolean;
                shieldPosition?:
                    | `top-left`
                    | `center-left`
                    | `bottom-left`
                    | `top-right`
                    | `center-right`
                    | `bottom-right`;
                hideShield?: boolean;
            }
        );
    };
}
declare const window: Window;
