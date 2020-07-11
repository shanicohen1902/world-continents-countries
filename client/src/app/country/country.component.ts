import { Component, OnInit,Input } from '@angular/core';
import { ContinentsService } from '../../continents.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {
  @Input()
  continent: string;
  countries: Partial<CountryObj[]>;
  errorMessage: string;



  constructor(private continentsService: ContinentsService) { }

  ngOnInit(): void {
     this.continentsService.countries(this.continent).subscribe(
      (res: any) => {
        console.log(res);
        this.countries = res;
     },
     error => {
      console.log(error);
      this.errorMessage = error.error;
     });

  }

}


