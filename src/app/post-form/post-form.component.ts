import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostsService} from "../services/posts.service";
import {Router} from "@angular/router";
import {Post} from "../models/post.models";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private  formBuilder: FormBuilder,
              private postsService: PostsService,
              private  router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formBuilder.group({
      title:[''],
      content:[''],
      loveIts:['0']
    })
  }
  onSavePost(){
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const loveIts = this.postForm.get('loveIts').value;
    const newPost = new Post(title, content, loveIts);
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);


  }


}
