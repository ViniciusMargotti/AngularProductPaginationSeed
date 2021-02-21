import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClientService} from '../service/httpclient.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './cadastroUsuarios.component.html',
  styleUrls: ['./cadastroUsuarios.component.css']
})

export class CadastroUsuariosComponent implements OnInit, AfterViewInit {

  constructor( private httpClientService: HttpClientService,
               private snackBar: MatSnackBar,
               private router: Router) {}

  displayedColumns: string[] = ['nome', 'descricao', 'valorCompra', 'valorVenda'];
  dataSource: MatTableDataSource<Produto>;
  pageEvent: PageEvent;
  numberOfElements: number;
  buscandoProdutos: boolean;

  @ViewChild(MatSort, {}) sort: MatSort;
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;

  logout() {
    this.snackBar.open('Volte logo!', 'Ok', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    this.router.navigate(['logout']);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.paginator.pageSize = 5;
    this.paginator.pageIndex = 0;
    this.dataSource.paginator = this.paginator;
    this.getProdutos();
  }

  public getProdutos() {

    this.buscandoProdutos = true;

    setTimeout(() => {
      // tslint:disable-next-line:max-line-length
      this.httpClientService.getProdutos(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active || 'id').subscribe(
        response => {
          this.buscandoProdutos = false;
          this.dataSource = new MatTableDataSource(response.content);
          this.numberOfElements = response.totalElements;
          this.dataSource.sort = this.sort;
        },
        error => this.buscandoProdutos = false
      );
    }, 1000);

  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
