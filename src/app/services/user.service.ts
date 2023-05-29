import { Injectable } from '@angular/core'
import { Observable, catchError, of, tap } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}
    getUsers(): Observable<User[]> {
        var url: string = 'http://localhost:3000/users'
        return this.http.get<User[]>(url).pipe(
            tap((retorno: User[]) => {
                console.log('Listando usuárioos service')
            }), // Tratamento de erro
            catchError(this.handleError<User[]>('erro ao listar eventos'))
        )
    } // função personalizada
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error) // log to console instead
            this.log(`${operation} failed: ${error.message}`)
            return of(result as T)
        }
    }
    private log(message: string) {
        console.log(`EventosService: ${message}`)
    }
}

export class User {
    public string = ''
    public firstName: string = ''
    public email: string = ''
    public phone: string = ''
    public cpf: string = ''
    public password: string = ''
    public dataNascimento: string = ''
}
