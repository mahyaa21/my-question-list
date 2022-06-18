import getConfig from "next/config";
import { REFRESH_TOKEN, TOKEN } from "../store/constants";
import { wrappedLocalStorage } from "./hybridStorage";
import { StringUtils } from "./StringUtils";
import { ObjectUtils } from "./ObjectUtils";

const {
	publicRuntimeConfig: { auth },
} = getConfig();

export const requestContentType = (request) => {
	if (["get", "options"].includes(request.method?.toLowerCase() as string)) {
		request.headers = {
			...request.headers,
			"Content-Type": "text/plain",
		};
	} else {
		request.headers = {
			...request.headers,
			"Content-Type": "application/json",
		};
	}
	return request;
};

export const requestHeaderTransformer = (request) => {
	const { noAuth, ...headers } = request.headers;
	if (noAuth) {
		request.headers = headers;
	} else if (!("Authorization" in request.headers)) {
		const accessToken = wrappedLocalStorage.getItem(TOKEN);
		request.headers = {
			...request.headers,
			Authorization: `Bearer ${accessToken}`,
		};
	}
	if (
		!("Application-Name" in request.headers) &&
		!("application-name" in request.headers)
	) {
		// TODO: fix this part
		const product = window?.location.href.split("/")[4];
		if (StringUtils.isItFilled(product)) {
			request.headers = {
				...request.headers,
				"Application-Name": (product as string).toUpperCase(),
			};
		}
	}
	return request;
};

async function refreshToken() {
	const token = wrappedLocalStorage.getItem(REFRESH_TOKEN);
	if (!StringUtils.isItFilled(token)) {
		throw new Error("refreshToken is undefined");
	} else {
		const response = await fetch(`${auth.baseUrl}/token`, {
			method: "POST",
			body: new URLSearchParams({
				grant_type: "refresh_token",
				client_id: auth.clientId,
				refresh_token: token as string,
			}),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		const data = await response.json();
		if (ObjectUtils.checkIfItsFilled(data.error)) {
			throw new Error("refreshToken has been expired");
		} else {
			return data;
		}
	}
}

export const refreshAuthLogic = (failedRequest) =>
	refreshToken()
		.then((tokenRefreshResponse) => {
			wrappedLocalStorage.setItem(TOKEN, tokenRefreshResponse.access_token);
			failedRequest.response.config.headers.Authorization = `Bearer ${tokenRefreshResponse.access_token}`;
			return Promise.resolve();
		})
		.catch((err) => console.log(err));
