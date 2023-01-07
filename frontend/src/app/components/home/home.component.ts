import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
	test = 'empty';
	ngOnInit() {
		/*
		axios.get(`http://localhost:8000/api/test`)
			.then((response) => {
				this.test = response.data.test_response
			})
			.catch(e =>{
				console.log(e);
			})
		*/
  	}
}
