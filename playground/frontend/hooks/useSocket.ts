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
		if (window.socket) {
			setSocket(window.socket);
		} else {
			setSocket(
				new HocuspocusProviderWebsocket({
					url: "ws://localhost:1234",
				}),
			);

			window.socket = socket;
		}
	}, [socket]);

	return { socket: socket };
};
