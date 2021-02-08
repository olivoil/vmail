import { ViteSSGContext } from "vite-ssg";

export type UserModule = (ctx: ViteSSGContext) => void;

export type Address = {
	value: { name?: string; address: string }[];
	text: string;
};

export type Email = {
	id: string;
	from: Address;
	subject: string;
	body: string;
	sentAt: Date;
	folder: "inbox" | "set-aside" | "reply-later" | "feed" | "paper-trail";
	read: boolean;
};

export const life = 42;
