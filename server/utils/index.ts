// @todo(nick-ng): write hmac function from scratch
import { hmac } from 'https://deno.land/x/hmac@v2.0.1/mod.ts';

export const base64UrlEncodeString = (raw: string | ArrayBuffer): string => {
	let rawStr = '';
	if (typeof raw !== 'string') {
		rawStr = '';
		const bytes = new Uint8Array(raw);
		for (let i = 0; i < bytes.byteLength; i++) {
			rawStr += String.fromCharCode(bytes[i]);
		}
	} else {
		rawStr = raw;
	}

	return btoa(rawStr).replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
};

const base64ToUrlBase64 = (base64: string): string =>
	base64.replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');

export const base64UrlDecodeString = (str: string): string =>
	atob(str.replaceAll('-', '+').replaceAll('_', '/'));

export const encodeJWT = (payload: object, secret: string, signingAlgorithm = 'HS256'): string => {
	const header = {
		alg: signingAlgorithm,
		typ: 'JWT'
	};

	const headerStr = base64UrlEncodeString(JSON.stringify(header));
	const payloadStr = base64UrlEncodeString(JSON.stringify(payload));

	const message = [headerStr, payloadStr].join('.');

	const signatureStr = base64ToUrlBase64(
		hmac('sha256', secret, message, 'utf8', 'base64') as string
	);

	return [headerStr, payloadStr, signatureStr].join('.');
};

export const decodeJWT = (
	jwt: string,
	secret: string,
	_signingAlgorithm = 'HS256'
): { header: object; payload: object; verified: boolean } | null => {
	const [headerStr, payloadStr, signatureStr] = jwt.split('.');

	try {
		const message = [headerStr, payloadStr].join('.');

		const calculatedSignature = base64ToUrlBase64(
			hmac('sha256', secret, message, 'utf8', 'base64') as string
		);

		return {
			header: JSON.parse(base64UrlDecodeString(headerStr)),
			payload: JSON.parse(base64UrlDecodeString(payloadStr)),
			verified: calculatedSignature === signatureStr
		};
	} catch (e) {
		return null;
	}
};
