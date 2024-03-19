import { Component, ViewChild  } from '@angular/core';
import { FormControl,FormGroup, Validators , AbstractControl} from '@angular/forms';
import {MatTableModule} from '@angular/material/table'
import { NgForm } from '@angular/forms';
export {add_user_information, get_user_information};
import {Apollo, gql} from "apollo-angular";

export interface User {

}

const add_user_information = gql`
    mutation newUser(
      $firstName: String!,
      $lastName: String!,
      $email: String!,
      $phone: String!){
      newUser(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        phone: $phone){
          firstName
          lastName
          email
          phone
      }
}
`
const get_user_information = gql`
  query {
    users {
      firstName
      lastName
      email
      phone
    }
  }
`
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  constructor(private apollo: Apollo) {}

  users: any;
  error: any;

  title = 'lab8'

  loginForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]),
    lastName: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]*$')]),
    phone: new FormControl('',[Validators.required,Validators.pattern('\W*([1-9][0-8][0-9])\W*([1-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?')]),
    email: new FormControl('',[Validators.required,Validators.email])

  })

  dataSource: User[] = []

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone']


  get firstName(): AbstractControl<string>{
    return <AbstractControl>this.loginForm.get('firstName');
  }
  get lastName(): AbstractControl<string>{
    return <AbstractControl>this.loginForm.get('lastName');
  }
  get email(): AbstractControl<string>{
    return <AbstractControl>this.loginForm.get('email');
  }
  get phone(): AbstractControl<string>{
    return <AbstractControl>this.loginForm.get('phone');
  }

  onSubmit(): void{
    //Changed code here where it mutates the data , then get the data from the server
    this.apollo.mutate({
      mutation: add_user_information,
      variables:{
        firstName: this.loginForm.value.firstName!,
        lastName: this.loginForm.value.lastName!,
        email: this.loginForm.value.email!,
        phone: this.loginForm.value.phone!
      },
      refetchQueries: [{
        query: get_user_information
      }]
    }).subscribe(({data}: any) => { //Displaying Data into Table
      this.users = data.newUser;
      const newRow = {firstName: this.users.firstName, lastName: this.users.lastName, email: this.users.email, phone: this.users.phone}
      this.dataSource = [...this.dataSource, newRow]

    }, (error) => {
      this.error = error;
    }
    );

    this.loginForm.reset()
    }
}
