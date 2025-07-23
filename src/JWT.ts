
import { sign } from 'react-native-pure-jwt';
/**
 * Disclaimer
 * It's not recommended to store your credentials in the source code.
 * This is only for demonstration purposes for sake of simplicity.
 * You should use a secure backend to generate the token and pass it to the client.
 */
const ZOOM_MEETING_SDK_KEY = '';
const ZOOM_MEETING_SDK_SECRET = '';

export const config = {
    meetingNumber: '',
    userName: 'ReactNative',
    password: '',
    role: 0,
};

export async function generateJwt() {
    const iat = new Date().getTime();
    const exp = iat + 20 * 60 * 60 * 1000;
    try {
        const token = await sign(
            {
                sdkKey: ZOOM_MEETING_SDK_KEY,
                appKey: ZOOM_MEETING_SDK_KEY,
                iat: iat,
                role: config.role,
                mn: config.meetingNumber,
                tokenExp: Math.floor(exp / 1000),
                exp: exp,
            },
            ZOOM_MEETING_SDK_SECRET,
            { alg: 'HS256', }
        );
        console.log('token', token);
        return token;
    } catch (e) {
        console.log('JWT generation failed', e);
        return '';
    }
}
