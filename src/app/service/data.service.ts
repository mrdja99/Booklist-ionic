import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc, 
  addDoc,
  updateDoc
} from '@angular/fire/firestore';
  

export interface Book{
  id?: number;
  imgUrl: string;
  name: string;
  rating: string;
  synopsys: string;
  writer: string;
}

export interface User{
  email: string;
  password: string;
  name: string;
  surname: string;
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

  addBook(book: Book) {
    const booksRef = collection(this.firestore,'books');
    return addDoc(booksRef,book);
  }

  editBook(book: Book) {
    const bookRef = doc(this.firestore,`books/${book.id}`);
    return updateDoc(bookRef,{
      imgUrl: book.imgUrl,
      name: book.name,
      rating: book.rating,
      synopsys: book.synopsys,
      writer: book.writer
    });

  }

  getUsers() {
    const usersRef = collection(this.firestore,'users');
    return collectionData(usersRef, {idField: 'id'});
  }

  addUser(user: User) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef,user); 
  }

}
