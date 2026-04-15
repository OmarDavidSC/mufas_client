import { MaterialElevationDirective } from './directivas/material-elevation.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { PaginacionComponent } from './components/paginacion/paginacion.component';
import { NumericDirective } from './directivas/numeric.directive';
import { OnlyNumberDirective } from './directivas/only-number.directive';
import { OnlyMoneyDirective } from './directivas/only-money.directive';
import { M } from '@angular/cdk/keycodes';

const materialModules = [
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatTabsModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatDividerModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatSortModule,
  MatProgressBarModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatRippleModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    PaginacionComponent,
    MaterialElevationDirective,    
    NumericDirective,
    OnlyNumberDirective,
    OnlyMoneyDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,   
    ...materialModules
  ],
  exports: [
    ...materialModules,
    HttpClientModule,
    NgxSpinnerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,    
    PaginacionComponent,
    MaterialElevationDirective,
    NumericDirective,
    OnlyNumberDirective,
    OnlyMoneyDirective
  ],
  providers: [CurrencyPipe, DecimalPipe]
})
export class ComunModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faFileExcel);
  }
}
