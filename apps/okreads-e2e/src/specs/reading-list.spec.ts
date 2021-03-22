import {browser, ElementFinder, $, $$, ExpectedConditions} from 'protractor';

describe('When: I use the reading list feature', () => {

  beforeAll(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const readingListItems: ElementFinder[] = await $$('.reading-list-item');
    readingListItems.length>0 ?
    readingListItems.map(item => item.$('.remove').click())
    : null;
  })

  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads'));
  })

  it('Then: I should see my reading list', async () => {
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
  });
  it('Then: I should be able to add books to the reading list and undo it, and have the same reading list state', async () => {
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const items = await $$('[data-testing="book-item"]');
    items[0].$('button').click();
    const snackBar = await $('.mat-simple-snackbar');
    await snackBar.$('button').click();
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    const readingListItems = await $$('.reading-list-item');
    expect(readingListItems.length).toBe(0)
  });

  it('Then: I should be able to add books to the reading list, and should be able to remove the book and undo it, to have the same reading list state', async () => {
    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();
    const items = await $$('[data-testing="book-item"]');
    items[0].$('button').click();
    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
    let readingListItems: ElementFinder[] = await $$('.reading-list-item');
    expect(readingListItems.length).toBe(1);
    readingListItems[0].$('.remove').click();
    const snackBarUndo = await $('.mat-simple-snackbar').$('button');
    await snackBarUndo.click();
    readingListItems = await $$('.reading-list-item');
    expect(readingListItems.length).toBe(1)
  });
});
