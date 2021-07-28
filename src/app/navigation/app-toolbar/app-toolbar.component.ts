import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RouterEvent } from '@angular/router';

import { NavigationItem } from '../nav-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.css']
})
export class AppToolbarComponent implements OnInit {
    title = '';
	navItems: NavigationItem[] = [
		{ label: 'Accounts',  icon: 'account_balance', link: 'accounts'},
		{ label: 'Investments',  icon: 'price_change', link: 'investments' },
		{ label: 'Clearing',  icon: 'article', link: 'clearings' },
		{ label: 'Data', icon: 'settings', items: [
			{ label: 'Institutions',  icon: '', link: 'data/institutions' },
			{ label: 'Currencies',  icon: '', link: 'data/currencies' },
			{ label: 'Equities',  icon: '', link: 'data/equities' },
			{ label: 'Prices',  icon: '', link: 'data/prices' }
			]
		},
	];
	
	constructor(private router: Router, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd) {
				if (this.route.root.firstChild) {
					this.title = this.route.root.firstChild.snapshot.data['title']
				} else {
					this.title = this.getLabel(this.navItems, event);
				}
			}
		});
    }

	private getLabel(navItems: NavigationItem[], event: RouterEvent): string {
		let label: '';
		if (!navItems) { return label }
		for (let navItem of navItems) {
			if (navItem.items) { return this.getLabel(navItem.items, event) }
			if (navItem.link === event.url.substring(1)) { return navItem.label }
		}
		return label;
	}

}
