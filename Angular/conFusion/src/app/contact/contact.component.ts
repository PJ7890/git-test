import { convertPropertyBindingBuiltins } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType, } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };
  validationMessages = {
    'firstname': {
      'required': 'First Name is Required',
      'minlength': 'FirstName must be atleast 2 characters long',
      'maxlength': 'FirstName cannot be morethan 25 characters long'
    },

    'lastname': {
      'required': 'Last Name is Required',
      'minlength': 'Last Name must be atleast 2 characters long',
      'maxlength': 'Last Name cannot be morethan 25 characters long'
    },

    'telnum':{
      'required': 'Tel.Number is Required',
      'pattern': 'Tel.number must contain only numbers'
    },

    'email':{
      'required': 'Email is Required',
      'email': 'Email not in valid Format'
    },

  }

  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message:''
    });
    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();//(re)set form validation messeges
  }

  onValueChanged(data? : any) {
    if(!this.feedbackForm){return;}
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){
        //char previous error message (if any)
        this.formErrors[field]='';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              this.formErrors[field]+=messages[key]+'';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
