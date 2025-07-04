import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
  export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = { name: '', email: '', phone: '' };
  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.userService.updateUser(this.selectedUser.id!, this.selectedUser)
        .subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
    } else {
      this.userService.createUser(this.selectedUser)
        .subscribe(() => {
          this.loadUsers();
          this.resetForm();
        });
    }
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.isEditing = true;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  resetForm(): void {
    this.selectedUser = { name: '', email: '', phone: '' };
    this.isEditing = false;
  }
}