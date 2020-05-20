import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IInput, IHistory } from '../models/app.model';
import { KangarooService } from '../services/kangaroo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  x1 = 0;
  v1 = 0;
  x2 = 0;
  v2 = 0;
  result = '';
  noJumps = 0;
  samePoint = 0;
  showResult = false;
  resultDesc = '';

  inputForm: FormGroup;
  // this is a shotcut to use the constrainted
  frmMinXVal = 0;
  frmMinVVal = 1;
  frmMaxVal = 10000;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private kangarooService: KangarooService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(q => {
      if (Object.keys(q).length) {
        this.x1 = q.x1 ? q.x1 : 0;
        this.x2 = q.x2 ? q.x2 : 0;
        this.v1 = q.v1 ? q.v1 : 0;
        this.v2 = q.v2 ? q.v2 : 0;

        this.kangaroo();
      }
    });

    this.inputForm = this.fb.group({
      x1Inp: [this.x1,
        [
          Validators.required,
          Validators.min(this.frmMinXVal),
          Validators.max(this.frmMaxVal)
        ]
      ],
      x2Inp: [this.x2,
        [
          Validators.required,
          Validators.min(this.frmMinXVal),
          Validators.max(this.frmMaxVal)
        ]
      ],
      v1Inp: [this.v1,
        [
          Validators.required,
          Validators.min(this.frmMinVVal),
          Validators.max(this.frmMaxVal)
        ]
      ],
      v2Inp: [this.v2,
        [
          Validators.required,
          Validators.min(this.frmMinVVal),
          Validators.max(this.frmMaxVal)
        ]
      ]
    }, {validator: this.checkX2GreaterX1 });
  }

  checkX2GreaterX1(group: FormGroup) {
    // here we have the 'passwords' group
    const x1ctrl = group.get('x1Inp').value;
    const x2ctrl = group.get('x2Inp').value;

    return x1ctrl < x2ctrl ? null : { x1Greater: true };
  }

  explainResult(result: string, n?: number, p?: number) {
    if (result.toLowerCase() === 'yes') {
      return 'Both Kangaroos will land at the same point <span class="text-green"><strong>' + p + '</strong></span> after <span class="text-green"><strong>' + n + '</strong></span> jumps.';
    }

    return 'Both Kangaroos will not land at the same point.';
  }

  kangaroo() {
    // from the question, we can deduce that
    // x1 + nv1 = p --- (1)
    // x2 + nv2 = p --- (2)
    // where n = number of jumps and p = the last point.
    // Solving simultaneously, we have
    // n = (x2 - x1) / (v1 - v2)

    this.showResult = false;
    const n = (this.x2 - this.x1) / (this.v1 - this.v2);

    this.result = 'no';
    this.noJumps = 0;
    this.samePoint = 0;

    if (n > 0 && Number.isInteger(n)) {
      this.result = 'Yes';
      this.noJumps = n;
      this.samePoint = +this.x1 + (n * this.v1);
    }

    const formInputs: IInput = {
      x1: this.x1,
      x2: this.x2,
      v1: this.v1,
      v2: this.v2
    };
    const timeStamp = Date.now();
    const historyDoc: IHistory = {
      field: formInputs,
      result: this.result,
      timestamp : timeStamp
    };

    this.kangarooService.addToLocalStr(historyDoc).then(_ => {
      console.log('saved');
    });

    this.resultDesc = this.explainResult(this.result, this.noJumps, this.samePoint);
    this.showResult = true;
  }

  formSubmit() {
    console.log(this.inputForm.value);
    if (this.inputForm.valid) {
      this.x1 = this.inputForm.controls.x1Inp.value;
      this.x2 = this.inputForm.controls.x2Inp.value;
      this.v1 = this.inputForm.controls.v1Inp.value;
      this.v2 = this.inputForm.controls.v2Inp.value;
      this.router.navigate([], {
        queryParams: {
          x1: this.x1,
          v1: this.v1,
          x2: this.x2,
          v2: this.v2,
        },
        queryParamsHandling: 'merge'
      });
    }
  }
}
