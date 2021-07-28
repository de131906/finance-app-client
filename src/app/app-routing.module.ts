import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './ui/accounts/accounts.component';
import { AccountTransactionsComponent } from './ui/account-transactions/account-transactions.component';
import { InstitutionsComponent } from './ui/data/institutions/institutions.component';
import { CurrenciesComponent } from './ui/data/currencies/currencies.component';
import { EquitiesComponent } from './ui/data/equities/equities.component';
import { PricesComponent } from './ui/data/prices/prices.component';
import { ClearingsComponent } from './ui/clearings/clearings.component';
import { InvestmentsComponent } from './ui/investments/investments.component';
import { InvestmentTransactionsComponent } from './ui/investment-transactions/investment-transactions.component';

const routes: Routes = [
	{ path: 'data/institutions', component: InstitutionsComponent, data: { title: 'Institutions'} },
	{ path: 'data/currencies', component: CurrenciesComponent, data: { title: 'Currencies'} },
	{ path: 'data/equities', component: EquitiesComponent, data: { title: 'Equities'} },
	{ path: 'data/prices', component: PricesComponent, data: { title: 'Prices'} },
	{ path: 'accounts', component: AccountsComponent, data: { title: 'Accounts'} },
	{ path: 'account/trx', component: AccountTransactionsComponent, data: { title: 'Account Transactions'} },
	{ path: 'clearings', component: ClearingsComponent, data: { title: 'Clearing Accounts'} },
	{ path: 'investments', component: InvestmentsComponent, data: { title: 'Investments'} },
	{ path: 'investment/trx', component: InvestmentTransactionsComponent, data: { title: 'Investment Transactions'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
