import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../types';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
  }

}
