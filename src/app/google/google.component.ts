import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ThankComponent } from '../thank/thank.component';
import { stringify } from '@angular/compiler/src/util';


@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})
export class GoogleComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  //data 바인딩 부분
  userData:FormGroup;
  name:string;
  phone:any="Phone number"
  birthday:any
  constructor(
    public dialog: MatDialog,
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder
    ) { 
      this.makeForm()
    }

 
    disappear(){
      this.phone="";
    }

    
    makeForm(){
      this.userData = this.fb.group({
        name: ['', Validators.required],
        phone: ['', [Validators.required,Validators.pattern('[0-9]+'), Validators.min(1000000000),Validators.minLength(9)]],
        birthday: ['', Validators.required]
      })
    }
  ngOnInit() {
  }

  spinner=false;
//구글 시트에 전달하는 부분 url은 유동성있게 수정가능 하며 새로운 시트에 할때는 윗 상단 헤더부분의 이름과 키의 이릅이 같아야한다
  url = "https://script.google.com/macros/s/AKfycbxwT50XKNpnZFURr8Wgp8ohL4KeHDrAvWS7h1opQAf-wt0qxHyK/exec"

  show=true;
  sub(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.userData.invalid) {
        return;
    }
    this.spinner = true;
    // if(this.userData.value.name !== String){
    //   return alert("이름을 입력해 주세요")
    // }else if(this.userData.value.phone !== Number){
    //   return alert("핸드폰번호를 입력해 주세요")
    // }else{this.userData.value.birthday !== Date}{
    //   return alert("생년월일을 입력해주세요")
    // }
    const data2 = this.userData.value
    const le2:any = JSON.stringify(data2)
    this.http.post(this.url , le2).subscribe(res => {
      if(res["result"] === "success"){
        this.spinner = false;
        this.show = !this.show;
        this.dialog.open(ThankComponent);
      } else if(res["result"] === "error"){
        alert("오류가 발생했습니다");
        console.log(res)
      }
    })
  }

//데이터 미 입력시 나오는 글귀들~
  get f() { return this.userData.controls; }
  submitted = false;

exit(){
  window.open('_self');
  window.close();
  return false
}
}
