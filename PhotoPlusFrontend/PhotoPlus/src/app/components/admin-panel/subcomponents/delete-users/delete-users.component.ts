import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { User } from "src/app/models/user/user";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-delete-users",
  templateUrl: "./delete-users.component.html",
  styleUrls: ["./delete-users.component.scss"],
})
export class DeleteUsersComponent implements OnInit {

  @ViewChild("searchInput", {static: true})
  el: ElementRef;

  users: BehaviorSubject<User>[];
  filteredUsers: BehaviorSubject<User>[];

  amountOfPages: BehaviorSubject<number>;
  seletedPage: BehaviorSubject<number>;

  constructor(private userService: UserService, private renderer: Renderer2) {}

  async ngOnInit() {
    this.amountOfPages = new BehaviorSubject(0);
    this.seletedPage = new BehaviorSubject(0);
    let pageCount = this.userService.getPageCount().toPromise();
    this.amountOfPages.next((await pageCount).pageAmount); 
    this.loadUsers();
    this.setupSearchBarListener()
   
  }

  changePage(event: number){
    this.seletedPage.next(event);
    this.loadUsers();
  }

  loadUsers(){
    this.users = new Array<BehaviorSubject<User>>();
    this.filteredUsers = new Array<BehaviorSubject<User>>();
    this.userService.getPage(this.seletedPage.value).subscribe((data) => {
      for (let user of data) {
        this.users.push(new BehaviorSubject(user));
      }
      this.filteredUsers = this.users;
    });
  }

  setupSearchBarListener(){
    this.renderer.listen(this.el.nativeElement,"input",() => {
      const searchText:string = this.el.nativeElement.value;
      if(searchText == ''){
        this.filteredUsers = this.users;
        return;
      }
      this.filteredUsers = this.users.filter((x) => 
        x.value.login.includes(searchText) || x.value.code.includes(searchText)
      );
    });
  }

  deleteUser(user: BehaviorSubject<User>){
    if(confirm("Do you want to delete user: \n\n" + user.value.name + " " + user.value.surname)){
      this.userService.delete(user.value.code).subscribe(()=>{
        this.ngOnInit(); // reinicjalizcja        
      })
    }
  }
}