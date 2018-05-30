import { Injectable } from '@angular/core';
import {Post} from '../models/post.models';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class PostsService {

  posts: Post []= [] ;
  postsSubject = new Subject<Post[]>();

  constructor(private httpClient: HttpClient) {}

// emite des posts
  emitPosts() {
    this.postsSubject.next(this.posts);
  }
// sauvegarde des post vers la base de donnée
  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }
  // recuperer les posts
  getPosts() {
    firebase.database().ref('posts')
      .on('value', (data) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

   // créer un nouveau post
  createNewPost(newPost: Post){
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }
  // supprimer un livre
  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }
  like(){
    console.log(this.posts);
  }
  savePostsToServer () {
    // httpClient envoie les données vers le serveur dans le node.json qui créer posts
    this.httpClient
      .put('https://blog-7bd4e.firebaseio.com/posts.json' , this.posts )
      // on créer le serie de réponse du serveur
      .subscribe(
        () => {
          console.log ('chargement terminé !');
        },
        (error) => {
          console.log('erreur' + error);
        }
      );
}}
