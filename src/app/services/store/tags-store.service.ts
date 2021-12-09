import { BehaviorSubject } from 'rxjs';
import { ArticlesModel } from 'src/app/models';
import { Injectable } from '@angular/core';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsStoreService {
  private TagsList: string[] = [];
  TagsListData = new BehaviorSubject<string[]>([]);

  constructor(private api: ConnectApiService) {}

  GetTags() {
    this.api.GetTags().subscribe(
      (ListOfTags) => {
        this.TagsList = ListOfTags.tags;
        this.TagsListData.next(this.TagsList.slice());
      },
      (err) => alert(err.error.message)
    );
  }
}
