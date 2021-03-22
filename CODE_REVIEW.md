# Code Review:

## Improvements:

1. Removed the subscribe for books in book-search.component.ts for getting books and used async pipe.
2. Updated change detection strategy to OnPush performance refinement.
3. In book-search.component.spec.ts file, renamed the text mentioned in describe method from 'ProductsListComponent' to 'BookSearchComponent'.
4. Added Alt Tags and Title Tags for the img tags where ever needed.
5. In reading-list.reducer.ts file, the actions used should be 'confirmedAddToReadingList' and 'confirmedRemoveFromReadingList' instead of 'addToReadingList' and 'removeFromReadingList' actions.
6. In books.actions.ts file, changed the error parameter datatype from any to string.
7. Changed formatDate function to Date pipe with time zone and locale in book-search.component.ts.

## Lighthouse:
1. Lighthouse shows contrast issue with 'Reading List Button' and the <p> tag text in the empty section before making any search.
2. Search button icon doesnt have semantic labels.
3. Checked in Lighthouse accessibility is 100%.

# Other Improvements:
1. One fundamental improvement I would make would be to localize strings and add constants where ever needed and export them through a file instead of directly adding it to the template. Improves security in this app. As the app was built with lots of Strings dropped directly into the templates and no annotation/translation, This would help to add it to translation service, which can be translated to any language. Likely Espanol(Spanish).
2. The whole app is non responsive, can make it responsive for all devices.
