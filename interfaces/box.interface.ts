export interface HeaderDetailInterface {
    icon: any;
    value: string | number;
}
export interface BoxButtonInterface {
		onClick: () => any;
		appearance: "link" | "primary" | "subtle" | "subtle-link";
		children: any;
		className?: any;
}
export interface BoxInterface{
    avatar?: any;
	title: string;
	time: string;
	date: string;
	description: string;
	image?: any;
	headerDetail: Array<HeaderDetailInterface>;
	Buttons?: Array<BoxButtonInterface>;
}