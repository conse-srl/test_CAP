using { sap.capire.bookshop as my } from '../db/schema';
service CatalogService @(impl: './cat-service.js') @(path: '/odata/cat'){

  /** For displaying lists of Books */
  @readonly entity ListOfBooks as projection on Books
  excluding { descr };

  /** For display in details pages */
  @(requires: 'any')
  @readonly entity Books as projection on my.Books { *,
    author.name as author
  } excluding { createdBy, modifiedBy };

  @(requires: 'any')
  entity Binding as projection on my.Binding {*};

  action submitOrder (
    book    : Books:ID @mandatory,
    quantity: Integer  @mandatory
  ) returns { stock: Integer };

    action takeAuthors() returns String(300);
    action booksCount()         returns Integer;

  event OrderedBook : { book: Books:ID; quantity: Integer; buyer: String };

  type saveNewElements : my.saveNewElements;

  action saveElements(elements : saveNewElements) returns LargeString;
  
}
