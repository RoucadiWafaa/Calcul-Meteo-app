import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  op1: number = 0;
  op2: number = 0;
  rslt!: number;

  constructor(private router: Router, public toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  calculate(operation: (a: number, b: number) => number) {
    try {
      if (this.op1 == null || this.op2 == null) {
        throw new Error('Please enter both numbers.');
      }
      this.rslt = operation(this.op1, this.op2);
    } catch (error) {
      if (error instanceof Error) {
        this.presentToast(error.message);
      } else {
        this.presentToast('An unexpected error occurred.');
      }
    }
  }


  addition() {
    this.calculate((a, b) => a + b);
  }

  multiplication() {
    this.calculate((a, b) => a * b);
  }

  soustraction() {
    this.calculate((a, b) => a - b);
  }

  division() {
    if (this.op2 === 0) {
      this.presentToast('Cannot divide by zero.');
      return;
    }
    this.calculate((a, b) => a / b);
  }

  clear() {
    this.op1 = 0;
    this.op2 = 0;
    this.rslt = 0;
  }

  gotowt() {
    this.router.navigate(['weather']);
  }

}
