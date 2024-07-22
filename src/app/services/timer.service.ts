import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  startTimer(callback: Function, interval: number): any {
    return setInterval(callback, interval);
  }

  stopTimer(intervalId: any) {
    clearInterval(intervalId);
  }
}