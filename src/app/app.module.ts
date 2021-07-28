import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModules } from './material-modules';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppToolbarComponent } from './navigation/app-toolbar/app-toolbar.component';
import { InstitutionService } from './service/institution-service';
import { InstitutionsComponent } from './ui/data/institutions/institutions.component';
import { InstitutionEditComponent } from './ui/data/institution-edit/institution-edit.component';
import { EquityService } from './service/equity-service';
import { EquitiesComponent } from './ui/data/equities/equities.component';
import { EquityEditComponent } from './ui/data/equity-edit/equity-edit.component';
import { PriceService } from './service/price-service';
import { PricesComponent } from './ui/data/prices/prices.component';
import { AccountService } from './service/account-service';
import { AccountsComponent } from './ui/accounts/accounts.component';
import { AccountEditComponent } from './ui/account-edit/account-edit.component';
import { AccountTransactionsComponent } from './ui/account-transactions/account-transactions.component';
import { AccountTransactionEditComponent } from './ui/account-transaction-edit/account-transaction-edit.component';
import { TransactionService } from './service/transaction-service'
import { CurrenciesComponent } from './ui/data/currencies/currencies.component';
import { CurrencyEditComponent } from './ui/data/currency-edit/currency-edit.component';
import { CurrencyService } from './service/currency-service';
import { ClearingService } from './service/clearing-service';
import { ErrorDialogComponent } from './ui/error-dialog/error-dialog.component';
import { HttpErrorInterceptor } from './service/http-error-interceptor';
import { ClearingsComponent } from './ui/clearings/clearings.component';
import { ClearingEditComponent } from './ui/clearing-edit/clearing-edit.component';
import { InvestmentsComponent } from './ui/investments/investments.component';
import { InvestmentService } from './service/investment-service';
import { InvestmentEditComponent } from './ui/investment-edit/investment-edit.component';
import { InvestTransactionService } from './service/invest-transaction-service';
import { InvestmentTransactionsComponent } from './ui/investment-transactions/investment-transactions.component';
import { InvestmentTransactionEditComponent } from './ui/investment-transaction-edit/investment-transaction-edit.component';
import { PriceEditComponent } from './ui/data/price-edit/price-edit.component';
import { AccountTransactionUploadComponent } from './ui/account-transaction-upload/account-transaction-upload.component';

@NgModule({
  declarations: [
    AppComponent,
	AppToolbarComponent,
    InstitutionsComponent,
    ErrorDialogComponent,
    InstitutionEditComponent,
    AccountsComponent,
    AccountTransactionsComponent,
    AccountEditComponent,
    CurrenciesComponent,
    AccountTransactionEditComponent,
    ClearingsComponent,
    ClearingEditComponent,
    CurrencyEditComponent,
    InvestmentsComponent,
    InvestmentEditComponent,
    InvestmentTransactionsComponent,
    InvestmentTransactionEditComponent,
    EquitiesComponent,
    EquityEditComponent,
    PricesComponent,
    PriceEditComponent,
    AccountTransactionUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	MaterialModules,
	FlexLayoutModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule,
  ],
  providers: [
	InstitutionService,
	CurrencyService,
	EquityService,
	PriceService,
	AccountService,
	ClearingService,
	TransactionService,
	InvestmentService,
	InvestTransactionService,
	{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
