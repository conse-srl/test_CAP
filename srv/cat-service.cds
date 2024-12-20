using { sap.capire.bookshop as my } from '../db/schema';
service CatalogService @(impl: './cat-service.js') @(path: '/cat'){

  /** For displaying lists of Books */
  @readonly entity ListOfBooks as projection on Books
  excluding { descr };

  /** For display in details pages */
  @readonly entity Books as projection on my.Books { *,
    author.name as author
  } excluding { createdBy, modifiedBy };

  action submitOrder (
    book    : Books:ID @mandatory,
    quantity: Integer  @mandatory
  ) returns { stock: Integer };

    action takeAuthors() returns String(300);
    action booksCount()         returns Integer;

  event OrderedBook : { book: Books:ID; quantity: Integer; buyer: String };
}
