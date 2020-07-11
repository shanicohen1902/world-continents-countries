import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContinentsService } from '../../continents.service';

@Component({
  selector: 'app-continents-list',
  templateUrl: './continents-list.component.html',
  styleUrls: ['./continents-list.component.css']
})

export class ContinentsListComponent implements OnInit {

  @Output() continentSelectedEvent = new EventEmitter<string>();

  displayedColumns: string[] = ['Continent Code', 'Continent Name'];
  dataSource: Partial<ContinentObj>;
  errorMessage: string;

  constructor(private continentsService: ContinentsService) { }

  ngOnInit(): void {

    this.continentsService.continentsList().subscribe(
      (res: any) => {
        this.dataSource = res;
     },
     error => {
      console.log(error);
      this.errorMessage = error.error;
     });
  }

  getRecord(element): void{
    this.continentSelectedEvent.emit(element.code);
  }

}
