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
  countries;

  constructor(private continentsService: ContinentsService) { }

  ngOnInit(): void {
     this.continentsService.countries(this.continent).subscribe(
      (res:any) =>{
        console.log(res.data.continent.countries);
        this.countries = res.data.continent.countries;
     },
     error =>{
      console.log(error);
     });

  }

}


