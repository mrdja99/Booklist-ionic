import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc, 
  addDoc
} from '@angular/fire/firestore';
  

export interface Book{
  id?: number;
  imgUrl: string;
  name: string;
  rating: string;
  synopsys: string;
  writer: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getBooks() {
    const booksRef = collection(this.firestore,'books');
    return collectionData(booksRef, {idField: 'id'});
  }

  deleteBook(id:string) {
    const bookRef = doc(this.firestore,`books/${id}`);
    return deleteDoc(bookRef);
  }

}
