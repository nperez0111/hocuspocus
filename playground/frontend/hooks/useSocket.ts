"use client";

import { useEffect, useState } from "react";

declare global {
	interface Window {
		socket: HocuspocusProviderWebsocket | null;
	}
}

import { HocuspocusProviderWebsocket } from "@hocuspocus/provider";

export const useSocket = () => {
	const [socket, setSocket] = useState<HocuspocusProviderWebsocket | null>(
		null,
	);

	useEffect(() => {
		// havent found a better way to only create a single websocket connection even when using React strict mode in development
		if (window.socket) {
			setSocket(window.socket);
		} else {
			const newlyCreatedSocket = new HocuspocusProviderWebsocket({
				url: "ws://localhost:1234",
			});

			setSocket(newlyCreatedSocket);

			window.socket = newlyCreatedSocket;
		}
	}, []);

	return { socket: socket };
};
