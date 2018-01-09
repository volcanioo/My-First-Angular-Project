import { Component, OnInit } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import swal from 'sweetalert2'
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private http: Http) { }
  movies = [];
  newMovie = "";
  newRate = "";
  listKind = "movie";
  id:number;
  private headers = new Headers({ 'Content-Type': 'application/json' })
  fetchData = function() {
    this.http.get("http://localhost:3000/movies").subscribe(
      (res: Response) => {
        this.movies = res.json();
      }
    )
  }
  removeMovie = function (id, name) {
    const url = `${"http://localhost:3000/movies"}/${id}`;
    return this.http.delete(url, {headers: this.header}).toPromise()
      .then(() => {
        this.fetchData();
      })
  }
  upRate = function(item) {
    if (item.rate <= 9) {
      this.movieObj = {
        "id": item.id,
        "movie": item.movie,
        "rate": parseInt(item.rate)+parseInt(1),
        "type": item.type
      };
      const url = `${"http://localhost:3000/movies"}/${item.id}`;
      this.http.put(url, JSON.stringify(this.movieObj), {headers: this.headers})
        .toPromise()
        .then(() => {
          this.fetchData();
        })
    }
  }
  downRate = function(item) {
    if (item.rate > 0) {
      this.movieObj = {
        "id": item.id,
        "movie": item.movie,
        "rate": parseInt(item.rate)-parseInt(1),
        "type": item.type
      };
      const url = `${"http://localhost:3000/movies"}/${item.id}`;
      this.http.put(url, JSON.stringify(this.movieObj), {headers: this.headers})
        .toPromise()
        .then(() => {
          this.fetchData();
        })
    }
  }
  ngOnInit() {
    this.fetchData();
  }
}
