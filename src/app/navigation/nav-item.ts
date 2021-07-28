export interface NavigationItem {
	label: string;
	icon?: string;
	link?: string;
	items?: NavigationItem[];
}