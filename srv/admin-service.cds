using { sap.capire.bookshop as my } from '../db/schema';
service AdminService {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
  entity Binding as projection on my.Binding;
    action takeAuthors() returns String(300);
    action booksCount()         returns Integer;
}
