import {Component, OnInit} from '@angular/core';
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

  public posts: Observable<Post[]>;

  constructor(private apollo: Apollo) {}

  private authorFragment = gql`
    fragment AuthorPageComment on Author {
      id
      firstName
      lastName
    }
  `;

  private allPostQuery = gql`
        query allPosts {
          posts {
            id
            title
            votes
            author {
              id
              ...AuthorPageComment
            }
          }
        }
        ${this.authorFragment}
      `;

  ngOnInit() {
    console.log('ng init')
    this.posts = this.apollo.watchQuery<Query>({
      query: this.allPostQuery
    })
      .valueChanges
      .pipe(
        map(result => result.data.posts)
      );
  }
}
