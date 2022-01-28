import { Component, SimpleChanges } from '@angular/core';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assessment';
  checking = false;
  public _searchText = '';
  showData: boolean = true;
  data = new Array();
  filteredData = new Array();
  logoSource = '';

  constructor(public utility: UtilityService) {
  }

  get searchText(): string{
    return this._searchText;
  }

  set searchText(value){
    this._searchText = value;
    this.filteredData = this.performFilter(value);
  }

  ngOnInit(): void {
    this.getFilterValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getFilterValues(){
    this.utility.getData().subscribe(data =>{
      this.data = data;
      this.filteredData = this.data;
    });
  }

  performFilter(value : string){
    value = value.toLocaleLowerCase();
    return this.data.filter((d: { operationName: string; }) => d.operationName.toLocaleLowerCase().includes(value));
  }
}
