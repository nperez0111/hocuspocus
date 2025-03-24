"use client";

import { SocketContext } from "@/app/SocketContext";
import CollaborativeEditor from "@/app/articles/[slug]/CollaborativeEditor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { useContext, useEffect, useState } from "react";

export default function ArticleEditor({ slug }: { slug: string }) {
	const socket = useContext(SocketContext);

	const [provider, setProvider] = useState<HocuspocusProvider | null>(null);

	useEffect(() => {
		if (!socket || provider) return;

		const _provider = new HocuspocusProvider({
			websocketProvider: socket,
			name: slug,
			onOpen: () => console.log("onOpen!"),
			onClose: () => console.log("onClose!"),
			onAuthenticated: () => console.log("onAuthenticated!"),
			onAuthenticationFailed: (data) =>
				console.log("onAuthenticationFailed", data),
		});

		setProvider(_provider);

		return () => {
			_provider.detach();
		};
	}, [socket, slug, provider]);

	if (socket && provider) {
		// only attach here, as otherwise useEffect running twice (in React strict mode) would trigger two connections that can create issues in local development
		provider.attach();
		return (
			<div>
				<h1>Article editor!</h1>

				<CollaborativeEditor slug={slug} provider={provider} />
			</div>
		);
	}

	return <></>;
}
