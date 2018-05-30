import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/post.models';
import {Subscription} from 'rxjs/Subscription';
import {PostsService} from '../services/posts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
  })


export class PostListComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() content: string;
   @Input() loveIts: number;
  // loveIts = 0;
// title = ('bonjour');

  // on créer l'array local
  posts: Post []  ;
  postsSubscription: Subscription;

  constructor(private postsService: PostsService,
              private router: Router) {
  }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts();
    this.postsService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/new']);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
    console.log(post);
  }



  onLike() {
    // console.log(loveIts)
    this.postsService.getPosts();
    this.loveIts ++;
  }

  onDislike() {
   // this.loveIts -- ;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
