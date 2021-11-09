import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MainIhpService } from './services/main-ihp.service';
import { WebService } from 'src/app/services/web.service';
import { GeneralForm } from 'src/app/shared/classes/general.form';
import { setTheme } from 'ngx-bootstrap/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-main-ihp',
  templateUrl: './main-ihp.component.html',
  styleUrls: ['./main-ihp.component.css']
})
export class MainIhpComponent extends GeneralForm implements OnInit {

  isLoading = false;
  noPatient = false;
  alertMsg = '';
  bsModalRef!: BsModalRef;

  vx_comp_name = '';

  patient = {
    name: '',
    idnum: '',
    dob: '',
    dobs: '',
    gender: '',
    addr1: '',
    addr2: '',
    addr3: '',
    postcode: '',
    state: '',
    prn: ''
  }

  vpatient = {
    name: '',
    idnum: '',
    dob: '',
    dobs: '',
    gender: '',
    addr1: '',
    addr2: '',
    addr3: '',
    postcode: '',
    state: '',
    prn: '',
    contact: ''
  }

  showNameChk = false;
  showDobChk = false;
  showAddr1Chk = false;
  showAddr2Chk = false;
  showAddr3Chk = false;
  showPostcodeChk = false;
  showStateChk = false;

  mformx!: FormGroup;

  @ViewChild('modalSuccess') modalSuccess!: TemplateRef<any>;
  @ViewChild('modalAlert') modalAlert!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private ws: MainIhpService, 
    private wx: WebService, 
    private modalService: BsModalService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    super();
    this.createForm();
    this.route.queryParams.subscribe(params => {
      this.vx_comp_name = params['vx_comp_name'];
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.ngxLoader.startLoader('loader-01');
    this.readMyKad();
  }

  createForm() {
    this.mform = this.fb.group({
      contact: ['', [Validators.required]]
    });
    this.mformx = this.fb.group({
      name: [false],
      dob: [false],
      addr1: [false],
      addr2: [false],
      addr3: [false],
      postcode: [false],
      state: [false]
    });
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    const f = this.mform.value;
    const o = {
      name: this.patient.name,
      docNo: this.patient.idnum, // this.patient.idnum, //'560907-12-6765',
      dob: this.patient.dobs,
      address1: this.patient.addr1,
      address2: this.patient.addr2,
      address3: this.patient.addr3,
      cityState: this.patient.state,
      postCode: this.patient.postcode,
      sex: this.patient.gender === 'FEMALE' ? 'F' : 'M',
      contact: f.contact,
      workstationCode: this.vx_comp_name
    }

    this.wx.createPatient(o).subscribe((res: any) => {
      this.patient.prn = res.prn;
      this.bsModalRef = this.modalService.show(
        this.modalSuccess
      );
    }, (error) => {
      console.log(error);
      if (error.error) {
        alert(error.error.message);
      }
    });
  }

  onProceed() {
    const f = this.mformx.value;
    if (f.name === true || f.dob === true || f.addr1 === true || f.addr2 === true || f.addr3 === true || f.postcode === true || f.state === true) {
      const o = {
        name: f.name === true ? this.patient.name : this.vpatient.name,
        docNo: this.vpatient.idnum, // this.patient.idnum, //'560907-12-6765',
        dob: f.dob === true ? this.patient.dobs : this.vpatient.dobs,
        address1: f.addr1 === true ? this.patient.addr1 : this.vpatient.addr1,
        address2: f.addr2 === true ? this.patient.addr2 : this.vpatient.addr2,
        address3: f.addr3 === true ? this.patient.addr3 : this.vpatient.addr3,
        cityState: f.state === true ? this.patient.state : this.vpatient.state,
        postCode: f.postcode === true ? this.patient.postcode : this.vpatient.postcode,
        sex: this.vpatient.gender === 'FEMALE' ? 'F' : 'M',
        contact: this.vpatient.contact,
        workstationCode: this.vx_comp_name
      }

      this.wx.updatePatient(o, this.patient.prn).subscribe((res: any) => {
        parent.postMessage(this.patient.prn, '*');
        parent.postMessage('onselect', '*');
      }, (error) => {
        console.log(error);
        if (error.error) {
          alert(error.error.message);
        }
      });
    }

    else {
      parent.postMessage(this.patient.prn, '*');
      parent.postMessage('onselect', '*');
    }
  }

  onModalOk() {
    this.bsModalRef.hide();
    parent.postMessage(this.patient.prn, '*');
    parent.postMessage('onselect', '*');
  }

  onAlertOk() {
    this.bsModalRef.hide();
    parent.postMessage('onclose', '*');
  }

  onConvertPatient() {
    this.patient.prn = 'xxx';
    this.bsModalRef = this.modalService.show(
      this.modalSuccess
    );
  }

  readMyKad() {
    this.ws.getCardInfo().subscribe((res: any) => {
      this.isLoading = false;
      this.ngxLoader.stopLoader('loader-01');

      this.patient.name = res.Name;
      this.patient.idnum = res.ICNo;
      this.patient.dob = this.getDate(res.DOB);
      this.patient.dobs = this.getDate1(res.DOB);
      this.patient.gender = this.getGender(res.Gender);
      this.patient.addr1 = res.Addr1;
      this.patient.addr2 = res.Addr2;
      this.patient.addr3 = res.Addr3;
      this.patient.postcode = res.Postcode;
      this.patient.state = res.State;

      parent.postMessage(res.ICNo, '*');
      this.loadPatient();
    }, (error: any) => {
      this.isLoading = false;
      this.ngxLoader.stopLoader('loader-01');
      this.alertMsg = 'No MyKad detected. Please insert the MyKad to the reader slot to continue';
      this.bsModalRef = this.modalService.show(
        this.modalAlert
      );
    });
  }

  loadPatient() {
    // 560907-12-6765 this.patient.idnum
    this.wx.getPatientData(this.patient.idnum).subscribe((res: any) => {
      if (res.errorCode && res.errorCode === '99') {
        this.patient.prn = '';
        this.noPatient = false;
        this.alertMsg = 'More than 1 patient with same NRIC found. Please process the patient manual in VESALIUS.';
        this.bsModalRef = this.modalService.show(
          this.modalAlert
        );
        return;
      }

      this.patient.prn = res.prn;
      this.vpatient.prn = res.prn;
      this.vpatient.name = `${res.name.firstName} ${res.name.middleName} ${res.name.lastName}`.trim();
      this.vpatient.idnum = this.getVPatientIDNum(res.documents);
      this.vpatient.dob = res.dob;
      this.vpatient.dobs = res.dob;
      this.vpatient.gender = res.sex.description.toUpperCase();
      this.vpatient.addr1 = res.homeAddress.address1;
      this.vpatient.addr2 = res.homeAddress.address2;
      this.vpatient.addr3 = res.homeAddress.address3;
      this.vpatient.state = res.homeAddress.cityState;
      this.vpatient.postcode = res.homeAddress.postalCode;
      this.vpatient.contact = res.contactNumber.home;
      this.noPatient = false;

      this.showNameChk = this.patient.name !== this.vpatient.name;
      this.showDobChk = this.patient.dobs !== this.vpatient.dobs;
      this.showAddr1Chk = this.patient.addr1 !== this.vpatient.addr1;
      this.showAddr2Chk = this.patient.addr2 !== this.vpatient.addr2;
      this.showAddr3Chk = this.patient.addr3 !== this.vpatient.addr3;
      this.showPostcodeChk = this.patient.postcode !== this.vpatient.postcode;
      this.showStateChk = this.patient.state !== this.vpatient.state;

      parent.postMessage(this.patient.prn, '*');
    }, (error) => {
      console.log(error);
      if (error.error) {
        console.log(error.error.errorMessage);
      }
      this.noPatient = true;
    });
  }

  get showChkMsg() {
    return this.showNameChk || this.showDobChk || this.showAddr1Chk || this.showAddr2Chk || this.showAddr3Chk || this.showPostcodeChk || this.showStateChk;
  }

  onClose() {
    parent.postMessage('onclose', '*');
  }

  getDate(ds) {
    let y = ds.substring(8, 12);
    let m = ds.substring(4, 6);
    let d = ds.substring(0, 2);
    let r = `${y}-${m}-${d}`;
    let s = moment(r).format('DD-MMM-YYYY');
    return s.toUpperCase();
  }

  getDate1(ds) {
    let y = ds.substring(0, 4);
    let m = ds.substring(4, 6);
    let d = ds.substring(6, 8);
    let r = `${y}-${m}-${d}`;
    let s = moment(r).format('DD-MMM-YYYY');
    return s;
  }

  getGender(s) {
    let r = 'FEMALE';
    if (s === 'L') r = 'MALE';
    return r;
  }

  getVPatientIDNum(ls: any[]) {
    let s = '';
    let idx = ls.findIndex((v, i, o) => {
      if (v.code === 'ID') {
        return true;
      }

      return false;
    });
    if (idx >= 0) {
      const k = ls[idx];
      s = k.value;
    }

    return s;
  }
}
