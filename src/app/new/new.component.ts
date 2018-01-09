import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import swal from 'sweetalert2'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private http: Http) { }
  movieObj:object = {};

  ngOnInit() {
  }
  newItem = function(movie) {
    this.movieObj = {
      "movie": movie.name,
      "rate": movie.rate,
      "type": movie.type,
    }
    this.http.post("http://localhost:3000/movies", this.movieObj).subscribe((res:Response) => {
      swal({
        title: 'Kaydedildi!',
        type: 'success',
        confirmButtonText: 'Devam'
      });
      this.movieObj = {};
      this.NameValue = null;
      this.RateValue = null;
    })
    .catch((e: any) => {
        console.log(e.status);
    });
  }

}
