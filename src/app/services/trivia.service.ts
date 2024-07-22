import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { decodeHtmlEntities } from '../utils/html-entities';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com/api.php';
  private categoryUrl = 'https://opentdb.com/api_category.php';
  private tokenUrl = 'https://opentdb.com/api_token.php';
  private sessionToken!: string;

  constructor(private http: HttpClient) {
    this.getToken().subscribe();
  }

  getQuestions(amount: number, category?: string, difficulty?: string): Observable<any> {
    return this.ensureToken().pipe(
      switchMap(() => {
        let url = `${this.apiUrl}?amount=${amount}&type=multiple`;

        if (category && category !== 'all') {
          url += `&category=${category}`;
        }

        if (difficulty && difficulty !== 'mixed') {
          url += `&difficulty=${difficulty}`;
        }

        if (this.sessionToken) {
          url += `&token=${this.sessionToken}`;
        }

        return this.http.get(url).pipe(
          switchMap((response: any) => {
            if (response.response_code === 4) { // Token Empty
              return this.resetToken().pipe(
                switchMap(() => this.getQuestions(amount, category, difficulty))
              );
            } else {
              response.results = response.results.map((question: any) => {
                question.question = decodeHtmlEntities(question.question);
                question.correct_answer = decodeHtmlEntities(question.correct_answer);
                question.incorrect_answers = question.incorrect_answers.map((ans: string) => decodeHtmlEntities(ans));
                return question;
              });
              return of(response);
            }
          })
        );
      })
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(this.categoryUrl);
  }

  private getToken(): Observable<any> {
    return this.http.get(`${this.tokenUrl}?command=request`).pipe(
      map((response: any) => {
        this.sessionToken = response.token;
        return response;
      })
    );
  }

  private resetToken(): Observable<any> {
    return this.http.get(`${this.tokenUrl}?command=reset&token=${this.sessionToken}`).pipe(
      map((response: any) => {
        this.sessionToken = response.token;
        return response;
      })
    );
  }

  private ensureToken(): Observable<any> {
    if (this.sessionToken) {
      return of(this.sessionToken);
    } else {
      return this.getToken();
    }
  }
}