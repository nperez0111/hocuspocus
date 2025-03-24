"use client";

import { SocketContext } from "@/app/SocketContext";
import { useSocket } from "@/hooks/useSocket";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const socket = useSocket().socket;

	if (socket) {
		return <SocketContext value={socket}>{children}</SocketContext>;
	}
}
