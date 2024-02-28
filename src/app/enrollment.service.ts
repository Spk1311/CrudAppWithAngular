import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, catchError, throwError } from 'rxjs';
import { GetUser } from './get-user';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  _url = "https://localhost:7158/api/Person";
  constructor(private _http: HttpClient) { }


  GetEnroll(): Observable<GetUser[]> {
    return this._http.get<GetUser[]>(this._url + "/GetAll").pipe(catchError(this.errorHandler));
  }

  Postenroll(user: User): Observable<GetUser> {
    return this._http.post<GetUser>(this._url + "/RegisterPeople", user).pipe(catchError(this.errorHandler));
  }

  GetByIdData(id: any): Observable<GetUser> {
    return this._http.get<GetUser>(this._url + "/GetPeopleById/" + id).pipe(catchError(this.errorHandler));
  }

  Editenroll(id: any, user: GetUser): Observable<GetUser> {
    return this._http.put<GetUser>(this._url + "/EditPeople/" + id, user).pipe(catchError(this.errorHandler));
  }

  DeleteEnroll(id: any): Observable<any> {
    return this._http.delete<any>(this._url + "/DeletePeople/" + id, id).pipe(catchError(this.errorHandler));
  }

  ExportToExcel(location: any) {
    return this._http.get(this._url + "/ExcelDataDownload/" + location,{
      responseType: 'text'
    }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  GenerateExcel(listData : any){
    const title = "User Data";
    const header = Object.keys(listData[0]);
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet("User Report");

    const titleRow = workSheet.addRow(title);
    titleRow.font = { name: "Saysettha OT", family: 4, size: 16, bold: true};
    workSheet.addRow([]);
    const headerRow = workSheet.addRow(header);
    headerRow.eachCell(cell => {
      cell.font = { name: "Saysettha OT", bold: true }
    });
    listData.forEach((d : any) => {
      let row = workSheet.addRow(Object.values(d));
      row.font = { name: "Saysettha OT"};
    })

    workBook.xlsx.writeBuffer().then((exceldata : any)=>{
      const blob = new Blob([exceldata],{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
      saveAs(blob,"UserReport.xlsx");
    });
  }
}
