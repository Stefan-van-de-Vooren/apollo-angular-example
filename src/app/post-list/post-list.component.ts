import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Post, Query} from '../types';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    console.log('ng init')
    this.posts = this.apollo.watchQuery<Query>({
      query: gql`
        query allPosts {
          posts {
            id
            title
            votes
            author {
              id
              firstName
              lastName
            }
          }
        }
      `,
    })
      .valueChanges
      .pipe(
        map(result => result.data.posts)
      );
  }

}
