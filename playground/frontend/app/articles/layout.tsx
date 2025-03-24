"use client";

import { SocketContext } from "@/app/SocketContext";
import { HocuspocusProviderWebsocket } from "@hocuspocus/provider";
import { useEffect, useState } from "react";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [socket, setSocket] = useState<HocuspocusProviderWebsocket | null>(
		null,
	);

	useEffect(() => {
		const newlyCreatedSocket = new HocuspocusProviderWebsocket({
			url: "ws://localhost:1234",
		});

		setSocket(newlyCreatedSocket);

		return () => {
			newlyCreatedSocket?.destroy();
		};
	}, []);

	if (socket) {
		return <SocketContext value={socket}>{children}</SocketContext>;
	}
}
