import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
declare let alertify:any;

@Component({
  selector: 'ngbd-carousel-navigation',
  templateUrl: './carousel-navigation.component.html',
  styleUrls: ['./carousel-navigation.component.css'],
  providers: [NgbCarouselConfig],
})
export class CarouselNavigationComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = true;
  counter: { min: number; sec: number } = { min: 2, sec: 0 };
  classInput = '';
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  data: any = ['', '', '', ''];
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    this.startTimer("start");
  }

  startTimer(message: string) {
    if(this.counter.min > 0 && message == "message") {
      alertify.error("wait")
      return
    }
    this.counter = { min: 2, sec: 0 };
    let intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59;
      } else this.counter.sec -= 1;
      if (this.counter.min === 0)
        clearInterval(intervalId);
    }, 1000);
  }

  onPaste(event: any): void {
    let clipboardData: any = event.clipboardData;
    console.log(event.target.nextElementSibling);
    let pastedText = clipboardData.getData('text').trim().split('');

    this.data = [...pastedText];
    // event.target.parentElement.lastElementChild.focus();
    event.blur()
  }
  onDigitInput(event: any): void {
    console.log(this.data);
    let element;
    if(this.data.join('') == ''){
      alertify.error('only number')
      return
    }
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (element == null) return;
    else element.focus();
  }


  validate() {
    if (this.data.includes("")){
      alertify.error("Input field is can not be empty");
      
      return
    }
    if (this.data.join('') == 6666) {
      alertify.success("Successfull!")
      this.classInput = 'success';
      this.counter.min = 0;
      this.counter.sec = 1;
      setTimeout(() => {
        this.classInput = ''
        this.data = ['', '', '', ''];
      }, 1000);
    } else {
      console.log(this.data.join(''));
      this.classInput = 'error';
      alertify.error("Error")
      setTimeout(() => {
        this.classInput = ''
        this.data = ['', '', '', ''];
      }, 1000);
    }
 
  }

}
